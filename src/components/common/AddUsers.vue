<template>
  <div class="AddUsers">
    <el-button type="primary" @click="centerDialogVisible = true">添加用户</el-button>
    <!--------------------------------------- 点击按钮弹框 --------------------------------------->
    <el-dialog
      title="添加用户"
      :visible.sync="centerDialogVisible"
      width="39%"
      center>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="编号" prop="id">
          <el-input v-model="ruleForm.id"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio v-model="ruleForm.sex" label="男">男</el-radio>
          <el-radio v-model="ruleForm.sex" label="女">女</el-radio>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model.number="ruleForm.age"></el-input>
        </el-form-item>
        <!-- <el-form-item label="所在部门" prop="department">
          <el-input v-model="ruleForm.department"></el-input>
        </el-form-item> -->
        <el-form-item label="所在部门">
          <el-select v-model="ruleForm.department" placeholder="请选择部门">
            <el-option label="人事行政部" value="人事行政部"></el-option>
            <el-option label="产品开发部" value="产品开发部"></el-option>
            <el-option label="品牌推广部" value="品牌推广部"></el-option>
            <el-option label="财务部" value="财务部"></el-option>
            <el-option label="运营部" value="运营部"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="担任职位" prop="woking">
          <el-input v-model="ruleForm.woking"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model.number="ruleForm.phone" oninput="if(value.length>11) value=value.slice(0,11)"></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱" prop="email">
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="家庭住址">
        <el-input v-model="ruleForm.adress"></el-input>
          <!-- <el-cascader
            placeholder="试试搜索：我"
            :options="ruleForm.adress"
            filterable>
          </el-cascader> -->
        </el-form-item>
        <div style="text-align:center">
          <el-button type="primary" @click="submitForm('ruleForm');centerDialogVisible = false">添加</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { postUser } from "network/post"

export default {
    data() {
      return {
        centerDialogVisible: false,     // 默认弹框，false，true则进入页面自动弹框
        // 获取需要限制的prop
        ruleForm: {
          id: '',
          name: '',
          sex: '',
          age: '',
          department: '',
          woking: '',
          phone: '',
          email: '',
          adress: ''
        },
        // 限制输入的东西是否符合规则
        rules: {
          id: [
            { required: true, message: '请输入ID' }
          ],
          name: [
            { required: true, message: '请输入名字', trigger: 'change' },
            { min: 2, max: 4, message: '长度在 2 到 4 个字符', trigger: 'blur' }
          ],
          sex: [
            { required: true, message: '请选择性别', trigger: 'change' }
          ],
          age: [
            { required: true, message: '请输入年龄', trigger: 'blur' },
            { type: 'integer', message: '年龄必须为数字值'}
          ],
          department: [
            { required: true, message: '请选择部门', trigger: 'change' }
          ],
          woking: [
            { required: true, message: '请输入担任职位', trigger: 'change' }
          ],
          phone: [
            { required: true, message: '请输入电话号码', trigger: 'change' },            
            { type:"integer", min: 8, message: '请输入至少8位数', trigger: 'change'}
          ],
          email: [
            { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
          ]
          
        }
      }
    },
    props: {
      //父组件传递过来的数据：tableData
      tableAddData: {
        type: Array,
        default(){
          return []
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {            
            let newUser = {
              id: this.ruleForm.id,
              name: this.ruleForm.name,
              sex: this.ruleForm.sex,
              age: this.ruleForm.age,
              woking: this.ruleForm.woking,
              phone: this.ruleForm.phone,
              email: this.ruleForm.email,
              department: this.ruleForm.department,
              adress: this.ruleForm.adress
            }
            /**
             * 给post.js发送网络请求，提供一个对象
             */
            postUser(newUser)
            .then(res => {
              //显示添加成功
              this.$message({
                type: 'success',
                message: '添加成功'
            })
            this.tableAddData.push(newUser)
            
            this.tableAddData.sort((a, b) => {
              return a.id - b.id
            })
            console.log(newUser)
            this.$refs[formName].resetFields()
            })
            
            
            // setTimeout(() => {                      
            //   location.reload()
            // },1500)
          } else {
            this.$message({
                type: 'error',
                message: '请正确输入后重试'
            })
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      }
    }
}
</script>

<style scoped>
    .AddUsers{
      float: left;
      width: 90px;
    }
</style>