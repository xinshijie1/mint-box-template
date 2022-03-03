<template>
  <div id="mintFooter" class="container">
    Power by
    <a href="https://4everland.org/" target="_blank" style="margin-left: 10px"
      >4EVERLAND</a
    >
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeIndex: "1",
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>
<style lang="less" scoped>
#mintFooter {
  display: flex;
  align-items: center;
  height: 120px;
  .logo {
    height: 50px;
  }
  .el-menu-mint {
    border: none;
    .el-menu-item {
      height: 89px;
      line-height: 89px;
      border: none;
    }
    .is-active {
      color: #2a7eed;
    }
  }
}
</style>
