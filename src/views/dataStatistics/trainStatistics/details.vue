<template>
  <el-container class="main-content page-trainStatisticsDetails">
    <AsideMenu />
    <el-main>
      培训统计详情
    </el-main>
  </el-container>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  watch: {
  },
  mounted: function () {
    this.$store.commit('$_setBreadCrumb', { isShow: true,
      list: [
        { name: '培训统计', path: '/trainStatistics' }, { name: '培训统计详情', path: '/trainStatistics/details' }
      ] })
  },
  methods: {

  }
}
</script>

<style lang="scss">
  .page-trainStatisticsDetails{
    padding: 0;
  }
</style>
