<template>
  <div class="DepartmentSales">
    <!--------------------------------------- 人事行政部表格组件 --------------------------------------->
    <Main @getTableData="getDepSalesData" :tableData="tableDepSalesData"></Main>
  </div>
</template>

<script>
import Main from 'components/common/Main'

import { getDepartmentData } from "network/get"

export default {
    data(){
      return {
        // 定义一个集合保存表格数据
        tableDepSalesData: []
      }
    },
    components: {
      Main
    },
    methods: {
      // 定义由Main组件传递过来的函数
      getDepSalesData(){
      let departmentName = "品牌推广部"
        // 执行请求网络数据方法获取数据并传入参数
        getDepartmentData(departmentName).then(res => {

          // 将请求的数据保存到定义的tableDepSalesData集合上
          this.tableDepSalesData = res.data
          // console.log(this.tableDepSalesData)

          // 对表格tableDepSalesData的数据通过id排序
          this.tableDepSalesData.sort((a, b) => {
              return a.id - b.id
            })
          })
      }
    },
    created(){
      // 调用事件,点开路由既触发获取数据事件
      this.getDepSalesData()
    }
}
</script>

<style scoped>
    
</style>