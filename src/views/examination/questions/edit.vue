<template>
  <el-main class="page-questionEdit">
    <h2 class="pageName">
      编辑试题
    </h2>

    <div class="filter-box">
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
      <el-form ref="filterForm" :model="filterForm" label-width="60px" size="mini">
        <el-form-item label="类型：">
          <el-radio-group v-model="filterForm.type" @change="handleTypeChange">
            <el-radio :label="item" v-for="item in type" :key="item" border />
          </el-radio-group>
        </el-form-item>
      </el-form>
    </div>

    <div class="btn-box">
      <el-button @click="gotoCreate" type="primary" size="small">
        手动建题
      </el-button>
      <el-button @click="importQuestionDialog = true" type="success" size="small">
        导入试题
      </el-button>
      <el-button @click="deleteAll" :disabled="multipleSelection.length > 0 ? false: true" type="danger" size="small">
        批量删除
      </el-button>
    </div>
    <div class="list">
      <div class="exTable">
        <ex-table ref="exTable" :data="questionsTableData" :reload-method="handleReload" @selection-change="handleSelectionChange" show-pagination stripe>
          <el-table-column
            type="selection"
            width="55"
          />
          <el-table-column
            prop="type"
            label="题型"
          />
          <el-table-column
            prop="subject"
            label="题目"
          />
          <el-table-column
            prop="creator"
            label="创始人"
            width="180"
          />
          <el-table-column
            prop="add_time"
            label="创建时间"
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
      :visible.sync="importQuestionDialog"
      title="导入试题"
      width="30%"
    >
      <el-upload
        ref="upload"
        :limit="1"
        :file-list="fileList"
        :before-upload="beforeUpload"
        class="upload-demo"
        action="doUpload"
      >
        <el-button slot="trigger" size="small" type="primary">
          选取文件
        </el-button>
        <a href="./static/questionTemplate.xlsx" rel="external nofollow" download="模板"><el-button size="small" type="success">下载模板</el-button></a>
        <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button> -->
        <div slot="tip" class="el-upload__tip">
          只能上传excel文件，且不超过5MB
        </div>
        <div slot="tip" class="el-upload-list__item-name">
          {{ fileName }}
        </div>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="importQuestionDialog = false">取消</el-button>
        <el-button @click="submitUpload()" type="primary">确定</el-button>
      </span>
    </el-dialog>
  </el-main>
</template>

<script>
import { getQuestionList, deleteQuestion, deleteQuestionAll } from '@/request/api'
import ExTable from '@/components/exTable.js'
import { GetUrlParam } from '@/utility'
export default {
  components: {
    ExTable
  },
  data () {
    return {
      keyword: '',
      filterForm: {
        type: '不限'
      },
      type: ['不限', '单选', '多选', '判断'],
      questionsTableData: [],
      multipleSelection: [],
      importQuestionDialog: false,
      fileList: [],
      files: '',
      fileName: ''
    }
  },
  watch: {
  },
  mounted: function () {
    this.fetchRemoteData() // 初始化数据
    this.$store.commit('$_setBreadCrumb', { isShow: true,
      list: [
        { name: '首页', path: '/' }, { name: '题库管理', path: '/questionLib' }, { name: '试题编辑', path: '/questionLib/edit' }
      ] })
  },
  methods: {
    beforeUpload (file) {
      // eslint-disable-next-line no-console
      console.log(this.file, '文件')

      this.files = file
      const extension = file.name.split('.')[1] === 'xls'
      const extension2 = file.name.split('.')[1] === 'xlsx'
      const isLt2M = file.size / 1024 / 1024 < 5
      if (!extension && !extension2) {
        this.$message.warning('上传模板只能是 xls、xlsx格式!')
        return
      }
      if (!isLt2M) {
        this.$message.warning('上传模板大小不能超过 5MB!')
        return
      }
      this.fileName = file.name
      return false // 返回false不会自动上传
    },
    submitUpload () {
      // eslint-disable-next-line no-console
      console.log(this.fileList, '文件')
      // eslint-disable-next-line no-console
      console.log('上传' + this.files.name)
      if (this.fileName === '') {
        this.$message.warning('请选择要上传的文件！')
        return false
      }
      let fileFormData = new FormData()
      fileFormData.append('question_file', this.files, this.fileName)// filename是键，file是值，就是要传的文件，test.zip是要传的文件名
      let requestConfig = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      // eslint-disable-next-line no-console
      console.log(fileFormData)
      this.$axios.post('question/import', fileFormData, requestConfig).then((res) => { // todo 待验证
        if (res.data && res.data.code === '1') {
          this.$message({
            message: '上传成功',
            type: 'success',
            duration: 1500,
            onClose: () => {
              this.importQuestionDialog = false
              this.fetchRemoteData()
            }
          })
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    handleReload (pagination, { currentPage, pageSize }) {
      this.fetchRemoteData(pagination, currentPage, pageSize)
    },
    fetchRemoteData (pagination, currentPage, pageSize) {
      let param = {
        keyword: this.keyword,
        type: this.filterForm.type,
        bank_id: GetUrlParam('id'),
        offset: currentPage || 1,
        limit: pageSize || 10
      }
      let paginationObj = pagination || this.$refs.exTable.pagination
      getQuestionList(param).then(res => {
        if (res.code === '1') {
          this.questionsTableData = res.data.list
          paginationObj.total = res.data.total
        }
      })
    },
    handleSearch () {
      this.fetchRemoteData()
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleEdit (index, row) { // 编辑
      this.$router.push({ path: '/questions/itemEdit', query: { id: row.id } })
    },
    gotoCreate () {
      this.$router.push({ path: '/questions/create', query: { id: GetUrlParam('id'), name: GetUrlParam('name') } })
    },
    deleteAll () {
      this.$confirm('您确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteQuestionAll({ list: this.multipleSelection }).then(res => { // todo 等待入参的key
          if (res.code === '1') {
            this.$message.success('删除成功')
            this.fetchRemoteData()
          }
        })
      }).catch(() => {

      })
    },
    handleTypeChange () {
      this.fetchRemoteData()
    },
    handleDelete (index, row) { // 删除
      this.$confirm('您确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteQuestion({ id: row.id }).then(res => {
          if (res.code === '1') {
            this.$message.success('删除成功')
            this.fetchRemoteData()
          }
        })
      }).catch(() => {

      })
    }
  }
}
</script>

<style lang="scss">
  .page-questionEdit{
      box-shadow: 0px 0px 5px #888888;
      margin: 0 auto 20px;
      padding: 20px;
        position: relative;
        h2 {
          font-size: 26px
        }
    .filter-box{
      position: relative;
      margin: 20px 0;
      .el-form{
        .el-form-item{padding-bottom: 10px; margin-bottom: 10px;
          &.keyword-input{      border-bottom: none;}
          .el-radio{ margin-right: 0;
            .el-radio__input{display:none}
            .el-radio__label{padding-left: 6px}
            .el-checkbox-button__inner{padding: 8px 15px}
          }
        }
      }
      .keyword-input{
        margin-bottom: 10px;
        .el-input{width:300px}
      }
    }
    .btn-box{display: flex;justify-content: flex-end; margin: 20px 0}

    .exTable{
      .el-pagination{margin-top: 20px;text-align: right}
    }

    .el-upload-list__item-name{ margin-top: 15px}
  }
</style>
