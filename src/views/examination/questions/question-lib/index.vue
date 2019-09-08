<template>
  <el-container class="main-content page-questions">
    <AsideMenu />
    <el-main>
      <h2>题库管理</h2>
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
            创建题库
          </el-button>
        </div>
      </div>
      <div class="list">
        <div class="exTable">
          <ex-table ref="exTable" :data="questionLibTableData" :reload-method="handleReload" show-pagination stripe>
            <el-table-column
              prop="name"
              label="题库名"
            />
            <el-table-column
              prop="add_time"
              label="创建时间"
              width="180"
            />
            <el-table-column
              prop="num"
              label="试题数"
              width="180"
            />
            <el-table-column
              label="操作"
              width="180"
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
      <el-dialog
        :visible.sync="createQuestionsDialogVisible"
        title="创建题库"
        width="30%"
      >
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
          <el-form-item label="题库名" prop="name">
            <el-input v-model="form.name" />
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="createQuestionsDialogVisible = false">取 消</el-button>
          <el-button @click="handleAdd" type="primary">确 定</el-button>
          <el-button @click="handleGotoEdit" type="primary">编辑试题</el-button>
        </span>
      </el-dialog>
    </el-main>
  </el-container>
</template>

<script>
import AsideMenu from '@/components/asideMenu'
import ExTable from '@/components/exTable.js'
import { getQuestionLibList, addQuestionLib, deleteQuestionLib } from '@/request/api'
export default {
  components: {
    AsideMenu,
    ExTable
  },
  data () {
    return {
      keyword: '',
      questionLibTableData: [],
      createQuestionsDialogVisible: false,
      form: {
        name: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入题库名', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
  },
  created: function () {

  },
  mounted: function () {
    this.fetchRemoteData() // 初始化数据
    this.$store.commit('$_setBreadCrumb', { isShow: true, // 面包屑
      list: [
        { name: '题库管理' }
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
      getQuestionLibList(param).then(res => {
        this.questionLibTableData = res.data.list
        paginationObj.total = res.data.total
      })
    },
    handleCreate () { // 创建题库
      this.createQuestionsDialogVisible = true
    },
    handleAdd () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          addQuestionLib({ name: this.form.name }).then(res => {
            this.$message.success(res.message)
            this.fetchRemoteData()
            this.createQuestionsDialogVisible = false
          })
        } else {
          return false
        }
      })
    },
    handleGotoEdit () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          addQuestionLib({ name: this.form.name }).then(res => {
            this.$message.success('添加成功')
            this.$router.push({ name: 'questionLib-edit', params: { bank_id: res.data.id, bank_name: this.form.name } })
            this.createQuestionsDialogVisible = false
          })
        } else {
          return false
        }
      })
    },
    handleSearch () { // 搜索触发
      this.fetchRemoteData()
    },
    handleEdit (index, row) { // 编辑
      this.$router.push({ name: 'questionLib-edit', params: { bank_id: row.id, bank_name: row.name } })
    },
    handleDelete (index, row) { // 删除
      this.$confirm('您确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteQuestionLib({ id: row.id }).then(res => {
          this.$message.success(res.message)
          this.fetchRemoteData()
        })
      })
    }
  }
}
</script>

<style lang="scss">
.page-questions{
 padding: 0;
  .exTable{
    .el-pagination{margin-top: 20px;text-align: right}
  }
}
</style>
