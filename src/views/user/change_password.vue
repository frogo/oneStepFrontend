<template lang="html">
  <el-container class="main-content page-changePassword">
    <el-aside width="180px">
      <dl>
        <dt>账号信息</dt>
        <dd>
          <i class="el-icon-lock" /> <router-link to="/user" class="menu-link">
            修改密码
          </router-link>
        </dd>
      </dl>
    </el-aside>
    <el-main class="bg">
      <div class="inner">
        <h2>修改密码</h2>
        <el-form ref="changeForm" :model="changeForm" :rules="rules" label-position="left" status-icon label-width="100px" class="changForm">
          <el-form-item label="旧密码" prop="oldPassword">
            <el-input v-model="changeForm.oldPassword" type="password" autocomplete="off" />
          </el-form-item>
          <el-form-item label="新密码" prop="newPassword">
            <el-input v-model="changeForm.newPassword" type="password" autocomplete="off" />
          </el-form-item>
          <el-form-item label="确认新密码" prop="checkPassword">
            <el-input v-model="changeForm.checkPassword" type="password" autocomplete="off" />
          </el-form-item>
          <el-form-item>
            <el-button @click="submitForm('changeForm')" type="primary">
              确认修改
            </el-button>
            <el-button @click="resetForm('changeForm')">
              重置
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-main>
  </el-container>
</template>
<script>
// import { mapState, mapMutations } from 'vuex'
import { changePassword } from '@/request/api'
export default {
  data: function () {
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
      changeForm: {
        oldPassword: '',
        newPassword: '',
        checkPassword: ''
      },
      rules: {
        oldPassword: [
          { required: true, message: '请输入旧密码', trigger: 'blur' }
        ],
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
    changePasswordParams: function () {
      return {
        oldpwd: this.changeForm.oldPassword,
        newpwd: this.changeForm.newPassword,
        repwd: this.changeForm.checkPassword
      }
    }
  },
  watch: {
  },
  mounted: function () {
    // this.$store.commit('$_setBreadCrumb', { isShow: true,
    //   list: [
    //     { name: '修改密码', path: '/change_password' }
    //   ] })
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          changePassword(this.changePasswordParams).then(res => {
            this.$alert('密码修改成功', '提示', {
              confirmButtonText: '知道了',
              type: 'success',
              callback: action => {
                this.$router.push({ path: '/login' })
              }
            })
          })
        } else {
          // console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style lang="scss">
  .page-changePassword{
    .inner{
      margin: 5px;
      box-shadow: 0px 2px 5px #888888;
      padding: 15px;
      height:calc(100% - 100px)
    }
  }
</style>
