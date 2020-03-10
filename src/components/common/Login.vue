<template>
    <div class="login-box">
        <!-- 通过:rules="loginFormRules"来绑定输入内容的校验规则 -->
        <el-form :rules="loginFormRules" ref="loginForm" :model="loginForm" label-position="right" label-width="auto" show-message>
            <span class="login-title">系统登录</span>
            <div style="margin-top: 35px"></div>
            <el-form-item label="用户名" prop="loginName">
                <el-col :span="22">
                    <el-input type="text" v-model="loginForm.loginName"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="密码" prop="loginPassword">
                <el-col :span="22">
                    <el-input type="password" v-model="loginForm.loginPassword"></el-input>
                </el-col>
            </el-form-item>
            <div style="margin-top: 35px;margin-bottom: 10px">
              <el-button style="width:90%" type="primary" @click="loginSubmit('loginForm')">登录</el-button>
              <!-- <el-button type="primary" @click="resetForm('loginForm')">取消</el-button> -->
            </div>
        </el-form>
    </div>
</template>
<script>
    export default {
        name: "login",
        data() {
            return {
                loginForm: {
                    loginName: '',
                    loginPassword: ''
                },
                // 表单验证，需要在 el-form-item 元素中增加 prop 属性
                loginFormRules: {
                    loginName: [
                        {required: true, message: '账号不可为空', trigger: 'blur'}
                    ],
                    loginPassword: [
                        {required: true, message: '密码不可为空', trigger: 'blur'}
                    ]
                },
                responseResult: []
            }
        },
        methods: {
          // login () {
          //   this.$axios
          //     .post('/login', {
          //       username: this.loginForm.loginName,
          //       password: this.loginForm.loginPassword
          //     })
          //     .then(successResponse => {
          //       if (successResponse.data.code === 200) {
          //         this.$router.replace({path: '/index'})
          //       }
          //     })
          //     .catch(failResponse => {
          //     })
          // },
            loginSubmit(formName) {
                // 为表单绑定验证功能
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // 使用 vue-router 路由到指定页面，该方式称之为编程式导航
                        console.log("Success")
                        this.$router.replace("/index");
                        // alert(JSON.stringify(this.user))可以直接把this.user对象传给后端进行校验用户名和密码
                    } else {
                        return false;
                    }
                });
            },
            resetForm(formName) {
              this.$refs[formName].resetFields();
            }
        }
    }
</script>
<style scoped>
    .login-box {
        border: 1px solid #DCDFE6;
        width: 400px;
        margin: 180px auto;
        padding: 35px 25px 20px 35px;
        border-radius: 5px;
        -webkit-border-radius: 15px;
        -moz-border-radius: 5px;
        box-shadow: 0 0 25px rgb(152, 198, 251);
        text-align: center;
    }
    .login-title {
        margin: 0 auto 40px auto;
        color: rgb(0, 157, 205);
        font-size: 30px;
        font-weight: bold;
    }
    
</style>