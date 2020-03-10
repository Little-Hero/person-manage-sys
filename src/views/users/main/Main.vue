<template>
  <div class="Main">
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      >
      <!-- @selection-change="handleSelectionChange -->
      <el-table-column type="selection" width="45"></el-table-column>
      <el-table-column prop="id" label="编号" width="70"></el-table-column>
      <el-table-column prop="name" label="姓名" width="90"></el-table-column>
      <el-table-column prop="sex" label="性别" width="80"></el-table-column>
      <el-table-column prop="age" label="年龄" width="80"></el-table-column>
      <el-table-column prop="phone" label="电话号码" width="130"></el-table-column>
      <el-table-column prop="email" label="电子邮件" width="180">
        <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
      </el-table-column>
      <el-table-column prop="departmentId" label="所在部门" width="110"></el-table-column>
      <el-table-column prop="adress" label="地址" width="220"></el-table-column>
      <el-table-column label="操作" show-overflow-tooltip>
        <el-button type="primary" @click="btnClick">详情</el-button>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px;margin-bottom: 100px;">
      <!-- <el-button @click="toggleSelection([tableData3[1], tableData3[2]])">切换第二、第三行的选中状态</el-button>
      <el-button @click="toggleSelection()">取消选择</el-button> -->
      <el-button type="primary" @click="addClick">添加用户</el-button>
      <el-button type="primary" @click="delClick">删除用户</el-button>
    </div>
  </div>
</template>

<script>
import { getUsersData } from "network/main"

export default {
    data() {
      return {
        // 获取用户数据
        tableData: [],
        // multipleSelection: []
      }
    },
    methods: {
      // toggleSelection(rows) {
      //   if (rows) {
      //     rows.forEach(row => {
      //       this.$refs.multipleTable.toggleRowSelection(row);
      //     });
      //   } else {
      //     this.$refs.multipleTable.clearSelection();
      //   }
      // },
      // handleSelectionChange(val) {
      //   this.multipleSelection = val;
      // },

      //详情点击事件
      btnClick(){
        
      },

      //添加用户事件
      addClick(){

      },

      //删除用户事件
      delClick(){
        
      },

      /**
       * 
       * 请问网络数据methods
       *        
       */
      getUsersData(){
          getUsersData().then(res => {
          this.tableData = res.data
        })
        }
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