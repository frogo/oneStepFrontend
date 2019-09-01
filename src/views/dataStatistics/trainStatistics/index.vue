<template>
  <el-container class="main-content page-trainStatistics">
    <AsideMenu />
    <el-main>
      培训统计
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
        { name: '首页', path: '/' }, { name: '培训统计', path: '/trainStatistics' }
      ] })
  },
  methods: {

  }
}
</script>

<style lang="scss">
  .page-trainStatistics{
    padding: 0;
  }
</style>
