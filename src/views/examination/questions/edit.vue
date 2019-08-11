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
          <el-radio-group v-model="filterForm.type">
            <el-radio :label="item" v-for="item in type" :key="item" border />
          </el-radio-group>
        </el-form-item>
      </el-form>
    </div>

    <div class="btn-box">
      <el-button type="primary" size="small">
        手动建题
      </el-button>
      <el-button type="success" size="small">
        导入试题
      </el-button>
      <el-button type="danger" size="small">
        批量删除
      </el-button>
    </div>
    <div class="list">
      <el-table
        ref="multipleTable"
        :data="questionsTableData"
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
          label="题型"
          width="120"
        />
        <el-table-column
          prop="address"
          label="题目"
          show-overflow-tooltip
        />
        <el-table-column
          prop="name"
          label="创建人"
          width="120"
        />
        <el-table-column
          prop="name"
          label="创建时间"
          width="120"
        />
        <el-table-column
          prop="name"
          label="操作"
          width="120"
        />
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
</template>

<script>
export default {
  data () {
    return {
      keyword: '',
      filterForm: {
        type: '不限'
      },
      type: ['不限', '单选', '多选', '判断'],
      questionsTableData: [],
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
    handleSearch () {

    },
    handleSelectionChange () {

    },
    handleSizeChange () {

    },
    handleCurrentChange () {

    }
  }
}
</script>

<style lang="scss">
  .page-questionEdit{
      box-shadow: 0px 0px 5px #888888;
      margin: 15px auto;
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
    .pager{ text-align: right; margin-top: 20px}
  }
</style>
