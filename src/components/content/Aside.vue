<template>
  <div class="Aside">
    <!-- 侧栏 -->
    <el-col :span="24">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        router>
        <el-menu-item index="/users">
          <i class="el-icon-user"></i>
          <span slot="title">用户管理</span>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>部门管理</span>
          </template>
            <el-menu-item index="/departmentLife">人事行政部</el-menu-item>
            <el-menu-item index="/departmentVue">产品开发部</el-menu-item>
            <el-menu-item index="/departmentSales">品牌推广部</el-menu-item>
            <el-menu-item index="/departmentMoney">财务部</el-menu-item>
            <el-menu-item index="/departmentYy">运营部</el-menu-item>
            
        </el-submenu>
        <el-menu-item index="/job">
          <i class="el-icon-menu"></i>
          <span slot="title">岗位管理</span>
        </el-menu-item>
        <el-menu-item index="/workers">
          <i class="el-icon-setting"></i>
          <span slot="title">人员信息</span>
        </el-menu-item>
        <el-menu-item index="/attendance">
          <i class="el-icon-setting"></i>
          <span slot="title">考勤管理</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </div>
</template>

<script>

export default {
    data(){
      return{
        activeIndex: '/users',        //default-active默认选择/users
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    },
    components: {
      
    }
}
</script>

<style scoped>
    .el-menu{
      border: 0;
    }
</style>