<template>
  <div id="app">
    <el-container>
      <el-header height="90px">
        <mint-header />
      </el-header>
      <el-main>
        <router-view />
      </el-main>
      <el-footer height="120px">
        <mint-footer />
      </el-footer>
    </el-container>
  </div>
</template>
<script>
import MintHeader from "@/components/MintHeader.vue";
import MintFooter from "@/components/MintFooter.vue";
export default {
  name: "App",
  components: {
    MintHeader,
    MintFooter,
  },
};
</script>
<style lang="less">
body {
  margin: 0;
  .el-header {
    text-align: center;
    padding: 0 50px;
    border-bottom: 1px solid #e6e6e6;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #fff;
    width: 100%;
    z-index: 99;
  }
  .el-main {
    min-height: calc(100vh - 90px - 120px);
    padding: 0;
    padding-top: 90px;
  }
  .el-footer {
    text-align: center;
    padding: 0 50px;
    border-top: 1px solid #e6e6e6;
  }
}
</style>
