<template>
<div class='container'>
    <el-card class="my-card">
        <img src="../../assets/image/logo_index.png">
    <el-form ref="loginForm" :model='loginForm' :rules="loginRules" status-icon>
        <el-form-item prop="mobile">
            <el-input  v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
            <el-input  v-model="loginForm.code" placeholder="请输入验证码" style="width:236px;margin-right:10px;"></el-input>
            <el-button>发送验证码</el-button>
        </el-form-item>
        <el-form-item>
            <el-checkbox :value='true'>我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" style="width:100%" @click="login()">登 录</el-button>
        </el-form-item>
    </el-form>
    </el-card>
</div>
</template>

<script>
import store from '@/store'
export default {
  data: function () {
    const checkMobile = (rule, value, callback) => {
      if (!/^1[3-9]\d{9}$/.test(value)) { return callback(new Error('手机号格式不对')) }
      callback()
    }
    return {

      loginForm: {
        mobile: '13911111111',
        code: '246810'
      },
      loginRules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '长度是6位', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          // this.$http.post('http://ttapi.research.itcast.cn/mp/v1_0/authorizations', this.loginForm).then(res => {
          //   store.setUser(res.data.data)
          //   this.$router.push('/')
          // }).catch(() => {
          //   this.$message.error('手机号或验证码错误')
          // })
          try {
            const { data: { data } } = await this.$http.post('authorizations', this.loginForm)
            store.setUser(data)
            this.$router.push('/')
          } catch (error) {
            this.$message.error('手机号或验证码错误')
          }
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
    .container{
        position: absolute;
        width: 100%;
        height: 100%;
        background: url(../../assets/image/login_bg.jpg) no-repeat center / cover
    }
    .my-card{
        width: 400px;
        height: 350px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
    img{
        display: block;
        width: 200px;
        margin: 0 auto;
    }
    }
//     .el-card__body{
//   background: red;
// }

</style>
