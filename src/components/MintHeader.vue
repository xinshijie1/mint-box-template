<template>
  <div id="mintNav" class="hidden-sm-and-down">
    <el-menu
      class="el-menu-mint"
      :default-active="activePath"
      router
      mode="horizontal"
      text-color="#000"
      active-text-color="#2A7EED"
    >
      <el-menu-item index="/">MINT</el-menu-item>
      <el-menu-item index="/mynfts">MY NFTS</el-menu-item>
    </el-menu>
    <div v-if="!isLogin" class="connect-wallet" @click="getConnect">
      Connect Wallet
    </div>
    <div v-else class="connect-wallet">
      <el-dropdown
        trigger="click"
        @command="
          (command) => {
            handleCommand(command);
          }
        "
      >
        <div>
          {{ formatAccount }}
        </div>
        <el-dropdown-menu slot="dropdown">
          <!-- <el-dropdown-item divided command="account">
            <i class="el-icon-user"></i> Account</el-dropdown-item
          > -->
          <el-dropdown-item command="logout">
            <i class="el-icon-download rotate-right"></i>
            Logout</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import { formatNetwork, isNetworkSupported } from "@/utils";
import { UPDATE_ACCOUNT, UPDATE_CHAINID } from "@/store";
import contracts from "@/contracts";
import { connect, getToken, removeToken } from "@/utils/auth";

export default {
  computed: {
    isNetworkSupported() {
      return isNetworkSupported(this.$store.state.chainId);
    },
    isConnected() {
      if (!window.ethereum) {
        return false;
      }
      return !!this.$store.state.account;
    },
    network() {
      return formatNetwork(this.$store.state.chainId);
    },
    formatAccount() {
      const account = this.$store.state.account;
      if (account.length > 0) {
        return (
          account.substr(0, 10) + "...." + account.substr(account.length - 8, 8)
        );
      }
      return account;
    },
  },
  data() {
    return {
      activePath: "",
      loading: false,
      signer: "",
      msg: "",
      msgHash: "",
      sig: "",
      recoveredAddress: "",
      isLogin: false,
    };
  },
  methods: {
    handleCommand(command) {
      switch (command) {
        case "account":
          console.log(command);
          break;
        case "logout":
          removeToken();
          this.isLogin = false;
          this.$router.push("/");
          break;
        default:
          break;
      }
    },
    async checkState() {
      if (window.ethereum) {
        try {
          const account = await contracts.signer.getAddress();
          const chainId = await contracts.signer.getChainId();
          this.$store.commit(UPDATE_ACCOUNT, account);
          this.$store.commit(UPDATE_CHAINID, chainId);
        } catch (e) {
          console.log(e);
        }
      }
    },
    async getConnect() {
      connect();
    },
    getIsLogin() {
      this.isLogin = getToken();
      this.activePath = this.$route.path;
    },
    listen() {
      window.ethereum.on("accountsChanged", (accounts) => {
        this.$store.commit(UPDATE_ACCOUNT, accounts[0]);
        if (accounts.length == 0) {
          removeToken();
          this.$router.push("/");
        }
      });
      window.ethereum.on("chainChanged", (chainId) => {
        this.$store.commit(UPDATE_CHAINID, chainId);
        window.location.reload();
      });
    },
  },

  watch: {
    $route: "getIsLogin",
  },
  created() {
    this.checkState();
    this.getIsLogin();
    this.listen();
  },
};
</script>
<style lang="less" scoped>
#mintNav {
  display: flex;
  align-items: center;
  .logo {
    height: 50px;
  }
  .el-menu-mint {
    border: none;
    margin: auto;
    .el-menu-item {
      height: 89px;
      line-height: 89px;
      border: none;
      margin: 0 35px;
    }
  }
  .connect-wallet {
    border: 1px solid #484d72;
    padding: 5px 10px;
    font-size: 14px;
    cursor: pointer;
  }
}
.rotate-right {
  transform: rotate(-90deg);
}
</style>
