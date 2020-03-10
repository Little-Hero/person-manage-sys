<template>
  <el-container class="Aside-box">
    <!-- 顶部导航 -->
  <el-header class="header">
    <Head></Head>
  </el-header>

    <!-- 侧栏导航 -->
  <el-container>    
    <el-aside width="31vh" class="aside">
      <Aside></Aside>
    </el-aside>

    <!-- 主要内容 -->
    <el-container>
      <el-main class="main">
        <router-view/>
      </el-main>

      <!-- 尾部内容 -->
      <!-- <el-footer class="footer">
        
      </el-footer> -->
    </el-container>
  </el-container>
</el-container>
</template>

<script>
import Head from 'components/content/Head'
import Aside from 'components/content/Aside'

export default {
  // 注册组件
  components: {
    Head,
    Aside
  }
}
</script>
    
<style>
    .Aside-box{
      height: 100vh;
    }
    .header{
      padding: 0;
    }
    .aside{
      /* background: cornflowerblue; */
      border-right: solid 1px #eee;
      margin-top: 2px;
    }
    .main{
      /* background: crimson; */
      font-size: 18px;
    }
    .footer{
      background: burlywood;
    }
</style>