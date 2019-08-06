<template lang="html">
  <el-container class="main-content page-changePassword">
    <el-aside width="160px">
      <dl>
        <dt>项目培训</dt>
        <dd>
          <i class="el-icon-monitor" />
          <router-link to="/projectManagement" class="menu-link">
            在线培训项目
          </router-link>
        </dd>
        <dt>考试管理</dt>
        <dd>
          <i class="el-icon-edit-outline" />
          <router-link to="/" class="menu-link">
            题库管理
          </router-link>
        </dd>
        <dd>
          <i class="el-icon-document" />
          <router-link to="/" class="menu-link">
            试卷管理
          </router-link>
        </dd>
        <dt>数据统计</dt>
        <dd>
          <i class="el-icon-s-data" />
          <router-link to="/" class="menu-link">
            培训统计
          </router-link>
        </dd>
        <dd>
          <i class="el-icon-full-screen" />
          <router-link to="/" class="menu-link">
            课程排行
          </router-link>
        </dd>
        <dt>人员管理</dt>
        <dd>
          <i class="el-icon-coordinate" />
          <router-link to="/" class="menu-link">
            特殊学员
          </router-link>
        </dd>
      </dl>
    </el-aside>
    <el-main>
      <div class="filter-box">
        <el-button @click="gotoCreate" type="primary" class="add-button">
          创建项目
        </el-button>
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
          <el-form-item label="状态：">
            <el-radio-group v-model="filterForm.status">
              <el-radio :label="item" v-for="item in status" border />
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
    </el-main>
  </el-container>
</template>
<script>
// import { mapState, mapMutations } from 'vuex'
// import { getCourseList } from '@/request/api'
export default {
  data () {
    return {
      keyword: '',
      filterForm: {
        status: '全部'
      },
      status: []
    }
  },
  computed: {
  },
  watch: {
  },
  mounted: function () {
  },
  methods: {
    gotoCreate () {
      this.$router.push({ path: '/projectManagement/create' })
    },
    handleSearch () {

    }
  }
}
</script>
