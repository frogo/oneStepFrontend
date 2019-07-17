<template lang="html">
  <div class="page-register">
    <el-container>
      <el-header height="48px">
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
        <div class="register-box">
          <div class="qr-code">
            <img src="@/assets/img/qrCode.png">
            <p>扫码获取邀请码</p>
          </div>
          <h2>注册</h2>
          <el-form ref="registerForm" :model="registerForm" :rules="rules" label-width="100px">
            <div class="title">
              <span>企业信息</span>
            </div>
            <el-form-item label="企业名称" prop="companyName">
              <el-input v-model="registerForm.companyName" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="管理员姓名" prop="adminName">
              <el-input v-model="registerForm.adminName" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="邀请码" prop="invitationCode">
              <el-input v-model="registerForm.invitationCode" placeholder="请输入" />
              <p class="sub-text">
                用手机扫描右侧二维码获取邀请码
              </p>
            </el-form-item>
            <el-form-item label="联系电话" prop="phoneNumber">
              <el-input v-model="registerForm.phoneNumber" placeholder="请输入手机号" />
              <p class="sub-text">
                仅支持11位大陆手机号码,且以13，14，15，17，18，19开头
              </p>
            </el-form-item>
            <el-form-item label="手机验证码" prop="phoneVerificationCode">
              <el-input v-model="registerForm.phoneVerificationCode" placeholder="请输入验证码" />
              <el-button @click="handleVerificationCode(registerForm.phoneNumber)" type="primary" style="margin-left: 10px">
                发送验证码
              </el-button>
            </el-form-item>
            <div class="title">
              <span>账号信息</span>
            </div>
            <el-form-item label="登陆用户名" prop="userName">
              <el-input v-model="registerForm.userName" placeholder="请输入" />
              <p class="sub-text">
                仅支持英文字母和数字
              </p>
            </el-form-item>
            <el-form-item label="电子邮箱" prop="email">
              <el-input v-model="registerForm.email" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="设置密码" prop="password">
              <el-input v-model="registerForm.password" type="password" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="确认密码" prop="confirmPassword">
              <el-input v-model="registerForm.confirmPassword" type="password" placeholder="请输入" />
            </el-form-item>
            <el-form-item style="margin: 50px 0; text-align: center">
              <el-button @click="onSubmit('registerForm')" type="primary" style="width: 400px">
                注册
              </el-button>
            </el-form-item>
          </el-form>
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
import { register } from '@/request/api'
export default {
  data () {
    const validCodeName = (rule, value, callback) => {
      let reg = /[0-9a-zA-Z]{4,9}/
      if (!reg.test(value)) {
        callback(new Error('账号必须是由4-9位数字和字母组合'))
      } else {
        callback()
      }
    }
    const checkPhoneNumber = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'))
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
        if (reg.test(value)) {
          callback()
        } else {
          return callback(new Error('请输入正确的手机号'))
        }
      }
    }
    const checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'))
      } else {
        const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
        if (reg.test(value)) {
          callback()
        } else {
          return callback(new Error('请输入正确的邮箱'))
        }
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.registerForm.confirmPassword !== '') {
          this.$refs.registerForm.validateField('confirmPassword')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      registerForm: {
        companyName: '',
        adminName: '',
        invitationCode: '',
        phoneNumber: '',
        phoneVerificationCode: '',
        userName: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      rules: {
        companyName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 8, message: '长度在 3 到 6  个字符', trigger: 'blur' }
        ],
        adminName: [
          { required: true, message: '请输入管理员姓名', trigger: 'blur' },
          { min: 2, max: 8, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ],
        invitationCode: [
          { required: true, message: '请输入邀请码', trigger: 'blur' }
        ],
        phoneNumber: [
          { required: true, validator: checkPhoneNumber, trigger: 'blur' }
        ],
        phoneVerificationCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ],
        userName: [
          { required: true, validator: validCodeName, trigger: 'blur' }
        ],
        email: [
          { required: true, validator: checkEmail, trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        password: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    registerParam: function () {
      return {
        company_name: this.registerForm.companyName,
        admin_name: this.registerForm.adminName,
        Inviation_code: this.registerForm.invitationCode,
        phone: this.registerForm.phoneNumber,
        verification_code: this.registerForm.phoneVerificationCode,
        account: this.registerForm.userName,
        email: this.registerForm.email,
        pwd: this.registerForm.password,
        repwd: this.registerForm.confirmPassword
      }
    }
  },
  // 监听,当路由发生变化的时候执行
  watch: {

  },
  mounted: function () {

  },
  methods: {
    handleVerificationCode (phoneNumber) {
      if (!phoneNumber) {
        this.$message.error('手机号不能为空！')
      } else {
        alert(phoneNumber)
      }
    },
    onSubmit (registerForm) {
      this.$refs[registerForm].validate((valid) => {
        if (valid) {
          register(this.registerParam).then(res => {
            if (res.code === '1') {
              this.$alert('注册成功', '提示', {
                confirmButtonText: '知道了',
                type: 'success',
                callback: action => {
                  this.$router.push({ path: '/login' })
                }
              })
            }
          }, error => {
            error && this.$message.error(error)
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>
