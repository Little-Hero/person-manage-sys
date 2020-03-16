<template>
  <div class="Main">
    <div style="text-align:center">
      <el-input placeholder="请输入内容" v-model="search" clearable class="search">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
    </div>
    <!--------------------------------------- 显示用户表格 ---
    ------------------------------------>
    <el-table
      ref="multipleTable"
      :data="tableData1.slice((currentPage-1)*pageSize, currentPage*pageSize)"
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
import AddUsers from 'components/common/AddUsers'
import Paging from 'components/common/Paging'

import { getUsersData } from "network/main"
import { delUser } from "network/del"

export default {
    data() {
      return {    
        search: '',    
        tableData: [],      // 获取用户数据
        currentPage: 1,     // 获取分页默认的页数
        pageSize: 8,        // 获取每一页有多少行数据
        // isDel: true,       // 删除按钮是否可点击
        rowObject: [],
        sels: []           // 多选框中选中才用list接受需要显示的值
      }
    },
    computed: {
      tableData1(){
        const search = this.search
      if (search) {
        console.log('this.tableData', this.tableData)
        return this.tableData.filter(dataNews => {
          return Object.keys(dataNews).some(key => {
            return String(dataNews[key]).toLowerCase().indexOf(search) > -1
          })
        })
      }
      console.log('this.tableData', this.tableData)
      return this.tableData
    
      }
    },
    // watch: {
    //   search(val, oldval){
    //     this.tableData = this.oldtableData.filter( item => (~item.name.indexOf(val)));
    //   }
    // },
    components: {
      AddUsers,
      Paging
    },
    methods: {
      // 分页发送回父组件的事件
      event(currentPage){
        this.currentPage = currentPage
      },

      //详情点击事件
      handleEdit(scope) {
        this.$router.replace({
          path: '/Detail/' + scope.row.id,
          params:{
            id: scope.row.id
          }
        })
      },

      format (val) {
      if (val.indexOf(this.search) !== -1 && this.search !== '') {
        return val.replace(this.search, '<font color="red">' + this.search + '</font>')
      } else {
        return val
      }
    },
      // DetailClick(){        
      //   this.$router.push({
      //     path: '/Detail/' + this.rowObject.id,
      //     id: this.rowObject.id
      //   })
      //   console.log(this.sels)
      // },
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
       * 网络事件，增删改查
       * 访问网络数据
       *
       */

      /**
       * 获取用户信息
       */
      getUsersData(){
          getUsersData().then(res => {
          this.tableData = res.data
          //对表格tableData的数据通过id排序
          this.tableData.sort((a, b) => {
              return a.id - b.id
            })
          })
      },

      /**
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
    },

    created(){
      //调用网络数据方法，封装
        this.getUsersData()
    }
}
</script>

<style>
    .Main{
       flex: 1;
      font-size: 18px;
    }
    .search{
      width: 50%;
      text-align: center;
      margin-bottom: 10px;
    }
    .search .el-input__inner{
      border-radius: 15px;
      border: solid 1px rgb(178, 210, 230);
    }
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