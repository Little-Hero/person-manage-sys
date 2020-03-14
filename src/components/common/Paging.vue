<template>
  <div class="Paging">
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="PageSize"
      layout="total, prev, pager, next, jumper"
      :total="tableDataLength">
    </el-pagination>
  </div>
</template>

<script>
export default {
    data(){
      return{
        PageSize: 8,
        currentPage: 1
      }
    },
    props:{
      // 传入一整个数组，数据需要获取需要使用lengt
      tableDataLength: {
        type: Number
      }
    },
    methods: {      
      // 发送当前点击了那一页
      handleCurrentChange(currentPage){
        this.$emit('event', currentPage)
      },
    }
}
</script>

<style scoped>

</style>