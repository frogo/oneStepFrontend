<template lang="html">
  <el-container>
    <el-header height="48px">
      <div class="topBar">
        <el-row :gutter="20" >
          <el-col :span="4"><div class="grid-content bg-purple">logo</div></el-col>
          <el-col :span="16">
            <ul class="nav">
              <li><a href="" class="active">首页</a> </li>
              <li><a href="">企业课程库</a> </li>
              <li><a href="">培训项目管理</a> </li>
            </ul>
          </el-col>
          <el-col :span="4">
            <div class="user">
              <span><i class="el-icon-user-solid"></i></span>
              <span>杨帆</span>
              <el-dropdown>
                <span class="el-dropdown-link">
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>个人中心</el-dropdown-item>
                  <el-dropdown-item>退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <!--<el-popover-->
                <!--trigger="hover"-->
                <!--popper-class="userDropList"-->
              <!--&gt;-->
                <!--<ul>-->
                  <!--<li><a href="" >个人中心</a></li>-->
                  <!--<li><a href=""> 退出账号</a></li>-->
                <!--</ul>-->
                <!--<span class="arrow" slot="reference"><i class="el-icon-arrow-down"></i></span>-->
              <!--</el-popover>-->
            </div>
          </el-col>
        </el-row>
      </div>
    </el-header>
    <el-main>
      <router-view />
    </el-main>
    <el-footer height="100px"><p>Copyright @2016 www.yibuwang.com All Right Reserved</p></el-footer>
  </el-container>
</template>
<script>
// import { mapState, mapMutations } from 'vuex'
// import { getExpressUsers, postStatisticArchive } from '@/request/api'
export default {
  data () {
    return {

    }
  },
  computed: {
    // ...mapState([
    //   'flowTemplateList'
    // ])
  },
  // 监听,当路由发生变化的时候执行
  watch: {

  },
  mounted: function () {

  },
  methods: {

  }
}
</script>

<style scoped>
.el-container{}
</style>
