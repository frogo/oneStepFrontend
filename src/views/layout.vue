<template lang="html">
  <el-container>
    <el-header height="48px">
      <div class="topBar">
        <el-row :gutter="20">
          <el-col :span="4">
            <div class="logo-box">
              <a href="/"><img src="@/assets/img/logo.png"></a>
            </div>
          </el-col>
          <el-col :span="16">
            <ul class="nav">
              <li><a href="" class="active">首页</a> </li>
              <li><a href="">企业课程库</a> </li>
              <li><a href="">培训项目管理</a> </li>
            </ul>
          </el-col>
          <el-col :span="4">
            <div v-if="user" class="user">
              <span><i class="el-icon-user-solid" /></span>
              <span>杨帆</span>
              <el-dropdown>
                <span class="el-dropdown-link">
                  <i class="el-icon-arrow-down el-icon--right" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>个人中心</el-dropdown-item>
                  <el-dropdown-item @click="logout">
                    退出登录
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-header>
    <el-main>
      <router-view />
    </el-main>
    <el-footer height="100px">
      <p>
        联系地址：武汉市洪山区邮科院路特1号 信息科技产业大厦506室 联系电话：027-87860866 网站备案：鄂ICP备15007189号-2
        <br>
        Copyright @ 2016 yibuwuyou.com All Right Reserved
      </p>
    </el-footer>
  </el-container>
</template>
<script>
// import { mapState, mapMutations } from 'vuex'
import { logout } from '@/request/api'
export default {
  data () {
    return {
      loginStatus: 0
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
    logout () {
      logout().then(res => {
        if (res.code && res.code === '1') {
          localStorage.setItem('user', '')
        }
      }, error => {
        error && this.$message.error(error)
      })
    },
    goto (path) {
      this.$router.push({ path: path })
    }
  }
}
</script>
