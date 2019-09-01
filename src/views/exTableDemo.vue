<template>
  <div class="exTable">
    <ex-table ref="exTable" :data="data" :reload-method="handleReload" show-pagination stripe>
      <el-table-column label="名称" prop="name" />
      <el-table-column label="开始时间" prop="start_time" />
      <el-table-column label="开始时间" prop="end_time" />
    </ex-table>
    <!--    <el-button @click="$refs.exTable.setCurrentPage(1)">-->
    <!--      回到首页-->
    <!--    </el-button>-->
  </div>
</template>
<script>
import ExTable from '@/components/exTable.js'
import { getProjectList } from '@/request/api'
export default {
  components: { ExTable },
  data () {
    return {
      dataRemote: [
        { name: 'frog1o', start_time: '2019-02-09', end_time: '2019-09-18' },
        { name: 'frogo2', start_time: '2019-02-09', end_time: '2019-09-18' },
        { name: 'frogo3', start_time: '2019-02-09', end_time: '2019-09-18' },
        { name: 'frogo4', start_time: '2019-02-09', end_time: '2019-09-18' },
        { name: 'frogo5', start_time: '2019-02-09', end_time: '2019-09-18' },
        { name: 'frogo6', start_time: '2019-02-09', end_time: '2019-09-18' },
        { name: 'frogo7', start_time: '2019-02-09', end_time: '2019-09-18' },
        { name: 'frogo8', start_time: '2019-02-09', end_time: '2019-09-18' },
        { name: 'frogo9', start_time: '2019-02-09', end_time: '2019-09-18' },
        { name: 'frogo99', start_time: '2019-02-09', end_time: '2019-09-18' },
        { name: 'frogo111', start_time: '2019-02-09', end_time: '2019-09-18' }
      ],
      data: []
    }
  },
  mounted () {
    this.$refs.exTable.fetchData()
  },
  methods: {
    handleReload (pagination, { currentPage, pageSize }) {
      this.fetchRemoteData(pagination, currentPage, pageSize)
    },
    fetchRemoteData (pagination, currentPage, pageSize) {
      // currentPage：当前页， pageSize: 每页最大条目数， 用于服务端分页
      // 假设http请求数据，结果返回｛data_list: [...], total: ..｝
      // 设置表格数据
      getProjectList().then(res => {
        this.data = res.data.list
        // 设置分页总数
        // const pagination = this.$refs.exTable.pagination
        pagination.total = res.data.total
      }, error => {
        alert(error)
      })
    }
  }
}
</script>
<style lang="scss">
  .exTable{
    .el-pagination{margin-top: 20px;text-align: right}
  }
</style>
