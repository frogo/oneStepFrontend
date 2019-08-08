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
