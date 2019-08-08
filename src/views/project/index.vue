<template lang="html">
  <el-container class="main-content page-project">
    <AsideMenu />
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
              <el-radio :label="item" v-for="item in status" :key="item" border />
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
                    <span @click="handlePending" class="special-status">待审批</span>
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
                    <el-progress :percentage="item.ratio" :stroke-width="3" />
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
                      <div @click="handleView" class="item">
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
                  <el-progress :percentage="50" :width="52" :stroke-width="4" type="circle" />
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
    <el-dialog
      :visible.sync="viewDialogVisible"
      title="提示"
      width="50%"
      class="projectViewDialog"
    >
      <div class="project-view-box">
        <ul>
          <li class="flex">
            <span><i>参训对象：</i>一般员工</span> <span><i>目标人数：</i>26</span>
          </li>
          <li class="flex">
            <span><i>开始日期：</i>2019-04-01</span> <span><i>结束日期：</i>2019-05-01</span>
          </li>
          <li>
            <div class="head">
              简介：
            </div>
            <div class="content">
              洒落的骄傲的就看见了快速减肥涉及到法律
            </div>
          </li>
          <li>
            <div class="head">
              包含课程：
            </div>
            <div class="content flex">
              <div class="chapter">
                <p>第一章课程介绍</p>
                <p>第一章课程介绍</p>
                <p>第一章课程介绍</p>
                <p>第一章课程介绍</p>
                <p>第一章课程介绍</p>
              </div>
              <div class="qrCode">
                <img src="@/assets/img/qrCode.png">
                <el-button type="primary" size="small">
                  下载培训项目二维码
                </el-button>
              </div>
            </div>
          </li>
          <li class="copyLink">
            <el-input id="url" value="www.yibuwuyou.com" /> <el-button @click="copyUrl2">
              复制链接
            </el-button>
          </li>
        </ul>
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync="approvalDialogVisible"
      title="报名审批"
      width="80%"
      class="projectApprovalDialog"
    >
      <div class="btn-box">
        <el-button type="success" size="small">
          批量通过
        </el-button> <el-button type="primary" size="small">
          批量不通过
        </el-button>
      </div>

      <el-table
        ref="multipleTable"
        :data="pendingTableData"
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
          label="学员姓名"
          width="120"
        />
        <el-table-column
          prop="phone"
          label="联系电话"
          width="120"
        />
        <el-table-column
          prop="add_time"
          label="申请时间"
        />
        <el-table-column
          label="操作"
        >
          <template slot-scope="scope">
            <el-button
              @click="handleEdit(scope.$index, scope.row)"
              size="mini"
            >
              通过
            </el-button>
            <el-button
              @click="handleDelete(scope.$index, scope.row)"
              size="mini"
              type="danger"
            >
              不通过
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <span slot="footer" class="dialog-footer">
        <el-button @click="approvalDialogVisible = false" type="primary">退出</el-button>

      </span>
    </el-dialog>
  </el-container>
</template>
<script>
// import { mapState, mapMutations } from 'vuex'
import { getProjectList } from '@/request/api'
import AsideMenu from '@/components/asideMenu'
export default {
  components: {
    AsideMenu
  },
  data () {
    return {
      activeName: 'card',
      keyword: '',
      filterForm: {
        status: '全部'
      },
      status: ['全部', '正常', '草稿', '下线'],
      projectList: [],
      statusBgMap: { 0: 'gray', 1: 'green', 2: 'blue' },
      viewDialogVisible: false,
      approvalDialogVisible: false,
      pendingTableData: [{
        add_time: '2016-05-02',
        name: '王小虎',
        phone: '13986189581'
      }],
      multiplePendingSelection: ''
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
      this.viewDialogVisible = true
    },
    handleEdit () {

    },
    handleOffline () {

    },
    handleDelete () {

    },
    copyUrl2 () {
      let Url2 = document.getElementById('url')
      Url2.select() // 选择对象
      document.execCommand('Copy') // 执行浏览器复制命令
      alert('已复制好，可贴粘。')
    },
    handlePending () {
      this.approvalDialogVisible = true
    },
    handleSelectionChange (val) {
      this.multiplePendingSelection = val
    }
  }
}
</script>
