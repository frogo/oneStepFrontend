<template>
  <el-container class="main-content page-trainStatisticsDetails">
    <AsideMenu />
    <el-main>
      <div class="inner">
        <h2>培训统计详情</h2>
        <div class="filter-box">
          <span>
            <el-date-picker
              v-model="date"
              type="daterange"
              range-separator="~"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
            />

            <el-button @click="handleSearch" type="primary"> 搜索</el-button>
          </span>
          <span><el-button @click="handleExport" type="primary">导出报表</el-button></span>
        </div>
        <div class="exTable">
          <ex-table ref="exTable" :data="tableData" :reload-method="handleReload" show-pagination stripe>
            <el-table-column
              prop="camp_name"
              label="项目名称"
            />
            <el-table-column
              prop="start_time"
              label="开始时间"
              width="120"
              align="center"
            />
            <el-table-column
              prop="end_time"
              label="结束时间"
              width="120"
              align="center"
            />
            <el-table-column
              prop="lesson_count"
              label="课程数"
              width="90"
              align="center"
            />
            <el-table-column
              prop="lesson_minute"
              label="课时(分钟)"
              width="90"
              align="center"
            />
            <el-table-column
              prop="join_num"
              label="参训人数"
              width="90"
              align="center"
            />
            <el-table-column
              prop="complete_num"
              label="完成数"
              width="90"
              align="center"
            />
            <el-table-column
              prop="completion_percent"
              label="完成率(%)"
              width="90"
              align="center"
            />
          </ex-table>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import ExTable from '@/components/exTable.js'
import AsideMenu from '@/components/asideMenu'
import { getCampStatisInfo, exporCampStatisInfo } from '@/request/api'
import { GetUrlParam } from '@/utility'
export default {
  components: {
    AsideMenu,
    ExTable
  },
  data () {
    return {
      tableData: [],
      date: []
    }
  },
  watch: {
  },
  created () {
  },
  mounted: function () {
    this.date = ['', '']
    // let startTime = GetUrlParam('start_time')
    // let endTime = GetUrlParam('end_time')
    // if (startTime && endTime) {
    //   console.log(startTime, endTime)
    // }
    GetUrlParam('start_time') && (this.date[0] = GetUrlParam('start_time'))
    GetUrlParam('end_time') && (this.date[1] = GetUrlParam('end_time'))
    this.fetchRemoteData()
  },
  methods: {
    handleReload (pagination, { currentPage, pageSize }) {
      this.fetchRemoteData(pagination, currentPage, pageSize)
    },
    fetchRemoteData (pagination, currentPage, pageSize) {
      let param = {
        start_time: this.date[0],
        end_time: this.date[1],
        offset: currentPage || 1,
        limit: pageSize || 10
      }
      let paginationObj = pagination || this.$refs.exTable.pagination
      getCampStatisInfo(param).then(res => {
        this.tableData = res.data.list
        paginationObj.total = res.data.total
      })
    },
    handleSearch () {
      this.fetchRemoteData()
    },
    handleExport () {
      exporCampStatisInfo({ start_time: GetUrlParam('start_time'), end_time: GetUrlParam('end_time') }).then(res => {
        window.location.href = res.data.url
      })
    }
  }
}
</script>

<style lang="scss">
  .page-trainStatisticsDetails{
    .filter-box{
      display: flex;
      justify-content: space-between;
      margin: 20px 0;
      padding: 15px 5px;
      span{i{color:#999;font-size: 12px;vertical-align: middle;font-style: normal}}
    }
    .inner{
      margin: 5px;
      box-shadow: 0px 2px 5px #888888;
      padding: 15px;
      height:calc(100% - 10px)
    }
    padding: 0;
    .exTable{
      .el-pagination{margin-top: 20px;text-align: right}
    }
  }
</style>
