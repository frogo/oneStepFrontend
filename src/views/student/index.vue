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
          <el-button @click="handleAddStudent" type="primary" size="small">
            添加学员
          </el-button>
          <el-button @click="handleDeleteAll" type="primary" size="small">
            批量删除
          </el-button>
        </div>

        <el-table
          ref="multipleTable"
          :data="studentsTableData"
          @selection-change="handleSelectionChange"
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column
            type="selection"
            width="55"
          />
          <el-table-column
            prop="name"
            label="姓名"
            width="120"
          />
          <el-table-column
            prop="jobNumber"
            label="工号"
            width="120"
          />
          <el-table-column
            prop="department"
            label="部门"
          />
          <el-table-column
            prop="username"
            label="用户名"
          />
          <el-table-column
            prop="password"
            label="密码"
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
        </el-table>
      </div>
      <div class="pager">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pager.currentPage"
          :page-sizes="[10, 20, 50]"
          :page-size="pager.pageSize"
          :total="pager.total"
          layout="total, sizes, prev, pager, next, jumper"
        />
      </div>
      <el-dialog
        :visible.sync="importStudentDialogVisible"
        title="导入学员"
        width="30%"
      >
        <span>导入学员</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="importStudentDialogVisible = false">取 消</el-button>
          <el-button @click="importStudentDialogVisible = false" type="primary">确 定</el-button>
        </span>
      </el-dialog>

      <el-dialog
        :visible.sync="addStudentDialogVisible"
        title="新增学员"
        width="30%"
      >
        <span>新增学员</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addStudentDialogVisible = false">取 消</el-button>
          <el-button @click="addStudentDialogVisible = false" type="primary">确 定</el-button>
        </span>
      </el-dialog>
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
      keyword: '',
      studentsTableData: [],
      pager: {
        currentPage: 1,
        pageSize: 10,
        total: 100
      },
      importStudentDialogVisible: false,
      addStudentDialogVisible: false
    }
  },
  watch: {
  },
  mounted: function () {
  },
  methods: {
    gotoImport () { // 导入
      this.importStudentDialogVisible = true
    },
    handleSearch () { // 搜索触发

    },
    handleEdit (index, row) { // 编辑

    },
    handleDelete (index, row) { // 删除
      this.$confirm('您确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

      }).catch(() => {

      })
    },
    handleAddStudent () { // 增加学员
      this.addStudentDialogVisible = true
    },
    handleDeleteAll () { // 批量删除
      this.$confirm('您确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

      }).catch(() => {

      })
    },
    handleSelectionChange () { // 表格多选

    },
    handleSizeChange () { // 条数改变

    },
    handleCurrentChange () { // 页数改变

    }
  }
}
</script>

<style lang="scss">
  .page-student{
    .operate{ text-align: right; margin: 0 0 20px 0}
  }
</style>
