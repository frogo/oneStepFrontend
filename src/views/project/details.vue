<template lang="html">
  <el-container class="main-content page-projectDetails">
    <AsideMenu />
    <el-main>
      <el-row>
        <el-col :span="18">
          <div class="main">
            <h2>营销基础训练营</h2>
            <div class="pieces">
              <div class="left">
                <el-tag effect="plain" size="small">
                  <span class="c666">参与总数:</span>  {{ projectDetails.join_num }}
                </el-tag>
                <el-tag effect="plain" size="small">
                  <span class="c666">完成总数:</span>  98
                </el-tag>
              </div>

              <div class="right">
                开始时间：{{ projectDetails.start_time }} 结束时间：{{ projectDetails.end_time }}
              </div>
            </div>
            <div class="lineChart" />
            <!--            <div class="operate-btn">-->
            <!--              <el-button @click="handleStudentStats" size="small" type="success">-->
            <!--                学员报表-->
            <!--              </el-button>-->
            <!--              <el-button @click="handleTrainingDetail" size="small" type="primary">-->
            <!--                详情报表-->
            <!--              </el-button>-->
            <!--            </div>-->

            <el-tabs v-model="activeName">
              <el-tab-pane label="学员详情" name="projectStudent">
                <el-button @click="handleExportStudent" size="small" type="success">
                  导出学员报表
                </el-button>
                <div class="exTable">
                  <ex-table ref="projectStudent_exTable" :data="projectStudentTableData" :reload-method="handleProjectStudentReload" show-pagination stripe>
                    <el-table-column
                      prop="number"
                      label="编号"
                      width="80"
                    />
                    <el-table-column
                      prop="student_name"
                      label="姓名"
                      width="60"
                      fixed="left"
                    />
                    <el-table-column
                      prop="student_phone"
                      label="电话"
                      width="120"
                    />
                    <el-table-column
                      prop="department"
                      label="部门"
                      width="100"
                    />
                    <el-table-column
                      prop="add_time"
                      label="参加时间"
                      width="120"
                    />
                    <el-table-column
                      prop="finish_time"
                      label="完成时间"
                      width="120"
                    />
                    <el-table-column
                      prop="credit"
                      label="获得学分"
                      width="80"
                    />
                    <el-table-column
                      prop="sign"
                      label="签到"
                      width="80"
                      class-name="sign"
                    >
                      <template slot-scope="scope">
                        <img :src="scope.row.sign">
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="操作"
                      fixed="right"
                      width="160"
                      header-align="center"
                    >
                      <template slot-scope="scope">
                        <el-button
                          @click="handleViewLearning(scope.$index, scope.row)"
                          size="mini"
                        >
                          查看
                        </el-button>
                        <el-button
                          @click="handleDeleteLearning(scope.$index, scope.row)"
                          size="mini"
                          type="danger"
                        >
                          删除
                        </el-button>
                      </template>
                    </el-table-column>
                  </ex-table>
                </div>
              </el-tab-pane>
              <el-tab-pane label="项目详情" name="projectDetails">
                <div class="exTable">
                  <el-button @click="handleExportStudentCourse" size="small" type="success">
                    导出项目详情报表
                  </el-button>
                  <ex-table ref="projectStudentCourse_exTable" :data="projectStudentCourseTableData" :reload-method="handleProjectStudentCourseReload" show-pagination stripe>
                    <el-table-column
                      prop="student_name"
                      label="姓名"
                      width="90"
                      fixed="left"
                    />
                    <el-table-column
                      prop="student_status"
                      label="学员状态"
                      width="90"
                    />
                    <el-table-column
                      prop="department"
                      label="部门"
                      width="90"
                    />
                    <el-table-column
                      prop="lesson_name"
                      label="课程"
                    />
                    <el-table-column
                      prop="lesson_source"
                      label="课程来源"
                      width="90"
                    />
                    <el-table-column
                      prop="lesson_status"
                      label="课程状态"
                      width="90"
                    />
                    <el-table-column
                      prop="start_time"
                      label="开始时间"
                      width="120"
                    />
                    <el-table-column
                      prop="minute"
                      label="学习时长"
                      width="90"
                    />
                    <el-table-column
                      prop="completion_percent"
                      label="完成度"
                      width="90"
                    />
                    <el-table-column
                      prop="finish_time"
                      label="完成时间"
                      width="120"
                    />
                    <el-table-column
                      prop="score"
                      label="考试(分)"
                      width="80"
                    />
                    <el-table-column
                      prop="reset_score"
                      label="补考(分)"
                      width="80"
                    />
                    <el-table-column
                      prop="credit"
                      label="获得学分"
                      width="80"
                    />
                  </ex-table>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="sideBar">
            <h3>
              学分排行
              <el-button @click="handleExportRanking" type="text">
                导出报表
              </el-button>
            </h3>
            <ul>
              <li class="title">
                <span><i>0</i>姓名</span><span>完成课程</span><span>学分</span>
              </li>
              <li v-for="(item, index) in ranking" class="item">
                <span><i :class="`color_${index+1}`">{{ index + 1 }}</i>{{ item.name }}</span><span>{{ item.lesson }}</span><span>{{ item.credit }}</span>
              </li>
            </ul>
          </div>
        </el-col>
      </el-row>
    </el-main>
    <el-dialog
      :visible.sync="learningDetailDialogVisible"
      title="学习详情"
      width="70%"
    >
      <div class="exTable">
        <ex-table ref="studentLearning_exTable" :data="studentLearningTableData" :reload-method="handleStudentLearningReload" show-pagination stripe>
          <el-table-column
            prop="lesson_name"
            label="课程"
          />
          <el-table-column
            prop="finish_time"
            label="完成时间"
            width="120"
          />
          <el-table-column
            prop="score"
            label="考试（分）"
            width="80"
          />
          <el-table-column
            prop="reset_score"
            label="补考（分）"
            width="80"
          />
          <el-table-column
            prop="credit"
            label="获得学分（分）"
            width="80"
          />
        </ex-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="learningDetailDialogVisible = false">取 消</el-button>
        <el-button @click="learningDetailDialogVisible = false" type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>
<script>

import { getProjectDetails, getProjectStudents, getProjectStudentCourse, getStudentLearning } from '@/request/api'
import AsideMenu from '@/components/asideMenu'
import ExTable from '@/components/exTable.js'
import { GetUrlParam } from '@/utility'

export default {
  components: {
    AsideMenu,
    ExTable
  },
  data () {
    return {
      activeName: 'projectStudent',
      projectDetails: '', // 项目详情
      projectStudentTableData: [], // 项目参训学员远程数据
      projectStudentCourseTableData: [], // 项目详情远程数据
      studentLearningTableData: [], // 学生学习详情远程数据
      learningDetailDialogVisible: false,
      currentStudentId: '', // 学习详情的当前学员的ID
      studentTableData: [],
      pager: {
        currentPage: 1,
        pageSize: 10,
        total: 100
      },
      ranking: [{ name: 'saad', lesson: '孙子兵法', credit: '90' }, { name: 'saad', lesson: '孙子兵法', credit: '90' }, { name: 'saad', lesson: '孙子兵法', credit: '90' }, { name: 'saad', lesson: '孙子兵法', credit: '90' }, { name: 'saad', lesson: '孙子兵法', credit: '90' }]
    }
  },
  computed: {

  },
  watch: {
  },
  mounted: function () {
    this.$store.commit('$_setBreadCrumb', { isShow: true,
      list: [
        { name: '首页', path: '/' }, { name: '培训项目管理', path: '/project' }, { name: '项目详情' }
      ] })
    getProjectDetails({ id: GetUrlParam('id') }).then(res => {
      this.projectDetails = res.data
    })
    this.fetchProjectStudentRemoteData()
    this.fetchProjectStudentCourseRemoteData()
  },
  methods: {
    // 学员报表
    handleProjectStudentReload (pagination, { currentPage, pageSize }) {
      this.fetchProjectStudentRemoteData(pagination, currentPage, pageSize)
    },
    fetchProjectStudentRemoteData (pagination, currentPage, pageSize) {
      let param = {
        camp_id: GetUrlParam('id'),
        offset: currentPage || 1,
        limit: pageSize || 10
      }
      let paginationObj = pagination || this.$refs.projectStudent_exTable.pagination
      getProjectStudents(param).then(res => {
        this.projectStudentTableData = res.data.list
        paginationObj.total = res.data.total
      })
    },
    // 详情报表
    handleProjectStudentCourseReload (pagination, { currentPage, pageSize }) {
      this.fetchProjectStudentCourseRemoteData(pagination, currentPage, pageSize)
    },
    fetchProjectStudentCourseRemoteData (pagination, currentPage, pageSize) {
      let param = {
        camp_id: GetUrlParam('id'),
        offset: currentPage || 1,
        limit: pageSize || 10
      }
      let paginationObj = pagination || this.$refs.projectStudentCourse_exTable.pagination
      getProjectStudentCourse(param).then(res => {
        this.projectStudentCourseTableData = res.data.list
        paginationObj.total = res.data.total
      })
    },
    // 学习详情
    handleStudentLearningReload (pagination, { currentPage, pageSize }) {
      this.fetchStudentLearningRemoteData(pagination, currentPage, pageSize)
    },
    fetchStudentLearningRemoteData (pagination, currentPage, pageSize) {
      let param = {
        camp_id: GetUrlParam('id'),
        student_id: this.currentStudentId, // 学员ID
        offset: currentPage || 1,
        limit: pageSize || 10
      }
      let paginationObj = pagination || this.$refs.studentLearning_exTable.pagination
      getStudentLearning(param).then(res => {
        this.studentLearningTableData = res.data.list
        paginationObj.total = res.data.total
      })
    },
    handleViewLearning (index, row) {
      this.learningDetailDialogVisible = true
      this.currentStudentId = row.id
      this.fetchStudentLearningRemoteData()
    }, // 查看学员学习
    handleDeleteLearning (index, row) {
      this.$confirm('确认删除？')
        .then(_ => {
          // do something
        })
        .catch(_ => {

        })
    }, // 删除学员
    handleExportRanking () { // 学分排行导出

    },
    handleExportStudent () { // 导出学员报表

    },
    handleExportStudentCourse () { // 导出项目详情报表

    }
  }
}
</script>
<style lang="scss">
  .page-projectDetails{
    .el-main{
      .main{
        border-right:1px solid #ededed;
        min-height: 400px;
        padding: 0 25px 0 0;
        h2{ font-size: 22px}
        .pieces{font-size: 12px; padding: 15px 0;color:#666666;display:flex;justify-content: space-between;
          span{ font-size: 14px}
        .right{ line-height: 24px}
        }
        .operate-btn{text-align: right}
        .table-list{ margin: 20px 0}
        .sign img{width:40px}
        .exTable{
          .el-pagination{margin-top: 20px;text-align: right}
        }
      }
      .sideBar{
        height:100%;padding: 10px;
        .el-button{ margin-left: 100px}
        ul li{ font-size: 12px;
          padding: 10px;
          i{ padding: 1px 5px;font-style: normal;
            margin-right: 5px;
            color:#fff;
           &.color_1{background: #ff4f2a}
            &.color_2{background: #409EFF}
            &.color_3{background:#15D1A4}
            &.color_4{ background: #fff560}
            &.color_5{background: #ff32ff}
          }
          span{display: inline-block;width:33%;
          &:nth-child(2){text-align: center}
            &:nth-child(3){text-align: center}
          }
        &.title{background:#fafafa;color:#999;   }
        &.item{ color:#666; }
        }
      }
    }

  }

</style>
