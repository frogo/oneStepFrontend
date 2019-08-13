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
        <el-table
          ref="multipleTable"
          :data="paperTableData"
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column
            prop="name"
            label="试卷名称"
          />
          <el-table-column
            prop="add_time"
            label="创建时间"
            width="180"
          />
          <el-table-column
            prop="count"
            label="试题数"
            width="180"
          />
          <el-table-column
            prop="rule"
            label="试题规则"
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
      paperTableData: [],
      pager: {
        currentPage: 1,
        pageSize: 10,
        total: 100
      }
    }
  },
  watch: {
  },
  mounted: function () {
  },
  methods: {
    handleCreate () { // 创建试卷

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
    handleSizeChange () { //      条数改变
      console.log(444444)
    },
    handleCurrentChange () { // 页数改变

    }
  }
}
</script>

<style lang="scss">
.page-paper{
  padding: 0;
}
</style>
