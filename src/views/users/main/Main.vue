<template>
  <div class="Main">
    <!--------------------------------------- 显示用户表格 --------------------------------------->
    <el-table
      ref="multipleTable"
      :data="tableData.slice((currentPage-1)*pageSize, currentPage*pageSize)"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="selsChange"
      >
      <el-table-column type="selection" width="45"></el-table-column>
      <el-table-column prop="id" label="编号" width="70"></el-table-column>
      <el-table-column prop="name" label="姓名" width="90"></el-table-column>
      <el-table-column prop="sex" label="性别" width="80"></el-table-column>
      <el-table-column prop="age" label="年龄" width="80"></el-table-column>
      <el-table-column prop="phone" label="电话号码" width="130"></el-table-column>
      <el-table-column prop="email" label="电子邮件" width="180"></el-table-column>
      <el-table-column prop="department" label="所在部门" width="110"></el-table-column>
      <el-table-column prop="adress" label="地址" width="220"></el-table-column>
      <el-table-column label="操作" show-overflow-tooltip>
        <el-button type="primary" @click="DetailClick">详情</el-button>
      </el-table-column>
    </el-table>
    <div style="float: left;margin-top: 10px;margin-bottom: 10px;">
      <!--------------------------------------- 添加用户组件 --------------------------------------->
      <AddUsers :tableAddData="tableData"></AddUsers>

      <!--------------------------------------- 删除按钮 --------------------------------------->
      <el-button type="danger" @click="delClick" :disabled="isDel">批量删除</el-button>
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
        tableData: [],      // 获取用户数据
        currentPage: 1,     // 获取分页默认的页数
        pageSize: 8,        // 获取每一页有多少行数据
        isDel: true,       // 删除按钮是否可点击
        sels: [],           // 多选框中选中才用list接受需要显示的值
      }
    },
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
      DetailClick(){
        console.log(this.currentPage)
      },
      
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
          this.isDel = false
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