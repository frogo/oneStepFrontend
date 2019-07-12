<template lang="html">
  <div class="page-login">
    <el-container>
      <el-header height="85px">
        <div class="topBar">
          <el-row :gutter="20">
            <el-col :span="4">
              <div class="logo-box">
                <a href="/"><img src="@/assets/img/logo.png"></a>
              </div>
            </el-col>
            <el-col :span="20" />
          </el-row>
        </div>
      </el-header>
      <el-main>
        <div class="login-wrap">
          <div class="login-banner">
            <div class="text">
              <p class="cn">
                学无新旧，唯其致用
              </p>
              <p class="en">
                Give me a place stand and I will move the world
              </p>
            </div>
            <div class="login-box">
              <h2>账号登陆</h2>
              <el-form ref="ruleForm" :model="logonForm" :rules="rules" label-width="">
                <el-form-item label="" prop="username">
                  <el-input v-model="logonForm.username" placeholder="账号">
                    <i slot="prefix" class="username_icon" />
                  </el-input>
                </el-form-item>
                <el-form-item label="" prop="password" class="small_spacing">
                  <el-input v-model="logonForm.password" placeholder="密码">
                    <i slot="prefix" class="password_icon" />
                  </el-input>
                </el-form-item>
                <el-form-item prop="remember" class="small_spacing">
                  <el-checkbox v-model="logonForm.remember" label="记住用户" name="type" class="remember_user" />
                  <span class="forgot_password"><a href="#">忘记密码？</a> </span>
                </el-form-item>
                <el-form-item class="small_spacing">
                  <el-button @click="login" type="primary" size="large" style="width:100%">
                    提交
                  </el-button>
                </el-form-item>
                <el-form-item class="register small_spacing">
                  <span>还没有账号，<router-link to="/register">立即注册</router-link></span>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
      </el-main>
      <el-footer height="100px">
        <p>
          联系地址：武汉市洪山区邮科院路特1号 信息科技产业大厦506室 联系电话：027-87860866 网站备案：鄂ICP备15007189号-2
          <br>
          Copyright @ 2016 yibuwuyou.com All Right Reserved
        </p>
      </el-footer>
    </el-container>
  </div>
</template>
<script>
import { login } from '@/request/api'
export default {
  data () {
    return {
      logonForm: {
        username: '',
        password: '',
        remember: true
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {

  },
  // 监听,当路由发生变化的时候执行
  watch: {

  },
  mounted: function () {

  },
  methods: {
    login () {
      login().then(res => {
        if (res.code === '1') {
          const redirect = this.$route.query.redirect
          if (redirect) {
            // 存在回跳地址就回跳
            this.$router.push(redirect)
          } else {
            // 否则就跳到默认的首页
            this.$router.push({
              name: '/'
            })
          }
        }
      })
    }
  }
}
</script>
