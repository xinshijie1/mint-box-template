import Cookies from "js-cookie";
import { isNetworkSupported } from "@/utils";
import contracts from "@/contracts";
import { exchangeCode, login, getContractAddress } from "@/api";
import { Message } from "element-ui";
import store, { UPDATE_CONTRACTADDR } from "@/store";
const TokenKey = "Token";

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token, expires) {
  return Cookies.set(TokenKey, token, { expires });
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}

export async function connect() {
  if (!window.ethereum) {
    window.open("https://metamask.io/download.html", "_blank");
    return Message({
      message: "Please install MetaMask to use this app.",
      type: "warning",
    });
  }

  const isUnlocked = await window.ethereum._metamask.isUnlocked();
  if (!isUnlocked) {
    return Message({
      message: "Metamask has been locked, please unlock it.",
      type: "warning",
    });
  }

  // if (!isNetworkSupported(parseInt(window.ethereum.chainId))) {
  //   return Message.error("Please MetaMask change your network to `Rinkeby`.");
  // }

  let accounts = await window.ethereum.request({
    method: "eth_accounts",
  });
  if (accounts.length == 0) {
    accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
  }
  exchangeCode(accounts[0]).then((res) => {
    console.log(res);
    sign(res.data.nonce);
  });
}

export async function sign(nonce) {
  try {
    const msg = nonce;
    const sig = await contracts.signer.signMessage(msg);
    const account = store.state.account.toLowerCase();
    login(account, sig).then((res) => {
      setToken(res.data.token, new Date(res.data.expiresIn));
      window.location.reload();
    });
  } catch (e) {
    console.log(e);
  } finally {
    console.log("finsh");
  }
}

export async function setContractAddress() {
  let deployment = process.env.VUE_APP_CONTRACT_ADDR;
  if (!deployment) {
    const { data } = await getContractAddress();
    deployment = data.contractAddress;
  }
  store.commit(UPDATE_CONTRACTADDR, deployment);
}
