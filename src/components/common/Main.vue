<template>
  <div class="Main">
    <!--------------------------------------- 搜索框 --------------------------------------->
    <div style="text-align:center">
      <el-input placeholder="请输入内容" v-model="search" clearable class="search">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
    </div>

    <!--------------------------------------- 显示用户表格 --------------------------------------->
    <el-table
      ref="multipleTable"
      :data="tableData1"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="selsChange"
      >
      <el-table-column type="selection" width="65"></el-table-column>
      <el-table-column prop="id" label="编号" width="70"></el-table-column>
      <el-table-column prop="name" label="姓名" width="110"></el-table-column>
      <el-table-column prop="sex" label="性别" width="100"></el-table-column>
      <el-table-column prop="department" label="所在部门" width="130"></el-table-column>
      <el-table-column prop="woking" label="担任职位" width="130"></el-table-column>
      <el-table-column prop="phone" label="电话号码" width="150"></el-table-column>
      <el-table-column prop="email" label="电子邮件" width="200"></el-table-column>
      <el-table-column label="操作" show-overflow-tooltip>

      <!------------------- 利用elementUI的表格scope用法,获取当前点击的行对象 -------------------->
      <template slot-scope="scope">
				<el-button type="primary" @click="handleEdit(scope)">详情</el-button>
			</template>
      </el-table-column>
    </el-table>

    <div style="float: left;margin-top: 10px;margin-bottom: 10px;">
      <!--------------------------------------- 添加用户组件 --------------------------------------->
      <AddUsers :tableAddData="tableData"></AddUsers>

      <!--------------------------------------- 删除按钮 --------------------------------------->
      <el-button type="danger" @click="delClick">批量删除</el-button>
    </div>

    <!--------------------------------------- 实现分页组件 --------------------------------------->
    <Paging :tableDataLength="tableData.length" style="margin-left: 33%;margin-top: 10px;" @event="event"></Paging>

  </div>
</template>

<script>
//导入显示组件
import AddUsers from 'components/common/AddUsers'
import Paging from 'components/common/Paging'

//导入network工作函数
import { getUsersData } from "network/get"
import { delUser } from "network/del"

export default {
    data() {
      return {    
        search: '',         // 获取当前搜索框的值
        // tableData: [],      // 获取用户数据
        currentPage: 1,     // 获取分页默认的页数
        pageSize: 8,        // 获取每一页有多少行数据
        // isDel: true,     // 删除按钮是否可点击
        sels: []            // 多选框中选中才用list接受需要显示的值
      }
    },
    props: {
      tableData: {
        type: Array
      }
    },
    computed: {
      // 将获取的tableData数据保存在computed,反复使用时不用再次读取数据
      // 用法来源于网上
      tableData1(){
        const search = this.search
        if (search) {
          return this.tableData.filter(dataNews => {
            return Object.keys(dataNews).some(key => {
              return String(dataNews[key]).toLowerCase().indexOf(search) > -1
            })
          })
        }
      return this.tableData.slice((this.currentPage-1)*this.pageSize, this.currentPage*this.pageSize)
      }
    },
    components: {
      AddUsers,
      Paging
    },
    methods: {
      // 分页发送回父组件,父组件接受事件
      event(currentPage){
        this.currentPage = currentPage
      },

      //详情按钮点击事件
      handleEdit(scope) {
        this.$router.replace({
          path: '/Detail/' + scope.row.id,
          params:{
            id: scope.row.id
          }
        })
      },

      // 详情点击事件
      // DetailClick(){        
      //   this.$router.push({
      //     path: '/Detail/' + this.rowObject.id,
      //     id: this.rowObject.id
      //   })
      //   console.log(this.sels)
      // },

      // elementUI的表格函数获取点击行数据
      // tableRowClassName ({row, rowIndex}) {
      //   // 把每一行的索引放进row
      //   if (rowIndex === 0) {
      //     console.log("111")
      //   }
      // },

      //因为表格上tableData太长，给他包一层函数直接引用
      // tableDataSlice(){
      //   return this.tableData.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize)
      // },

      /**
       * 网络事件，增删查
       * 访问网络数据
       *
       */

      /**
       * 获取用户信息
       */
      // getUsersData(){
      //     getUsersData().then(res => {
      //     this.tableData = res.data
      //     //对表格tableData的数据通过id排序
      //     this.tableData.sort((a, b) => {
      //         return a.id - b.id
      //       })
      //     })
      // },
      getTableData(){
          this.$emit('getTableData')
      },

      /**
       * 删:
       * 删除用户事件
       */
      //将当前选中的表格数据添加到sels
      selsChange(val) { 
          //被选中的行组成数组 
          this.sels = val
      },

      //删除点击事件
      delClick(){
        for (let i = 0; i < this.sels.length; i++) {
          console.log(this.tableData.indexOf(this.sels[i]))
          delUser(this.sels[i].id).then(res => {
            console.log("删除成功")
            this.tableData.splice(this.tableData.indexOf(this.sels[i]), 1)
          })
        }
      },
      
      /**
       * 查:
       * 根据搜索框提供的当前触发事件,用法来源于网络
       */
      format (val) {
        if (val.indexOf(this.search) !== -1 && this.search !== '') {
          return val.replace(this.search, '<font color="red">' + this.search + '</font>')
        } else {
          return val
        }
      },
    },
}
</script>

<style>
    /* 主div样式 */
    .Main{
       flex: 1;
      font-size: 18px;
    }

    /* 搜索框样式 */
    .search{
      width: 50%;
      text-align: center;
      margin-bottom: 10px;
    }

    /* elementUI表格内部样式搜索框内部样式,需使用"ctrl + shift + i"查看 */
    .search .el-input__inner{
      border-radius: 15px;
      border: solid 1px rgb(178, 210, 230);
    }

    /* elementUI表格内部样式,需使用"ctrl + shift + i"查看 */
    .el-table th>.cell{
      text-align: center;
      font-size: 15px;
    }
    .el-table td, .el-table th.is-leaf{
      width: 20vh;
    }
    .el-table .cell{
      font-size: 14px;
      text-align: center;
    }
</style>