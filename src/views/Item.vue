<template>
  <div id="item" v-if="itemInfo" v-loading.fullscreen.lock="fullscreenLoading">
    <div class="top">
      <div class="container item-container">
        <div class="top-box">
          <el-image :src="itemInfo.logo" class="item-icon">
            <div slot="error">
              <img src="@/assets/images/default.png" alt="" class="item-icon" />
            </div>
          </el-image>
          <p class="item-name">{{ itemInfo.name }}</p>
          <div class="item-link">
            <a href="www.mintbox.com">{{ itemInfo.site }}</a>
            <i
              class="el-icon-document-copy copy-icon"
              @click="copy(itemInfo.site)"
            ></i>
          </div>
          <div class="item-desc">
            {{ itemInfo.description }}
          </div>
          <div class="item-num">
            <div class="left">
              <div class="num">{{ itemInfo.items }}</div>
              <div class="text">Items</div>
            </div>
            <div class="right">
              <div class="num">{{ itemInfo.owners }}</div>
              <div class="text">Owners</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container" v-if="nftList.length > 0" style="max-width: 1060px">
      <div class="main">
        <div class="nft-item" v-for="(item, index) in nftList" :key="index">
          <el-image
            class="nft-img"
            :src="item.url"
            alt=""
            @click="goToDetail(item)"
            lazy
          >
          </el-image>
          <div class="nft-footer">
            <div class="nft-name">{{ item.name + " #" + item.tokenId }}</div>
            <div class="nft-info">
              <span>Price</span>
              <span>
                <span class="price">{{ item.price }}</span>
                {{ item.unit }}
              </span>
            </div>

            <div class="nft-owner-box" v-if="item.owner || item.status != 1">
              owner: {{ formatAccount(item.owner) }}
            </div>
            <div class="nft-btn-box" v-else>
              <button
                v-if="type == 'm721'"
                class="nft-btn"
                @click="buyNftMutiple(item)"
              >
                Buy
              </button>
              <button
                v-else-if="type == '1155' && item.supply != 0"
                class="nft-btn"
                @click="buyNft(item.tokenId)"
              >
                Buy
              </button>
              <button v-else class="nft-btn" @click="buyNft(item.tokenId)">
                Buy
              </button>
            </div>
          </div>
        </div>
      </div>
      <el-pagination
        class="pagination"
        :hide-on-single-page="true"
        background
        layout="prev, pager, next"
        :total="count"
        :page-size="pageSize"
        @current-change="pageChange"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { getNFTsCollectionItem, getNFTsCollectionItemList } from "@/api";
import { uint256Max, formatNetwork } from "@/utils";
import contracts from "@/contracts";
import { setContractAddress, getToken, connect } from "@/utils/auth";

export default {
  name: "exploreDetail",
  computed: {
    deployment() {
      return this.$store.state.contractAddr;
    },
  },
  data() {
    return {
      tokenId: "",
      itemInfo: null,
      nftList: [],
      type: "",
      count: 0,
      rootHash: "",
      fullscreenLoading: false,
      currentPage: 1,
      pageSize: 15,
      shouldApprove: true,
    };
  },
  methods: {
    async init() {
      if (!this.deployment) {
        await setContractAddress();
      }
      this.getNftsItemInfo();
      this.getNftsItemList();
    },
    getNftsItemInfo() {
      getNFTsCollectionItem(this.deployment).then((res) => {
        this.itemInfo = res.data;
      });
    },
    getNftsItemList() {
      getNFTsCollectionItemList(this.deployment, this.currentPage).then(
        (res) => {
          this.nftList = res.data.list;
          this.type = res.data.type;
          this.count = res.data.count;
          this.rootHash = res.data.rootHash;
          this.chainId = Number(res.data.chainId);
          if (getToken()) {
            this.checkApprove();
          }
        }
      );
    },
    pageChange(page) {
      this.currentPage = page;
      this.getNftsItemList();
    },
    goToDetail(item) {
      let cid = item.cid.replace("ipfs://", "");
      this.$router.push(`/nftDetail/${cid}`);
    },
    copy(data) {
      let url = data;
      let oInput = document.createElement("input");
      oInput.value = url;
      document.body.appendChild(oInput);
      oInput.select();
      console.log(oInput.value);
      document.execCommand("Copy");
      this.$message({
        message: "Copy success",
        type: "success",
      });
      oInput.remove();
    },
    formatAccount(account) {
      if (account.length > 0) {
        return (
          account.substr(0, 10) + "...." + account.substr(account.length - 8, 8)
        );
      }
      return account;
    },
    async checkToken() {
      let token = getToken();
      if (!token) {
        connect();
        return false;
      } else if (!this.checkChainId()) {
        return false;
      } else {
        return true;
      }
    },
    async buyNft(tokenId) {
      const isToken = await this.checkToken();
      if (!isToken) {
        return;
      }
      this.tokenId = tokenId;
      if (this.shouldApprove) {
        this.approve();
      } else {
        this.mint();
      }
    },
    async buyNftMutiple(nftData) {
      const isToken = await this.checkToken();
      if (!isToken) {
        return;
      }
      this.nftData = nftData;
      if (this.shouldApprove) {
        this.approve();
      } else {
        this.mint();
      }
    },
    checkChainId() {
      const chainId = this.$store.state.chainId;
      if (this.chainId !== chainId) {
        const network = formatNetwork(this.chainId);
        this.$message.error(`Please select the ${network} network.`);
        return false;
      }
      return true;
    },
    async checkApprove() {
      switch (this.type) {
        case "721":
          this.check721Approve();
          break;
        case "m721":
          this.check721mApprove();
          break;
        case "1155":
          this.check1155Approve();
          break;
      }
    },
    async check721Approve() {
      const from = await contracts.signer.getAddress();
      const payToken = await contracts
        .ERC721SingleCollectionUpgradeable(this.deployment)
        .payToken();
      const erc = contracts.ERC20(payToken);
      const allowance = await erc.allowance(from, contracts.delegatePay);
      const minAllowance = uint256Max.shr(1);
      this.shouldApprove = allowance.lt(minAllowance);
    },
    async check721mApprove() {
      const from = await contracts.signer.getAddress();
      const payToken = await contracts
        .ERC721MultiCollectionUpgradeable(this.deployment)
        .payToken();
      const erc = contracts.ERC20(payToken);
      const allowance = await erc.allowance(from, contracts.delegatePay);
      const minAllowance = uint256Max.shr(1);
      this.shouldApprove = allowance.lt(minAllowance);
    },
    async check1155Approve() {
      const from = await contracts.signer.getAddress();
      const payToken = await contracts
        .ERC1155SingleCollectionUpgradeable(this.deployment)
        .payToken();
      const erc = contracts.ERC20(payToken);
      const allowance = await erc.allowance(from, contracts.delegatePay);
      const minAllowance = uint256Max.shr(1);
      this.shouldApprove = allowance.lt(minAllowance);
    },
    async checkBalance(payToken, price) {
      const owner = await contracts.signer.getAddress();
      const balance = await contracts.ERC20(payToken).balanceOf(owner);
      if (price.gt(balance)) {
        this.$message.error(
          "Payment failed due to insufficient wallet balance."
        );
      }
      return price.gt(balance);
    },
    async approve() {
      switch (this.type) {
        case "721":
          this.approve721();
          break;
        case "m721":
          this.approve721m();
          break;
        case "1155":
          this.approve1155();
          break;
      }
    },
    async approve721() {
      try {
        this.fullscreenLoading = true;
        const payToken = await contracts
          .ERC721SingleCollectionUpgradeable(this.deployment)
          .payToken();
        const erc = contracts.ERC20(payToken);
        const data = erc.interface.encodeFunctionData("approve", [
          contracts.delegatePay,
          uint256Max,
        ]);
        const from = await contracts.signer.getAddress();
        const tx = await contracts.signer.sendTransaction({
          from,
          to: payToken,
          data,
        });
        await tx.wait();
        this.mint();
      } catch (e) {
        console.log(e);
        this.fullscreenLoading = false;
      }
    },
    async approve721m() {
      try {
        this.fullscreenLoading = true;
        const payToken = await contracts
          .ERC721MultiCollectionUpgradeable(this.deployment)
          .payToken();
        const erc = contracts.ERC20(payToken);
        const data = erc.interface.encodeFunctionData("approve", [
          contracts.delegatePay,
          uint256Max,
        ]);
        const from = await contracts.signer.getAddress();
        const tx = await contracts.signer.sendTransaction({
          from,
          to: payToken,
          data,
        });
        await tx.wait();
        this.mint();
      } catch (e) {
        console.log(e);
        this.fullscreenLoading = false;
      }
    },
    async approve1155() {
      try {
        this.fullscreenLoading = true;
        const payToken = await contracts
          .ERC1155SingleCollectionUpgradeable(this.deployment)
          .payToken();
        const erc = contracts.ERC20(payToken);
        const data = erc.interface.encodeFunctionData("approve", [
          contracts.delegatePay,
          uint256Max,
        ]);
        const from = await contracts.signer.getAddress();
        const tx = await contracts.signer.sendTransaction({
          from,
          to: payToken,
          data,
        });
        await tx.wait();
        this.mint();
      } catch (e) {
        console.log(e);
        this.fullscreenLoading = false;
      }
    },
    mint() {
      switch (this.type) {
        case "721":
          this.mintSingle721();
          break;
        case "m721":
          this.mintMultiple721();
          break;
        case "1155":
          this.mintSingle1155();
          break;
      }
    },
    async mintSingle721() {
      try {
        this.fullscreenLoading = true;
        const owner = await contracts.signer.getAddress();
        const data = contracts
          .ERC721SingleCollectionUpgradeable(this.deployment)
          .interface.encodeFunctionData("mint", [owner, this.tokenId]);
        const payToken = await contracts
          .ERC721SingleCollectionUpgradeable(this.deployment)
          .payToken();
        const price = await contracts
          .ERC721SingleCollectionUpgradeable(this.deployment)
          .price();
        const isBalance = await this.checkBalance(payToken, price);
        if (isBalance) {
          return;
        }
        const payData = contracts.DelegatePay.interface.encodeFunctionData(
          "delegatePay",
          [this.deployment, payToken, price, data]
        );
        const tx = await contracts.signer.sendTransaction({
          from: owner,
          to: contracts.delegatePay,
          data: payData,
        });
        console.log(tx);
        const receipt = await tx.wait();
        console.log("receipt", receipt);
        this.success();
      } catch (e) {
        console.log(e);
      } finally {
        this.fullscreenLoading = false;
      }
    },
    async mintMultiple721() {
      try {
        this.fullscreenLoading = true;
        const owner = await contracts.signer.getAddress();
        const data = contracts
          .ERC721MultiCollectionUpgradeable(this.deployment)
          .interface.encodeFunctionData("claimAndMint", [
            owner,
            this.rootHash,
            this.nftData.cid,
            this.nftData.creator,
            this.nftData.proofs,
          ]);
        const payToken = await contracts
          .ERC721MultiCollectionUpgradeable(this.deployment)
          .payToken();
        const price = await contracts
          .ERC721MultiCollectionUpgradeable(this.deployment)
          .price();
        const isBalance = await this.checkBalance(payToken, price);
        if (isBalance) {
          return;
        }
        const payData = contracts.DelegatePay.interface.encodeFunctionData(
          "delegatePay",
          [this.deployment, payToken, price, data]
        );
        const tx = await contracts.signer.sendTransaction({
          from: owner,
          to: contracts.delegatePay,
          data: payData,
        });
        console.log(tx);
        const receipt = await tx.wait();
        console.log("receipt", receipt);
        this.success();
      } catch (e) {
        console.log(e);
      } finally {
        this.fullscreenLoading = false;
      }
    },
    async mintSingle1155() {
      try {
        this.fullscreenLoading = true;
        const owner = await contracts.signer.getAddress();
        const amount = 1;
        const mintdata = contracts
          .ERC1155SingleCollectionUpgradeable(this.deployment)
          .interface.encodeFunctionData("mint", [
            owner,
            this.tokenId,
            amount,
            Buffer.alloc(0),
          ]);
        const payToken = await contracts
          .ERC1155SingleCollectionUpgradeable(this.deployment)
          .payToken();
        const price = await contracts
          .ERC1155SingleCollectionUpgradeable(this.deployment)
          .price();
        const isBalance = await this.checkBalance(payToken, price);
        if (isBalance) {
          return;
        }
        const data = contracts.DelegatePay.interface.encodeFunctionData(
          "delegatePay",
          [this.deployment, payToken, price.mul(amount), mintdata]
        );
        const tx = await contracts.signer.sendTransaction({
          from: owner,
          to: contracts.delegatePay,
          data,
        });
        console.log(tx);
        const receipt = await tx.wait();
        console.log("receipt", receipt);
        this.success();
      } catch (e) {
        console.log(e);
      } finally {
        this.fullscreenLoading = false;
      }
    },
    success() {
      this.$message({
        message: "Mint Success",
        type: "success",
      });
      setTimeout(() => {
        this.getNftsItemInfo();
        this.getNftsItemList();
      }, 500);
    },
  },
  mounted() {
    this.init();
  },
};
</script>
<style lang="less" scoped>
#item {
  .top {
    background-image: url("../assets/images/item-banner.png");
    background-size: cover;
    background-repeat: no-repeat;
    min-height: 400px;
    .item-container {
      background-color: rgba(217, 208, 216, 0.5);
      .top-box {
        min-height: 400px;
        margin: 0 auto;
        text-align: center;
        padding: 50px;
        box-sizing: border-box;
        .item-icon {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          margin-bottom: 20px;
        }
        .item-name {
          font-size: 16px;
          color: #000;
          margin-bottom: 12px;
        }
        .item-link {
          font-size: 12px;
          color: #2a7eed;
          margin-bottom: 13px;
          a {
            color: #2a7eed;
            margin-right: 5px;
          }
          .copy-icon {
            cursor: pointer;
          }
        }
        .item-desc {
          font-size: 12px;
          color: #666;
          margin-bottom: 24px;
          word-break: break-all;
        }
        .item-num {
          display: flex;
          justify-content: center;
          width: 240px;
          border: 1px solid #484d72;
          border-radius: 50px;
          margin: 0 auto;
          .left {
            width: 120px;
            border-right: 1px solid #484d72;
          }
          .right {
            width: 120px;
          }
          .num {
            font-size: 16px;
            color: #000;
            font-weight: bold;
          }
          .text {
            font-size: 10px;
            color: #666;
          }
        }
      }
    }
  }
  .main {
    display: flex;
    flex-wrap: wrap;
    margin-top: 50px;
    .nft-item {
      border: 1px solid #e0e2e4;
      margin: 25px;
      .nft-img {
        width: 300px;
        height: 300px;
        cursor: pointer;
      }
      .nft-footer {
        padding: 20px;
        .nft-name {
          font-size: 16px;
          font-weight: bold;
          color: #000;
        }
        .nft-info {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          color: #999;
          .price {
            color: #000;
            font-weight: bold;
          }
        }
        .nft-btn-box {
          text-align: right;
          margin-top: 20px;
          .nft-btn {
            width: 64px;
            height: 28px;
            background-color: #a27ec6;
            color: #fff;
            border: 1px solid #a27ec6;
            border-radius: 5px;
            cursor: pointer;
          }
        }
        .nft-owner-box {
          margin-top: 10px;
          text-align: left;
          font-size: 12px;
          color: #999999;
        }
      }
    }
  }
  .pagination {
    text-align: center;
    margin: 40px 0;
  }
}
</style>
