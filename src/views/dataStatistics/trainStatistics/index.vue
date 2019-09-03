<template>
  <el-container class="main-content page-trainStatistics">
    <AsideMenu />
    <el-main>
      <h2>培训统计</h2>
      <div class="filter-box">
        <span>
          <el-date-picker
            v-model="date"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
          />

          <el-button type="primary"> 搜索</el-button>
        </span>
        <span>
          <el-button type="primary"> 项目详情</el-button>
        </span>
      </div>
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
      date: []
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
    .filter-box{ margin: 20px 0;padding: 15px 0;justify-content: space-between;display: flex}
  }
</style>
