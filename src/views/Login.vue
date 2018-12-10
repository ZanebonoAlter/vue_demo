<template>
  <div class="login-bg">
    <div class="login-box">
      <div class="title-wrap">
        <div class="title-box">
          <img class="logo" src="../assets/login/logo-logo.svg" alt="">
          <span class="title">“虫洞” 涉网毒品案件靶向分析模型</span>
        </div>
      </div>
      <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px"
             class="demo-ruleForm login-container">
      <el-form-item class="form-input-box" prop="account">
        <img src="../assets/login/icon-account.svg" alt="">
        <el-input class="input" type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item class="form-input-box" prop="checkPass">
        <img src="../assets/login/icon-pw.svg" alt="">
        <el-input class="input" type="password" v-model="ruleForm2.checkPass" auto-complete="off"
                  placeholder="密码"></el-input>
      </el-form-item>
      <!--<el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>-->
      <el-form-item class="form-footer" style="width:100%;">
        <el-button type="primary" class="btn btn-login" @click.native.prevent="handleSubmit2" :loading="logining">登录
        </el-button>
        <!--<el-button type="success" class="btn">数字证书登录-->
        <!--</el-button>-->
      </el-form-item>
    </el-form>
    </div>
  </div>
</template>

<script>
  import * as getData from '../api/api';

  export default {
    data () {
      return {
        logining: false,
        ruleForm2: {
          account: '',
          checkPass: ''
        },
        rules2: {
          account: [
            {required: true, message: '请输入账号', trigger: 'blur'},
            //{ validator: validaePass }
          ],
          checkPass: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            //{ validator: validaePass2 }
          ]
        },
        checked: true
      };
    },
      mounted(){
          // let sign = this.$route.query.sign;
          // // console.log(temp);
          // if(sign==0)
          //     this.$router.push({path: '/keyPerson'});
          getData.Auto_Login().then(res=>{
                if(res.data.sign==1){

                }else if(res.data.sign==0){
                    this.$router.push({path: '/keyPerson'});
                }
              })
      },
    methods: {
      handleSubmit2 (ev) {
        this.$refs.ruleForm2.validate((valid) => {
          if (valid) {
            var aAccount = this.ruleForm2.account;
            var aPassword = this.ruleForm2.checkPass;
//              getData.login(aAccount,aPassword).then(res=>{
//                  if(res.data.message=="登录成功"){
//                      this.$message.success(res.data.message);
//                      sessionStorage.setItem('admin',res.data.adminAccount)
//                      sessionStorage.setItem('permission',JSON.stringify(res.data.permission))
//                      this.$router.push({ path: '/table' });
//                  }else{
//                      this.$message.error(res.data.message);
//                  }
//              })
              getData.Login(aAccount,aPassword).then(res=>{
                  if(res.data.code==1)
                      this.$router.push({path: '/keyPerson'});
                  else
                      this.$message.error('登录失败');
              })
//            this.$router.push({ path: '/table' });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }

</script>
<style lang="scss">
  .input {
    .el-input__inner {
      padding-left: 40px !important;
    }
  }
</style>
<style lang="scss" scoped>
  .login-bg {
    background: url("../assets/login/bg-login.png") center center no-repeat;
    background-size: 100%;
    height: 100%;
    width: 100%;
    .login-box {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateY(-50%) translateX(-50%);
    }
    .title-wrap {
      padding-bottom: 60px;
      width: 600px;
      margin: 0 auto;
      .title-box {
        text-align: center;
        position: relative;
      }
      .logo {
        vertical-align: -22px;
      }
      .title {
        padding-left: 16px;
        color: #ffffff;
        font-size: 30px;
        line-height: 38px;
      }
    }
  }

  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    background-clip: padding-box;
    /*margin: 180px auto;*/
    box-sizing: border-box;
    width: 510px;
    padding: 48px 40px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.50);
    border-radius: 4px;
    margin: 0 auto;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 24px 0px;
    }
    .btn {
      background-color: #2FC25B;
      margin: 0;
      display: block;
      width: 100%;
      & + .btn {
        margin-bottom: 25px;
      }
    }
    .btn-login {
      background-color: #1890FF;
    }
    .form-footer {
      margin: 0;
    }
    .form-input-box {
      .el-form-item__content {
        position: relative;
        > img {
          z-index: 9;
          position: absolute;
          top: 12px;
          left: 12px;
        }
      }
    }
  }
</style>
