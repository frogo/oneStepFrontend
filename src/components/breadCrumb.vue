<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item v-for="(item, index) in levelList" :key="index + item.path" :to="{path: item.path}">
      {{ item.name }}
    </el-breadcrumb-item>
  </el-breadcrumb>
<!--  <el-breadcrumb class="app-breadcrumb" separator="/">-->
<!--    <transition-group>-->
<!--      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path" >-->
<!--        <router-link :to="item.redirect||item.path">-->
<!--          {{ item.name }}-->
<!--        </router-link>-->
<!--      </el-breadcrumb-item>-->
<!--    </transition-group>-->
<!--  </el-breadcrumb>-->
</template>
<script>
export default {
  name: 'Breadcrumb',
  data () {
    return {
      levelList: null
    }
  },
  watch: {
    $route () {
      this.getBreadcrumb()
    }
  },
  created () {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb () {
      let matched = this.$route.matched.filter(item => item.name)// $route.matched 将会是一个包含从上到下的所有对象 (副本)。
      // eslint-disable-next-line no-console
      console.log(this.$route.matched)

      const first = matched[0]
      if (first && first.name !== '首页') { // $route.name当前路由名称  ；$route.redirectedFrom重定向来源的路由的名字
        matched = [{ path: '/', name: '' }].concat(matched)
      }
      this.levelList = matched
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 10px;
    .no-redirect {
      color: #97a8be;
      cursor: text;
    }
  }
</style>
