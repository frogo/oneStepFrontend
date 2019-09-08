<template>
  <el-container class="main-content page-courseRanking">
    <AsideMenu />
    <el-main>
      课程排行
    </el-main>
  </el-container>
</template>

<script>
import { getCourseRank } from '@/request/api'
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
        { name: '课程排行', path: '/courseRanking' }
      ] })
  },
  methods: {
    getCourseRank () {
      let param = {}
      getCourseRank(param).then(res => {
        // eslint-disable-next-line no-console
        console.log(res)
      })
    }
  }
}
</script>

<style lang="scss">
  .page-courseRanking{
    padding: 0;
  }
</style>
