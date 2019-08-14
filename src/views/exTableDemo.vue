<template>
  <div class="exTable">
    <ex-table ref="exTable" :data="data" :search-method="handleSearch" show-pagination stripe>
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
      data: []
    }
  },
  mounted () {
    this.$refs.table.fetchData()
  },
  methods: {
    handleSearch (pagination, { currentPage, pageSize }) {
      this.fetchRemoteData(currentPage, pageSize)
    },
    fetchRemoteData (currentPage, pageSize) {
      // currentPage：当前页， pageSize: 每页最大条目数， 用于服务端分页
      // 假设http请求数据，结果返回｛data_list: [...], total: ..｝
      // 设置表格数据
      getProjectList().then(res => {
        this.data = res.data.list
        // 设置分页总数
        const pagination = this.$refs.table.pagination
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
