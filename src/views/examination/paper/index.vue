<template>
  <el-container class="main-content page-paper">
    <AsideMenu />
    <el-main>
      <h2>试卷管理</h2>
      <div class="search-box">
        <div class="keyword-input">
          <el-input
            v-model="keyword"
            @keyup.enter.native="handleSearch"
            placeholder="请输入内容"
            size="medium "
          >
            <i slot="suffix" @click="handleSearch" class="el-input__icon el-icon-search" />
          </el-input>
        </div>
        <div>
          <el-button @click="handleCreate" type="success" size="small" class="add-button">
            创建试卷
          </el-button>
        </div>
      </div>
      <div class="list">
        <div class="exTable">
          <ex-table ref="exTable" :data="paperTableData" :reload-method="handleReload" show-pagination stripe>
            <el-table-column
              prop="name"
              label="试卷名称"
            />
            <el-table-column
              prop="add_time"
              label="创建时间"
              width="120"
              align="center"
            />
            <el-table-column
              prop="num"
              label="试题数"
              width="100"
              align="center"
            />
            <el-table-column
              prop="rule"
              label="试题规则"
              width="120"
              align="center"
            />
            <el-table-column
              label="操作"
              width="180"
              align="center"
            >
              <template slot-scope="scope">
                <el-button
                  @click="handleEdit(scope.$index, scope.row)"
                  size="mini"
                >
                  编辑
                </el-button>
                <el-button
                  @click="handleDelete(scope.$index, scope.row)"
                  size="mini"
                  type="danger"
                >
                  删除
                </el-button>
              </template>
            </el-table-column>
          </ex-table>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import AsideMenu from '@/components/asideMenu'
import ExTable from '@/components/exTable.js'
import { getExaminationPaperList, deleteExaminationPaper } from '@/request/api'

export default {
  components: {
    AsideMenu,
    ExTable
  },
  data () {
    return {
      keyword: '',
      paperTableData: []
    }
  },
  watch: {
  },
  mounted: function () {
    this.fetchRemoteData() // 初始化数据
    this.$store.commit('$_setBreadCrumb', { isShow: true,
      list: [
        { name: '试卷管理', path: '/paper' }
      ] })
  },
  methods: {
    handleReload (pagination, { currentPage, pageSize }) {
      this.fetchRemoteData(pagination, currentPage, pageSize)
    },
    fetchRemoteData (pagination, currentPage, pageSize) {
      let param = {
        keyword: this.keyword,
        offset: currentPage || 1,
        limit: pageSize || 10
      }
      let paginationObj = pagination || this.$refs.exTable.pagination
      getExaminationPaperList(param).then(res => {
        this.paperTableData = res.data.list
        paginationObj.total = res.data.total
      })
    },
    handleCreate () { // 创建试卷
      this.$router.push({ path: '/paper/create' })
    },
    handleSearch () { // 搜索触发
      this.fetchRemoteData()
    },
    handleEdit (index, row) { // 编辑
      this.$router.push({ path: '/paper/edit', query: { id: row.id } })
    },
    handleDelete (index, row) { // 删除
      this.$confirm('您确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteExaminationPaper({ id: row.id }).then(res => {
          this.$message.success(res.message)
          this.fetchRemoteData()
        })
      }).catch(() => {

      })
    }
  }
}
</script>

<style lang="scss">
.page-paper{
  padding: 0;
  .exTable{
    .el-pagination{margin-top: 20px;text-align: right}
  }
}
</style>
