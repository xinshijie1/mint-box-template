<template>
  <div id="MyNfts" class="container">
    <div v-if="nftList.length == 0" class="empty">
      <img src="@/assets/images/empty.png" alt="" />
      <p>No NFTs to display!</p>
    </div>
    <el-row v-else>
      <el-col :lg="8" :md="8" v-for="(item, index) in nftList" :key="index">
        <el-card class="item" :body-style="{ padding: '0px' }" shadow="never">
          <div class="nft-body">
            <el-image :src="item.url" class="image" lazy>
              <div slot="error">
                <img src="@/assets/images/default.png" alt="" class="image" />
              </div>
            </el-image>
          </div>
          <div class="nft-footer">
            <div class="nft-name">{{ item.name + " #" + item.tokenId }}</div>
            <div class="nft-info">
              <span>owner:</span>
              <span>
                <span class="price">{{ formatAccount(item.owner) }}</span>
                {{ item.unit }}
              </span>
            </div>
            <div class="nft-info">
              <span>Token ID:</span>
              <span>
                <span class="price">{{ item.tokenId }}</span>
                {{ item.unit }}
              </span>
            </div>
            <div class="nft-info">
              <span>Token Hash:</span>
              <span>
                <span class="price">{{
                  formatAccount(item.transactionHash)
                }}</span>
                {{ item.unit }}
              </span>
            </div>
            <div class="nft-btn-box">
              <el-button class="nft-btn" @click="download(item.url)">
                DOWNLOAD
              </el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <canvas id="demoCanvas"></canvas>
  </div>
</template>
<script>
import { getMyNftList } from "@/api";
import { setContractAddress } from "@/utils/auth";

export default {
  name: "MyNfts",
  computed: {
    deployment() {
      return this.$store.state.contractAddr;
    },
  },
  data() {
    return {
      nftList: [],
      page: 1,
      pageSize: 15,
    };
  },
  methods: {
    async init() {
      if (!this.deployment) {
        await setContractAddress();
      }
      this.getList();
    },
    getList() {
      getMyNftList(this.deployment).then((res) => {
        this.nftList = res.data.list;
      });
    },
    download(img) {
      window.open(img);
    },
    formatAccount(account) {
      if (account.length > 0) {
        return (
          account.substr(0, 10) + "...." + account.substr(account.length - 8, 8)
        );
      }
      return account;
    },
  },
  created() {
    this.init();
  },
};
</script>
<style lang="less" scoped>
#MyNfts {
  .empty {
    text-align: center;
    width: 100%;
    padding-top: 160px;
    img {
      max-width: 310px;
    }
    p {
      font-size: 14px;
    }
    .bold {
      font-size: 18px;
      font-weight: bold;
    }
  }
  .item {
    max-width: 308px;
    margin: 20px auto;

    .nft-name {
      color: #000;
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .nft-body {
      border-bottom: 1px solid #e3e5e6;
      min-height: 308px;
      .image {
        width: 100%;
        display: block;
      }
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
        margin-bottom: 10px;
        .price {
          color: #000;
          font-weight: bold;
        }
      }
      .nft-btn-box {
        text-align: right;
        margin-top: 20px;
        .nft-btn {
          padding: 0;
          width: 110px;
          height: 28px;
          color: #000;
          border: 1px solid #484d72;
          border-radius: 5px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
