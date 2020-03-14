<template>
  <div class="Head">
    <div class="Logo">人事管理系统</div>
    <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">处理中心</el-menu-item>
      <el-menu-item index="3"><a href="#">退出</a></el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
    data() {
      return {
        activeIndex: '1'      // 默认选中index为1的菜单栏
      }
    },
    methods: {
      handleSelect(key, keyPath) {
          console.log(key, keyPath);
        }
    }
}
</script>

<style scoped>
    .Logo{
      font-size: 22px;
      padding-left: 20px;
    }
    .Head{
      display: flex;
      border-bottom: solid 1px #eee;
      align-items: center;
      justify-content: space-between;
    }
    .Head .el-menu.el-menu--horizontal{
      border: 0;
    }
</style>