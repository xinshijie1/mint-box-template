<template>
  <div id="NftDetail" class="container">
    <el-row type="flex">
      <el-col>
        <div class="nft-img-box text-center">
          <img class="nft-img" :src="nftDetail.url" alt="" />
          <p class="nft-name">
            <span>{{ nftDetail.name }}</span>
            <span v-if="nftDetail.tokenId">#{{ nftDetail.tokenId }}</span>
          </p>
        </div>
        <div class="nft-info-box">
          <p class="nft-name">Details</p>
          <table class="nft-table" border="1">
            <tr>
              <td>Contract Address</td>
              <td>{{ nftDetail.contractAddress | formatAccount }}</td>
            </tr>
            <tr>
              <td>Token ID</td>
              <td>{{ nftDetail.tokenId }}</td>
            </tr>
            <tr>
              <td>Token Standard</td>
              <td>{{ nftDetail.standard }}</td>
            </tr>
            <tr>
              <td>Blockchain</td>
              <td>{{ nftDetail.blockchain }}</td>
            </tr>
            <tr>
              <td>Hash</td>
              <td>{{ nftDetail.transactionHash }}</td>
            </tr>
          </table>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getNFTsCollectionItemDetail } from "@/api";

export default {
  name: "NftDetail",
  filters: {
    formatAccount(contractAddress) {
      if (contractAddress && contractAddress.length > 0) {
        return (
          contractAddress.substr(0, 10) +
          "...." +
          contractAddress.substr(contractAddress.length - 8, 8)
        );
      }
      return contractAddress;
    },
  },
  data() {
    return {
      nftDetail: [],
      cid: null,
    };
  },
  methods: {
    getDetail() {
      getNFTsCollectionItemDetail(this.cid).then((res) => {
        this.nftDetail = res.data;
      });
    },
  },
  created() {
    this.cid = this.$route.params.id;
    this.getDetail();
  },
};
</script>
<style lang="less" scoped>
#NftDetail {
  padding-top: 50px;
  .nft-img-box,
  .nft-info-box {
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
  }
  .nft-img {
    width: 100%;
    max-width: 500px;
  }
  .nft-name {
    font-size: 16px;
    font-weight: bold;
    margin-top: 20px;
  }
  .nft-table {
    width: 100%;
    line-height: 46px;
    border-color: #d8dadd;
    border-collapse: collapse;
    tr {
      td {
        padding: 0 20px;
        font-size: 14px;
        &:first-child {
          color: #999999;
        }
        &:last-child {
          text-align: right;
        }
      }
    }
  }
}
</style>
