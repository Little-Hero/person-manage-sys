<template>
  <div class="Detail">
    <Head style="background:white"></Head>
    <div class="from">
      <div class="btn">
        <el-button type="primary" size="medium" @click="back">
          <i class="el-icon-arrow-left">返回</i>
        </el-button>
        <el-button type="danger" size="medium" style="float:right">
          <i class="el-icon-delete"> 删除</i>
        </el-button>
        <el-button type="primary" size="medium" 
        style="float:right;margin-right: 3px" v-if="isShow"
        @click="editClick">
          <i class="el-icon-edit"> 编辑</i>
        </el-button>
        <el-button type="primary" size="medium" 
        style="float:right;margin-right: 3px" v-else
        @click="updateClick">
          <i class="el-icon-success"> 保存</i>
        </el-button>
      </div>
      <el-form ref="ruleForm" :model="tableData" label-width="80px" class="demo-ruleForm">
        <el-form-item label="编号">
          <el-input :disabled="true" v-model="tableData.id"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input :disabled="isEdit" v-model="tableData.name"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group :disabled="true" v-model="tableData.sex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="电话号码" prop="phone">
          <el-input :disabled="isEdit" v-model="tableData.phone"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input :disabled="isEdit" v-model="tableData.age"></el-input>
        </el-form-item>
        <el-form-item label="所在部门" prop="department">
          <el-input :disabled="isEdit" v-model="tableData.department"></el-input>
        </el-form-item>
        <el-form-item label="担任职位" prop="woking">
          <el-input :disabled="isEdit" v-model="tableData.woking"></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱" prop="email">
          <el-input :disabled="isEdit" v-model="tableData.email"></el-input>
        </el-form-item>
        <el-form-item label="家庭地址" prop="adress">
          <el-input :disabled="isEdit" v-model="tableData.adress"></el-input>
        </el-form-item>
        <el-button type="primary" @click="resetForm('ruleForm')">重置</el-button>  
      </el-form>
    </div>
  </div>
</template>

<script>
import Head from 'components/content/Head'
import { DetUser } from 'network/detail'
import { putUser } from 'network/put'

export default {
    data(){
      return{
        isShow: true,
        isEdit: true,
        tableId: this.$route.params.id,
        tableData: {},
      }
    },
    components: {
      Head
    },
    methods: {
      back(){
        this.$router.replace("/users")
      },
      editClick(){
        this.isEdit = false,
        this.isShow = false
      },
      updateClick(){
        if(!this.tableData.name || !this.tableData.department || !this.tableData.woking || !this.tableData.phone){
          alert("请输入必要的信息")
          console.log(this.tableData.name, this.tableData.department, this.tableData.woking, this.tableData.phone)
        }else{
          let newTableData = {
            id: this.tableData.id,
            name: this.tableData.name,
            sex: this.tableData.sex,
            department: this.tableData.department,
            woking: this.tableData.woking,
            age: this.tableData.age,
            phone: this.tableData.phone,
            adress: this.tableData.adress,
            email: this.tableData.email
          }
          putUser(newTableData, this.tableData.id)
          .then(res => {
            console.log(res)
            this.$router.push('/users')
            this.$message({
                type: 'success',
                message: '修改成功'
            })
          })
          this.isEdit = true
          this.isShow = true
        }
      },
      resetForm(formName) {
        if (this.isEdit == true) {
          alert("请先编辑")
        }else{
          this.$refs[formName].resetFields();
        }
      }
    },
    created(){
      const tableId = this.tableId
      DetUser(tableId).then(res => {
          console.log(res)
          this.tableData = res.data
        })
    }
}
</script>

<style scoped>
    .Detail{
      /* background-image: url('~assets/img/11e15da2f570b6c3682f0f408d875290.jpg'); */
      
		}
    .from{
      width: 40%;
      margin: 0 auto;
      background: #fff;
      border: solid 1px #eee;
      box-shadow: 15px;
      padding: 0 20px 10px 20px;
    }
    .demo-ruleForm{
      margin-top: 10px;
    }
    .btn{
      height: 30px;
      line-height: 30px;
      margin-bottom: 7px;
    }
</style>