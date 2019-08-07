<template lang="html">
  <el-container class="main-content page-project">
    <el-aside width="160px">
      <dl>
        <dt>项目培训333</dt>
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
      <div class="project-block">
        <el-tabs v-model="activeName">
          <el-tab-pane name="card">
            <span slot="label"><i class="el-icon-menu" /> </span>
            <el-row>
              <el-col :span="5" v-for="(item, index) in projectList" :key="`project_card_${index}`" :offset="index%4 ==0 ? 0 : 1">
                <el-card class="project-card">
                  <div :class="`status-bg ${statusBgMap[item.status]}`">
                    <span class="special-status">待审批</span>
                    编辑中
                  </div>
                  <div class="headline">
                    {{ item.name }}
                  </div>
                  <div class="date">
                    <p>发布时间： {{ item.start_time }}</p>
                    <p>结束时间： {{ item.end_time }}</p>
                  </div>
                  <div class="percent">
                    <span class="person-num"><i class=" el-icon-user" /> {{ item.personnel.length }}</span>
                    <el-progress :percentage="70" :stroke-width="4" />
                  </div>
                  <div class="mask">
                    <div class="operate">
                      <div class="item">
                        <p class="icon">
                          <i class="el-icon-edit" />
                        </p>
                        <p class="text">
                          编辑
                        </p>
                      </div>
                      <div class="item">
                        <p class="icon">
                          <i class="el-icon-view" />
                        </p>
                        <p class="text">
                          预览
                        </p>
                      </div>
                      <div class="item">
                        <p class="icon">
                          <i class="el-icon-download" />
                        </p>
                        <p class="text">
                          下线
                        </p>
                      </div>
                      <div class="item">
                        <p class="icon">
                          <i class="el-icon-delete" />
                        </p>
                        <p class="text">
                          删除
                        </p>
                      </div>
                    </div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane name="list">
            <span slot="label"><i class="el-icon-bank-card" /> </span>
            <div v-for="(item, index) in 7" :key="`project_list_${index}`" class="project-list">
              <span class="pending">待审批</span>
              <el-row :gutter="20">
                <el-col :span="2">
                  <el-progress :percentage="50" type="circle" width="52" stroke-width="4" />
                </el-col>
                <el-col :span="16">
                  <div class="headline">
                    <span class="status">[进行中]</span>孙子兵法实践初级入门第一届
                  </div>
                  <div class="pieces">
                    <span>发布时间： 2019-8-22</span>  <span class="end-date">结束时间： 2019-9-29</span>  <span class="person-num"><i class=" el-icon-user" /> 158</span>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="operate-item">
                    <span @click="handleEdit"><i class="el-icon-edit" /> 编辑</span>
                    <span @click="handleView"><i class="el-icon-view" /> 预览</span>
                    <span @click="handleOffline"><i class="el-icon-download" /> 下线</span>
                    <span @click="handleDelete"><i class="el-icon-delete" /> 删除</span>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-main>
  </el-container>
</template>
<script>
// import { mapState, mapMutations } from 'vuex'
import { getProjectList } from '@/request/api'
export default {
  data () {
    return {
      activeName: 'list',
      keyword: '',
      filterForm: {
        status: '全部'
      },
      status: ['全部', '正常', '草稿', '下线'],
      projectList: [],
      statusBgMap: { 0: 'gray', 1: 'green', 2: 'blue' }
    }
  },
  computed: {
    getProjectListParam: function () {
      return {
        keyword: this.keyword,
        status: this.status,
        offset: this.currentPage,
        limit: this.pageSize
      }
    }
  },
  watch: {
  },
  mounted: function () {
    this.getProjectList()
  },
  methods: {
    getProjectList () {
      let param = this.getProjectListParam
      // console.log(param)
      getProjectList(param).then(res => {
        this.projectList = res.data.list
        this.total = res.data.total
      }, error => {
        error && this.$message.error(error.message)
      })
    },
    gotoCreate () {
      this.$router.push({ path: '/projectManagement/create' })
    },
    handleSearch () {

    },
    handleView () {

    },
    handleEdit () {

    },
    handleOffline () {

    },
    handleDelete () {

    }
  }
}
</script>
