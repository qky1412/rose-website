<template>
    <div id="page-login">

      <el-form ref="loginForm" :label-position="labelPosition" label-width="80px" :model="formLogin" :rules="formRule" class="card-box">
        <h3>ROSE</h3>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="formLogin.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="formLogin.password" type="password"></el-input>
        </el-form-item>
        <el-button @click="login('loginForm')" type="primary">登录</el-button>
      </el-form>
    </div>
</template>
<style lang="less" rel="stylesheet/less">
  #page-login {
    text-align: center;
    .card-box {
      padding: 20px;
      -webkit-border-radius: 5px;
      border-radius: 5px;
      -moz-border-radius: 5px;
      background-clip: padding-box;
      background-color: #F9FAFC;
      margin: 120px auto;
      width: 400px;
      border: 2px solid #8492A6;
    }
  }
</style>
<script>
    import UserApi from '../api/User'
    export default {
        name: 'Login',
        data () {
            return {
              labelPosition: 'right',
              formLogin: {
                username: '',
                password: ''
              },
              formRule: {
                username: [{required: true, message: '用户名不能为空', trigger: 'blur'}],
                password: [{required: true, message: '密码不能为空', trigger: 'blur'}]
              }
            }
        },
        methods: {
          login (formName) {
            this.$refs[formName].validate((valid) => {
              if (valid) {
                if (this.formLogin.username === 'admin') {
                  if (this.formLogin.password === 'admin123') {
                    UserApi.setUser(this.formLogin)
                    this.$message({message: '登录成功', type: 'success'})
                    this.$router.replace({name: 'Home'})
                  } else {
                    this.$message({message: '用户名或密码错误', type: 'error'})
                  }
                } else if (this.formLogin.username === 'user') {
                    if (this.formLogin.password === 'user123456') {
                      UserApi.setUser(this.formLogin)
                      this.$message({message: '登录成功', type: 'success'})
                      this.$router.replace({name: 'Home'})
                    } else {
                      this.$message({message: '用户名或密码错误', type: 'error'})
                    }
                } else {
                    this.$message({message: '用户名或密码错误', type: 'error'})
                }
              } else {
                return false
              }
            })
          }
        }
    }
</script>
