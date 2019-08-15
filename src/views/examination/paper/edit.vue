<template>
  <el-main class="page-paperEdit">
    编辑试卷
  </el-main>
</template>

<script>
export default {
  name: 'Edit',
  mounted: function () {
    this.$store.commit('$_setBreadCrumb', { isShow: true,
      list: [
        { name: '首页', path: '/' }, { name: '试卷管理', path: '/paper' }, { name: '编辑试卷', path: '/paper/edit' }
      ] })
  }
}
</script>

<style lang="scss">
  .page-paperEdit{
    padding: 0;
  }
</style>
