<template lang="html">
  <el-container class="main-content page-projectDetails">
    <AsideMenu />
    <el-main>
      <el-row :gutter="20">
        <el-col :span="18">
          <div class="main">
            <h2>营销基础训练营</h2>
            <div class="pieces">
              参与总数:  <span class="red">123</span>  完成总数:   <span class="red">98</span>
              开始时间：2019-05-21 结束时间：2019-05-21
            </div>
            <div class="lineChart" />
            <div class="operate-btn">
              <el-button @click="studentStatusDialogVisible = true" size="small" type="success">
                学员报表
              </el-button>
              <el-button @click="detailsDialogVisible = true" size="small" type="primary">
                详情报表
              </el-button>
            </div>
            <div class="table-list" />
            <div class="pager" />
          </div>
        </el-col>
        <el-col :span="6">
          <div class="sideBar">
            sdffffffffffff
          </div>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>
<script>

// import { getProjectList } from '@/request/api'
import AsideMenu from '@/components/asideMenu'
export default {
  components: {
    AsideMenu
  },
  data () {
    return {
      studentStatusDialogVisible: false,
      detailsDialogVisible: false
    }
  },
  computed: {

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
  .page-projectDetails{
    .el-main{
      .main{
        h2{ font-size: 22px}
        .pieces{font-size: 12px; padding: 15px 0;color:#666666;span{ font-size: 14px}}
      }
      .sideBar{ border-left:1px solid #8c939d;height:100%;padding: 10px}
    }

  }

</style>
