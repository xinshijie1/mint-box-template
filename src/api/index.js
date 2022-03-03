import request from "@/utils/request";

export function exchangeCode(publicAddress) {
  return request({
    url: `/code/${publicAddress}`,
    method: "post",
  });
}

export function login(publicAddress, signature) {
  return request({
    url: `/auth/${publicAddress}`,
    method: "post",
    data: {
      signature,
    },
  });
}

export function getContractAddress() {
  return request({
    url: `/query`,
    method: "get",
  });
}

export function getMyNftList(contractAddress) {
  return request({
    url: `/properties`,
    method: "get",
    params: {
      contractAddress,
    },
  });
}

export function getNFTsCollectionItem(id) {
  return request({
    url: `/collections/${id}`,
    method: "get",
  });
}

export function getNFTsCollectionItemList(id, page) {
  return request({
    url: `/collections/${id}/${page}`,
    method: "get",
  });
}

export function getNFTsCollectionItemDetail(cid) {
  return request({
    url: `/nfts/items/${cid}`,
    method: "get",
  });
}
