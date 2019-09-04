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
            <div v-else-if="step === 1">
              <p v-if="!checkPass">
                通过
                <span v-if="type === 'email' && input">注册邮箱{{ input }}</span>
                <span v-else>用户名{{ input }}</span>
                找回
              </p>
              <p v-else>
                我们已向你注册邮箱{{ userEmail }}发送了一封密码找回邮件，<br>请注意查收邮件并按照邮件中的提示操作，完成密码重置！
              </p>
            </div>
            <div v-else-if="step === 2">
              <el-form ref="changeForm" :model="changeForm" :rules="rules" label-position="right" status-icon label-width="100px" class="changForm">
                <el-form-item label="用户名" style="text-align: left">
                  <el-tag type="info">
                    {{ account }}
                  </el-tag>
                </el-form-item>
                <el-form-item label="新密码" prop="newPassword">
                  <el-input v-model="changeForm.newPassword" type="password" autocomplete="off" />
                </el-form-item>
                <el-form-item label="确认新密码" prop="checkPassword">
                  <el-input v-model="changeForm.checkPassword" type="password" autocomplete="off" />
                </el-form-item>
                <el-form-item>
                  <el-button @click="submitForm('changeForm')" type="primary">
                    提交
                  </el-button>
                </el-form-item>
              </el-form>
            </div>
            <div v-else>
              <p style="font-size: 26px">
                您的密码已修改成功！
              </p>
              <p>
                请点击 <router-link to="/login" style="font-size: 12px;color: #4771d4">
                  重新登陆
                </router-link>
              </p>
            </div>
          </div>
          <div class="operate-button">
            <el-button v-if="step === 0" @click="next" type="primary">
              下一步
            </el-button>
            <el-button v-else-if="step === 1 && !checkPass" @click="check" type="primary">
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
import { forgotPassword, resetPassword } from '@/request/api'
import { GetUrlParam } from '@/utility'
export default {
  data () {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.changeForm.checkPassword !== '') {
          this.$refs.changeForm.validateField('checkPassword')
        }
        callback()
      }
    }
    const validateCheckPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.changeForm.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      userEmail: '', // 用户名的邮箱
      token: '',
      account: '',
      step: 0,
      type: 'account',
      input: '',
      checkPass: false,
      checkFailedMsg: '',
      changeForm: {
        newPassword: '',
        checkPassword: ''
      },
      rules: {
        newPassword: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        checkPassword: [
          { required: true, validator: validateCheckPass, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    resetPasswordParam: function () {
      return {
        token: this.token,
        newpwd: this.changeForm.newPassword,
        repwd: this.changeForm.checkPassword
      }
    }
  },
  // 监听,当路由发生变化的时候执行
  watch: {

  },
  mounted: function () {
    if (GetUrlParam('token') && GetUrlParam('account')) {
      this.account = GetUrlParam('account')
      this.token = GetUrlParam('token')
      this.step = 2
    }
  },
  methods: {
    // 替换邮箱字符
    regEmail (email) {
      let newEmail
      if (String(email).indexOf('@') > 0) {
        let str = email.split('@')
        let _s = ''
        if (str[0].length > 3) {
          for (let i = 0; i < str[0].length - 3; i++) {
            _s += '*'
          }
        }
        newEmail = str[0].substr(0, 3) + _s + '@' + str[1]
      }
      return newEmail
    },
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
      forgotPassword({ info: this.input }).then(res => {
        if (res.code === '1') {
          this.checkPass = true
          this.userEmail = this.regEmail(res.data)
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
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          resetPassword(this.resetPasswordParam).then(res => {
            this.step = 3
          })
        } else {
          // console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
