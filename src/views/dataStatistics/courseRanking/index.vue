<template>
  <el-container class="main-content page-courseRanking">
    <AsideMenu />
    <el-main>
      课程排行
    </el-main>
  </el-container>
</template>

<script>
import AsideMenu from '@/components/asideMenu'
export default {
  components: {
    AsideMenu
  },
  data () {
    return {

    }
  },
  watch: {
  },
  mounted: function () {
    this.$store.commit('$_setBreadCrumb', { isShow: true,
      list: [
        { name: '首页', path: '/' }, { name: '课程排行', path: '/courseRanking' }
      ] })
  },
  methods: {

  }
}
</script>

<style lang="scss">
  .page-courseRanking{
    padding: 0;
  }
</style>
