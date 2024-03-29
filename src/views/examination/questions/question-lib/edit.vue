<template>
  <el-main class="page-questionEdit">
    <h2 class="pageName">
      编辑题库 - <span v-if="!titleEditMode" class="bank-title">{{ bank_name }}</span>
      <el-input v-if="titleEditMode" v-model="bank_name" class="bank-title-input" />
      <el-button v-if="!titleEditMode" @click="bankTitleEdit" size="mini" type="text" icon="el-icon-edit">
        修改
      </el-button>
      <el-button v-if="titleEditMode" @click="bankTitleEditComplete" size="mini" type="text" icon="el-icon-finished">
        完成
      </el-button>
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
            <el-radio :label="item.label" v-for="item in type" :key="item.label" border>
              {{ item.name }} <span v-if="item.label !== 'all'">({{ item.total }})</span>
            </el-radio>
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
        <ex-table ref="exTable" :data="questionsTableData" :reload-method="handleReload" @selection-change="handleSelectionChange" header-row-class-name="ex-table-header" show-pagination stripe>
          <el-table-column
            type="selection"
            width="55"
          />
          <el-table-column
            prop="type"
            label="题型"
            width="90"
            align="center"
          />
          <el-table-column
            prop="subject"
            label="题目"
          />

          <el-table-column
            prop="add_time"
            label="创建时间"
            width="180"
            align="center"
          />
          <el-table-column
            prop="username"
            label="创建人"
            width="100"
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
        <a href="/v1/res/importTemp/question.xlsx" rel="external nofollow" download="模板"><el-button size="small" type="success">下载模板</el-button></a>
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
import { getQuestionList, deleteQuestion, modifyQuestionLib, getQuestionLibInfo } from '@/request/api'
import ExTable from '@/components/exTable.js'
export default {
  components: {
    ExTable
  },
  data () {
    return {
      titleEditMode: false,
      keyword: '',
      filterForm: {
        type: 'all'
      },
      type: [
        { name: '不限', label: 'all' },
        { name: '单选', label: 'single', total: 0 },
        { name: '多选', label: 'multi', total: 0 },
        { name: '判断', label: 'trueFalse', total: 0 }
      ],
      questionsTableData: [],
      multipleSelection: [],
      importQuestionDialog: false,
      fileList: [],
      files: '',
      fileName: '',
      bank_name: '',
      bank_id: ''
    }
  },
  watch: {
  },
  mounted: function () {
    let routeParams = this.$route.params
    if (routeParams.bank_id) {
      this.bank_id = routeParams.bank_id
      localStorage.setItem('bank_id', routeParams.bank_id)
    } else {
      this.bank_id = localStorage.getItem('bank_id')
    }
    if (routeParams.bank_name) {
      this.bank_name = routeParams.bank_name
      localStorage.setItem('bank_name', routeParams.bank_name)
    } else {
      this.bank_name = localStorage.getItem('bank_name')
    }
    this.fetchRemoteData() // 初始化数据
    getQuestionLibInfo({ id: this.bank_id }).then(res => {
      this.type.map(_ => {
        _.total = res.data[_.label + '_total']
        return _
      })
    })
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
      fileFormData.append('question_file', this.files)
      fileFormData.append('bank_id', this.bank_id)
      fileFormData.append('bank_name', this.bank_name)
      let requestConfig = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      // eslint-disable-next-line no-console
      console.log(fileFormData)
      this.$axios.post('/v1/question/import', fileFormData, requestConfig).then((res) => { // todo 待验证
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
        bank_id: this.bank_id,
        offset: currentPage || 1,
        limit: pageSize || 10
      }
      let paginationObj = pagination || this.$refs.exTable.pagination
      getQuestionList(param).then(res => {
        this.questionsTableData = res.data.list
        paginationObj.total = res.data.total
      })
    },
    handleSearch () {
      this.fetchRemoteData()
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleEdit (index, row) { // 编辑
      this.$router.push({ name: 'question-edit', params: { id: row.id, bank_id: this.bank_id, bank_name: this.bank_name } })
    },
    gotoCreate () {
      let target = this.$router.resolve({ name: 'question-create', params: { bank_id: this.bank_id, bank_name: this.bank_name } })
      window.open(target.href, '_blank')
      // this.$router.push({ name: 'question-create', params: { bank_id: this.bank_id, bank_name: this.bank_name } })
    },
    deleteAll () {
      this.$confirm('您确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let list = this.multipleSelection.map(item => {
          return item.id
        })
        deleteQuestion({ id: list }).then(res => { // todo 等待入参的key
          this.$message.success(res.message)
          this.fetchRemoteData()
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
        deleteQuestion({ id: [row.id] }).then(res => {
          this.$message.success(res.message)
          this.fetchRemoteData()
        })
      }).catch(() => {

      })
    },
    bankTitleEdit () {
      this.titleEditMode = true
    },
    bankTitleEditComplete () {
      this.titleEditMode = false
      modifyQuestionLib({ id: parseInt(this.bank_id), name: this.bank_name }).then(res => {
        this.$message.success(res.message)
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
          font-size: 26px;.bank-title-input{width:200px; vertical-align: middle}
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
