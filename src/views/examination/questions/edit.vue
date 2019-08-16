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
      <div class="exTable">
        <ex-table ref="exTable" :data="questionsTableData" :reload-method="handleReload" show-pagination stripe>
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
      questionsTableData: []
    }
  },
  watch: {
  },
  mounted: function () {
    this.$store.commit('$_setBreadCrumb', { isShow: true,
      list: [
        { name: '首页', path: '/' }, { name: '题库管理', path: '/questions' }, { name: '试题编辑', path: '/questions/edit' }
      ] })
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
  }
</style>
