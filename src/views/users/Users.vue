<template>
  <div class="Users">
    <!--------------------------------------- 用户数据组件 --------------------------------------->
    <Main @getTableData="getUserData" :tableData="tableUserData"></Main>
  </div>
</template>

<script>
import Main from 'components/common/Main'

import { getUsersData } from "network/get"

export default {
    data(){
      return {
        // 定义一个集合保存表格数据
        tableUserData: []
      }
    },
    components: {
      Main
    },
    methods: {
      // 定义由Main组件传递过来的函数
      getUserData(){

        // 执行请求网络数据方法获取数据并传入参数
        getUsersData().then(res => {

          // 将请求的数据保存到定义的tableUserData集合上
          this.tableUserData = res.data
          // console.log(this.tableUserData)

          // 对表格tableUserData的数据通过id排序
          this.tableUserData.sort((a, b) => {
              return a.id - b.id
            })
          })
      }
    },
    created(){
      this.getUserData()
    }
}
</script>

<style scoped>
    
</style>