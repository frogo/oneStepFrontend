<template>
  <el-container class="main-content page-student">
    <AsideMenu />
    <el-main>
      <h2>特殊学员</h2>
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
          <el-button @click="gotoImport" type="success" size="small" class="add-button">
            导入学员
          </el-button>
        </div>
      </div>
      <div class="list">
        <div class="operate">
          <el-button @click="addStudentDialogVisible = true" type="primary" size="small">
            添加学员
          </el-button>
          <el-button @click="handleDeleteAll" :disabled="multipleSelection.length > 0 ? false: true" type="primary" size="small">
            批量删除
          </el-button>
        </div>

        <div class="exTable">
          <ex-table ref="exTable" :data="spStudentTableData" :reload-method="handleReload" @selection-change="handleSelectionChange" show-pagination stripe>
            <el-table-column
              type="selection"
              width="55"
            />
            <el-table-column
              prop="name"
              label="姓名"
              width="150"
            />
            <el-table-column
              prop="number"
              label="工号"
              width="150"
            />
            <el-table-column
              prop="department"
              label="部门"
              width="150"
            />
            <el-table-column
              prop="account"
              label="用户名"
              width="150"
            />
            <el-table-column
              prop="pwd"
              label="密码"
              width="150"
            />
            <el-table-column
              label="操作"
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
        :visible.sync="importStudentDialogVisible"
        title="导入学员"
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
          <a href="/res/importTemp/sp_student.xlsx" rel="external nofollow" download="模板"><el-button size="small" type="success">下载模板</el-button></a>
          <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button> -->
          <div slot="tip" class="el-upload__tip">
            只能上传excel文件，且不超过5MB
          </div>
          <div slot="tip" class="el-upload-list__item-name">
            {{ fileName }}
          </div>
        </el-upload>
        <span slot="footer" class="dialog-footer">
          <el-button @click="importStudentDialogVisible = false">取 消</el-button>
          <el-button @click="submitUpload()" type="primary">确 定</el-button>
        </span>
      </el-dialog>

      <el-dialog
        :visible.sync="editStudentDialogVisible"
        title="编辑学员"
        width="30%"
      >
        <el-form ref="studentEditForm" :model="studentEditForm" :rules="rules" label-width="100px" class="demo-ruleForm">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="studentEditForm.name" />
          </el-form-item>
          <el-form-item label="工号" prop="number">
            <el-input v-model="studentEditForm.number" />
          </el-form-item>
          <el-form-item label="部门" prop="department">
            <el-input v-model="studentEditForm.department" />
          </el-form-item>
          <el-form-item label="用户名" prop="account">
            <el-input v-model="studentEditForm.account" />
          </el-form-item>
          <el-form-item label="密码" prop="pwd">
            <el-input v-model="studentEditForm.pwd" />
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editStudentDialogVisible = false">取 消</el-button>
          <el-button @click="handleEditStudent" type="primary">确 定</el-button>
        </span>
      </el-dialog>

      <el-dialog
        :visible.sync="addStudentDialogVisible"
        title="新增学员"
        width="30%"
      >
        <el-form ref="studentAddForm" :model="studentAddForm" :rules="rules" label-width="100px" class="demo-ruleForm">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="studentAddForm.name" />
          </el-form-item>
          <el-form-item label="工号" prop="number">
            <el-input v-model="studentAddForm.number" />
          </el-form-item>
          <el-form-item label="部门" prop="department">
            <el-input v-model="studentAddForm.department" />
          </el-form-item>
          <el-form-item label="用户名" prop="account">
            <el-input v-model="studentAddForm.account" />
          </el-form-item>
          <el-form-item label="密码" prop="pwd">
            <el-input v-model="studentAddForm.pwd" />
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addStudentDialogVisible = false">取 消</el-button>
          <el-button @click="handleAddStudent" type="primary">确 定</el-button>
        </span>
      </el-dialog>
    </el-main>
  </el-container>
</template>

<script>
import AsideMenu from '@/components/asideMenu'
import ExTable from '@/components/exTable.js'
import { getSpecialStudentList, deleteSpecialStudent, addSpecialStudent, editSpecialStudent } from '@/request/api'
export default {
  components: {
    AsideMenu,
    ExTable
  },
  data () {
    return {
      keyword: '',
      studentAddForm: {
        name: '',
        number: '',
        department: '',
        account: '',
        pwd: ''
      },
      studentEditForm: {
        name: '',
        number: '',
        department: '',
        account: '',
        pwd: '',
        id: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入学员姓名', trigger: 'blur' }
        ],
        number: [
          { required: true, message: '请输入学员工号', trigger: 'blur' }
        ],
        department: [
          { required: true, message: '请输入学员部门', trigger: 'blur' }
        ],
        account: [
          { required: true, message: '请输入学员用户名', trigger: 'blur' }
        ],
        pwd: [
          { required: true, message: '请输入学员密码', trigger: 'blur' }
        ]
      },
      spStudentTableData: [],
      importStudentDialogVisible: false,
      fileList: [],
      files: '',
      fileName: '',
      addStudentDialogVisible: false,
      multipleSelection: [],
      editStudentDialogVisible: false
    }
  },
  watch: {
  },
  mounted: function () {
    this.fetchRemoteData() // 初始化数据
    this.$store.commit('$_setBreadCrumb', { isShow: true,
      list: [
        { name: '首页', path: '/' }, { name: '特殊学员', path: '/specialStudent' }
      ] })
  },
  methods: {
    beforeUpload (file) {
      // eslint-disable-next-line no-console
      console.log(file, '文件')

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
      fileFormData.append('file', this.files)// filename是键，file是值，就是要传的文件，test.zip是要传的文件名
      let requestConfig = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      // eslint-disable-next-line no-console
      console.log(fileFormData)
      this.$axios.post('/v1/spStudent/import', fileFormData, requestConfig).then((res) => {
        if (res.data && res.data.code === '1') {
          this.$message({
            message: '导入成功',
            type: 'success',
            duration: 1500,
            onClose: () => {
              this.importStudentDialogVisible = false
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
        offset: currentPage || 1,
        limit: pageSize || 10
      }
      let paginationObj = pagination || this.$refs.exTable.pagination
      getSpecialStudentList(param).then(res => {
        this.spStudentTableData = res.data.list
        paginationObj.total = res.data.total
      })
    },
    gotoImport () { // 导入
      this.importStudentDialogVisible = true
    },
    handleSearch () { // 搜索触发
      this.fetchRemoteData()
    },
    handleEdit (index, row) { // 编辑
      this.editStudentDialogVisible = true
      this.studentEditForm = JSON.parse(JSON.stringify(row))
    },
    handleDelete (index, row) { // 删除
      this.$confirm('您确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteSpecialStudent({ id: [row.id] }).then(res => {
          this.$message.success(res.message)
          this.fetchRemoteData()
        })
      }).catch(() => {

      })
    },
    handleAddStudent () { // 增加学员&编辑学员
      this.$refs['studentAddForm'].validate((valid) => {
        if (valid) {
          addSpecialStudent(this.studentAddForm).then(res => {
            this.$message.success(res.message)
            this.addStudentDialogVisible = false
            this.fetchRemoteData()
          })
        }
      })
    },
    handleEditStudent () {
      this.$refs['studentEditForm'].validate((valid) => {
        if (valid) {
          editSpecialStudent(this.studentEditForm).then(res => {
            this.$message.success(res.message)
            this.editStudentDialogVisible = false
            this.fetchRemoteData()
          })
        }
      })
    },
    handleDeleteAll () { // 批量删除
      this.$confirm('您确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let list = this.multipleSelection.map(item => {
          return item.id
        })
        deleteSpecialStudent({ id: list }).then(res => {
          this.$message.success(res.message)
          this.fetchRemoteData()
        })
      }).catch(() => {

      })
    },
    handleSelectionChange (val) { // 表格多选
      this.multipleSelection = val
    }
  }
}
</script>

<style lang="scss">
  .page-student{
    .operate{ text-align: right; margin: 0 0 20px 0}
    .exTable{
      .el-pagination{margin-top: 20px;text-align: right}
    }
    .el-upload-list__item-name{ margin-top: 15px}
  }
</style>
