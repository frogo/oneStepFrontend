<template lang="html">
  <div class="page-forgotPassword">
    <el-container>
      <el-header height="48px">
        <div class="topBar">
          <el-row :gutter="20">
            <el-col :span="4">
              <div class="logo-box">
                <a href="/"><img src="@/assets/img/logo.png"></a>
              </div>
            </el-col>
            <el-col :span="20">
              <span class="login-btn"><router-link to="/login" class="login">登录</router-link></span>
            </el-col>
          </el-row>
        </div>
      </el-header>
      <el-main>
        <div class="forgotPassword">
          <h2>找回密码</h2>
          <el-steps :active="step" align-center finish-status="success">
            <el-step title="填写账户信息" />
            <el-step title="安全验证" />
            <el-step title="重置密码" />
          </el-steps>

          <div class="content">
            <el-input v-if="step === 0" v-model="input" placeholder="请输入用户名或注册邮箱" />
            <div v-if="step === 1">
              <p v-if="!checkPass">
                通过
                <span v-if="type === 'email' && input">注册邮箱{{ input }}</span>
                <span v-else>用户名{{ input }}</span>
                找回
              </p>
              <p v-else>
                我们已向你注册邮箱xxxxx***@qq.com发送了一封密码找回邮件，<br>请注意查收邮件并按照邮件中的提示操作，完成密码重置！
              </p>
            </div>
          </div>
          <div class="operate-button">
            <el-button v-if="step === 0" @click="next" type="primary">
              下一步
            </el-button>
            <el-button v-if="step === 1 && !checkPass" @click="check" type="primary">
              立即验证
            </el-button>
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
import { forgotPassword } from '@/request/api'
export default {
  data () {
    return {
      step: 0,
      type: 'account',
      input: '',
      checkPass: false,
      checkFailedMsg: ''
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
    next () {
      if (!this.input) {
        this.$message.error('请输入用户名或注册邮箱')
        return
      }
      if (this.input.indexOf('@') > 0) {
        this.type = 'email'
      }
      if (this.step++ > 2) { this.step = 0 }
    },
    check () {
      forgotPassword(this.input).then(res => {
        if (res.code === '1') {
          this.checkPass = true
        } else if (res.code === '0') {
          this.$alert(res.message, '提示', {
            confirmButtonText: '知道了',
            type: 'error',
            callback: action => {
              this.step = 0
            }
          })
          this.checkFailedMsg = res.message
        }
      }, error => {
        error && this.$message.error(error)
      })
    }
  }
}
</script>
