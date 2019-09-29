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
              <li>
                <router-link to="/">
                  首页
                </router-link>
              </li>
              <li>
                <router-link to="/course">
                  企业课程库
                </router-link>
              </li>
              <li>
                <router-link to="/project">
                  培训项目管理
                </router-link>
              </li>
            </ul>
          </el-col>
          <el-col :span="4">
            <div v-if="user" class="user">
              <span><i class="el-icon-user-solid" /></span>
              <span>{{ user }}</span>
              <el-dropdown>
                <span class="el-dropdown-link">
                  <i class="el-icon-arrow-down el-icon--right" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>
                    <span><router-link to="/user">个人中心</router-link></span>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <span @click="logoutHandler">退出登录</span>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-header>
    <bread-crumb />
    <router-view />
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
import { mapState } from 'vuex'
import { logout } from '@/request/api'
import BreadCrumb from '@/components/breadCrumb'
// import { GetUrlParam } from '@/utility'
export default {
  components: {
    BreadCrumb
  },
  data () {
    return {
      loginStatus: 0,
      router: ''
    }
  },
  computed: {
    ...mapState({
      user: 'user'
    })
  },
  // 监听,当路由发生变化的时候执行
  watch: {
    // $route (newVal) {
    //   if (newVal.meta && newVal.meta.list) {
    //     this.$store.commit('$_setBreadCrumb', { isShow: true, list: newVal.meta.list })
    //   }
    //   console.log(newVal)
    // }
  },
  created: function () {
    if (this.$route.meta && this.$route.meta.breadCrumb && !this.$store.state.breadCrumb.isShow) {
      this.$store.commit('$_setBreadCrumb', { isShow: true, list: this.$route.meta.breadCrumb })
    }
  },
  mounted: function () {
    this.$axios.post('/v1/user/session').then((res) => {
      if (res.data && res.data.code === '1') {
        localStorage.setItem('user', res.data.data.account)
        this.$store.commit('$_setUserStorage', res.data.data.account)
      } else {
        this.$router.push({ path: '/login', query: { redirect: this.$route.path } })
      }
    }, error => {
      if (error.response && error.response.status === 401) {
        this.$router.push({ path: '/login', query: { redirect: this.$route.path } })
      }
    })
  },
  methods: {
    logoutHandler () {
      this.$confirm('您确定要退出吗?', '退出管理平台', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        logout().then(res => {
          this.$store.commit('$_removeUserStorage')
          localStorage.removeItem('user')
          this.$router.push({ path: '/login' })
        })
      })
    }
  }
}
</script>
