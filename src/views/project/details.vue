<template lang="html">
  <el-container class="main-content page-projectDetails">
    <AsideMenu />
    <el-main>
      <el-row style="height:100%">
        <el-col :span="18" style="height:100%">
          <div class="main">
            <div class="center">
              <h2>{{ projectDetails.name }}</h2>
              <div class="pieces">
                <div class="left">
                  <el-tag effect="plain" size="small">
                    <span class="c666">参与总数:</span>  {{ projectDetails.join_num }}
                  </el-tag>
                  <el-tag effect="plain" size="small">
                    <span class="c666">完成总数:</span>  {{ projectDetails.complete_num }}
                  </el-tag>
                </div>

                <div class="right">
                  开始时间：{{ projectDetails.start_time }} 结束时间：{{ projectDetails.end_time }}
                </div>
              </div>
              <div class="vueChart">
                <v-chart :options="barData" />
              </div>
              <el-tabs v-model="activeName">
                <el-tab-pane label="学员详情" name="projectStudent">
                  <div style="text-align: right">
                    <el-button @click="handleExportStudent" size="small" type="success">
                      导出学员报表
                    </el-button>
                  </div>
                  <div class="exTable">
                    <ex-table ref="projectStudent_exTable" :data="projectStudentTableData" :reload-method="handleProjectStudentReload" show-pagination stripe>
                      <el-table-column
                        prop="student_name"
                        label="姓名"
                        width="90"
                        fixed="left"
                        align="left"
                      />
                      <el-table-column
                        prop="number"
                        label="编号"
                        width="90"
                        align="center"
                      />
                      <el-table-column
                        prop="student_status"
                        label="状态"
                        width="60"
                        align="center"
                      />
                      <el-table-column
                        prop="student_phone"
                        label="电话"
                        width="120"
                        align="center"
                      />
                      <el-table-column
                        prop="department"
                        label="部门"
                        width="100"
                        align="center"
                      />
                      <el-table-column
                        prop="addtime"
                        label="参加时间"
                        width="120"
                        align="center"
                      />
                      <el-table-column
                        prop="finish_time"
                        label="完成时间"
                        width="120"
                        align="center"
                      />
                      <el-table-column
                        prop="credit"
                        label="获得学分"
                        width="80"
                        align="center"
                      />
                      <el-table-column
                        prop="sign"
                        label="签到"
                        width="80"
                        class-name="sign"
                        align="center"
                      >
                        <template slot-scope="scope">
                          <img :src="scope.row.sign">
                        </template>
                      </el-table-column>
                      <el-table-column
                        label="操作"
                        fixed="right"
                        width="160"
                        align="center"
                      >
                        <template slot-scope="scope">
                          <el-button
                            @click="handleViewLearning(scope.$index, scope.row)"
                            size="mini"
                            type="text"
                          >
                            查看
                          </el-button>
                          <el-button
                            @click="handleDeleteLearning(scope.$index, scope.row)"
                            size="mini"
                            type="text"
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
                    <div style="text-align: right;">
                      <el-button @click="handleExportStudentCourse" size="small" type="success">
                        导出项目详情报表
                      </el-button>
                    </div>

                    <ex-table ref="projectStudentCourse_exTable" :data="projectStudentCourseTableData" :reload-method="handleProjectStudentCourseReload" show-pagination stripe>
                      <el-table-column
                        prop="student_name"
                        label="姓名"
                        width="90"
                        fixed="left"
                      />
                      <el-table-column
                        prop="number"
                        label="编号"
                        width="90"
                        align="center"
                      />
                      <el-table-column
                        prop="student_status"
                        label="状态"
                        width="60"
                        align="center"
                      />
                      <el-table-column
                        prop="department"
                        label="部门"
                        width="80"
                        align="center"
                      />
                      <el-table-column
                        prop="lesson_name"
                        label="课程"
                        width="180"
                        show-overflow-tooltip
                      />
                      <el-table-column
                        prop="lesson_source"
                        label="课程来源"
                        width="80"
                        align="center"
                      />
                      <el-table-column
                        prop="lesson_status"
                        label="课程状态"
                        width="80"
                        align="center"
                      />
                      <el-table-column
                        prop="start_time"
                        label="开始时间"
                        width="100"
                        align="center"
                      />
                      <el-table-column
                        prop="minute"
                        label="学习时长(分钟)"
                        width="120"
                        align="center"
                      />
                      <el-table-column
                        prop="completion_percent"
                        label="学习进度(%)"
                        width="120"
                        align="center"
                      />
                      <el-table-column
                        prop="finish_time"
                        label="考试完成时间"
                        width="120"
                        align="center"
                      />
                      <el-table-column
                        prop="score"
                        label="考试"
                        width="80"
                        align="center"
                      />
                      <el-table-column
                        prop="reset_score"
                        label="补考"
                        width="80"
                        align="center"
                      />
                      <el-table-column
                        prop="credit"
                        label="获得学分"
                        width="80"
                        align="center"
                      />
                    </ex-table>
                  </div>
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>
        </el-col>
        <el-col :span="6" style="height:100%">
          <div class="sideBar">
            <div class="inner">
              <h3>
                <span>学分排行</span>
                <el-button @click="handleExportRanking" type="text">
                  导出报表
                </el-button>
              </h3>
              <ul>
                <li class="title">
                  <span><i>0</i>姓名</span><span>完成课程</span><span>学分</span>
                </li>
                <li v-for="(item, index) in creditRanking" class="item">
                  <span><i :class="`color_${index+1}`">{{ index + 1 }}</i>{{ item.student_name }}</span><span>{{ item.lesson_count }}</span><span>{{ item.credit }}</span>
                </li>
              </ul>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-main>
    <el-dialog
      :visible.sync="learningDetailDialogVisible"
      title="学习详情"
      width="40%"
    >
      <div class="studentInfo">
        <div class="name">
          <span>{{ learningDetailDialog.currentStudent }}</span>
        </div>
        <div class="info">
          总共学习课程<span class="red">{{ learningDetailDialog.lessonTotal }}</span>门，完成课程<span class="red">{{ learningDetailDialog.lessonFinish }}</span>门，获得学分<span class="red">{{ learningDetailDialog.credit }}</span>分
        </div>
      </div>
      <div class="exTable">
        <ex-table
          ref="studentLearning_exTable"
          :header-cell-style="{background:'#fafafa',color:'#909399'}"
          @selection-change="handleSelectionChange"
          :data="studentLearningTableData"
          :reload-method="handleStudentLearningReload"
          :show-pagination="false" stripe
        >
          <el-table-column
            type="selection"
            width="55"
          />
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
            label="考试"
            width="70"
            align="center"
          />
          <el-table-column
            prop="retest_score"
            label="补考"
            width="70"
            align="center"
          />
          <el-table-column
            prop="credit"
            label="获得学分"
            width="90"
            align="center"
          />
        </ex-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="learningDetailDialogVisible = false">关闭</el-button>
        <el-button @click="resetExamination" :disabled="learningDetailDialog.lessonSelected.length === 0" type="primary">重置考试</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>
<script>

import {
  getProjectDetails,
  getProjectStudents,
  getProjectStudentCourse,
  getStudentLearning,
  deleteProjectStudent,
  resetExamination,
  exportStudentForm,
  exportStudentCourseForm,
  exportCreditRankingForm,
  getCreditRanking,
  getProjectChartData
} from '@/request/api'
import AsideMenu from '@/components/asideMenu'
import ExTable from '@/components/exTable.js'
import { GetUrlParam } from '@/utility'
import 'echarts/lib/chart/bar'
// import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
export default {
  components: {
    AsideMenu,
    ExTable
  },
  data () {
    let dataX = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
    let dataJoin = [12, 14]
    let dataComplete = [5, 8]
    // let dataX = []
    // let dataJoin = []
    // let dataComplete = []
    // this.remoteChartData.map(_ => {
    //   return _.month + '月'
    // })
    // let dataJoin = this.remoteChartData.map(_ => {
    //   return _.join_num
    // })
    // let dataComplete = this.remoteChartData.map(_ => {
    //   return _.finish_num
    // })
    return {
      barData: {
        // title: {
        //   text: '某地区蒸发量和降水量',
        //   subtext: '纯属虚构'
        // },
        color: ['#ef6520', '#23e8cc'],
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['参与人数', '完成人数']
        },
        // toolbox: {
        //   show: true,
        //   feature: {
        //     mark: { show: true },
        //     dataView: { show: true, readOnly: false },
        //     magicType: { show: true, type: ['line', 'bar'] },
        //     restore: { show: true },
        //     saveAsImage: { show: true }
        //   }
        // },
        // calculable: true,
        xAxis: [
          {
            type: 'category',
            data: dataX
          }
        ],
        yAxis: [
          {
            max: 100,
            // min:0,
            type: 'value',
            minInterval: 0,
            interval: 20 // 每次增加几个
          }
        ],
        series: [
          {
            name: '参与人数',
            type: 'bar',
            data: dataJoin
          },
          {
            name: '完成人数',
            type: 'bar',
            data: dataComplete
          }
        ]
      },
      activeName: 'projectStudent',
      projectDetails: '', // 项目详情
      projectStudentTableData: [], // 项目参训学员远程数据
      projectStudentCourseTableData: [], // 项目详情远程数据
      studentLearningTableData: [], // 学生学习详情远程数据
      learningDetailDialogVisible: false,
      learningDetailDialog: {
        currentStudent: '',
        lessonTotal: 0,
        lessonFinish: 0,
        credit: 0,
        lessonSelected: [] // 已选择的学员学习课程，重置考试
      },
      currentStudentId: '', // 学习详情的当前学员的ID
      studentTableData: [],
      pager: {
        currentPage: 1,
        pageSize: 10,
        total: 100
      },
      creditRanking: [], // 学分排行远程数据
      remoteChartData: '',
      ranking: [{ name: 'saad', lesson: '孙子兵法', credit: '90' }, { name: 'saad', lesson: '孙子兵法', credit: '90' }, { name: 'saad', lesson: '孙子兵法', credit: '90' }, { name: 'saad', lesson: '孙子兵法', credit: '90' }, { name: 'saad', lesson: '孙子兵法', credit: '90' }]
    }
  },
  computed: {

  },
  watch: {
  },
  mounted: function () {
    this.initData()
  },
  methods: {
    initData () {
      getProjectDetails({ id: GetUrlParam('id') }).then(res => {
        this.projectDetails = res.data
      })
      getCreditRanking({ camp_id: GetUrlParam('id'), offset: 1, limit: 5 }).then(res => {
        this.creditRanking = res.data.list
      })
      getProjectChartData({ camp_id: GetUrlParam('id') }).then(res => {
        this.remoteChartData = res.data
        this.barData.xAxis[0].data = this.remoteChartData.map(_ => {
          return _.month + '月'
        })
        this.barData.series[0].data = this.remoteChartData.map(_ => {
          return _.join_num
        })
        this.barData.series[1].data = this.remoteChartData.map(_ => {
          return _.finish_num
        })
      })
      this.fetchProjectStudentRemoteData()
      this.fetchProjectStudentCourseRemoteData()
    },
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
      // let paginationObj = pagination || this.$refs.studentLearning_exTable.pagination
      getStudentLearning(param).then(res => {
        this.studentLearningTableData = res.data.list
        this.learningDetailDialog.lessonTotal = res.data.lesson_total
        this.learningDetailDialog.lessonFinish = res.data.lesson_finish_num
        this.learningDetailDialog.credit = res.data.credit_total
        // paginationObj.total = res.data.total
      })
    },
    handleViewLearning (index, row) { // 查看学员学习
      this.learningDetailDialogVisible = true
      this.currentStudentId = row.student_id
      this.learningDetailDialog.currentStudent = row.student_name
      this.$nextTick(() => {
        this.fetchStudentLearningRemoteData()
      })
    }, //
    handleDeleteLearning (index, row) { // 删除学员
      this.$confirm('确认删除？')
        .then(_ => {
          deleteProjectStudent({ camp_id: GetUrlParam('id'), student_id: [row.student_id] }).then(res => {
            this.$message.success(res.message)
            this.initData()
          })
        })
    },
    handleExportRanking () { // 学分排行导出
      exportCreditRankingForm({ camp_id: GetUrlParam('id') }).then(res => {
        window.location.href = res.data.url
      })
    },
    handleExportStudent () { // 导出学员报表
      exportStudentForm({ camp_id: GetUrlParam('id') }).then(res => {
        window.location.href = res.data.url
      })
    },
    handleExportStudentCourse () { // 导出项目详情报表
      exportStudentCourseForm({ camp_id: GetUrlParam('id') }).then(res => {
        window.location.href = res.data.url
      })
    },
    handleSelectionChange (val) { // 处理学员学习课程重置考试
      this.learningDetailDialog.lessonSelected = val
    },
    resetExamination () { // 重置考试
      let lesson = this.learningDetailDialog.lessonSelected.map(item => {
        return item.lesson_id
      })
      resetExamination({ student_id: this.currentStudentId, lesson_id: lesson }).then(res => {
        this.$message.success(res.message)
      })
    }
  }
}
</script>
<style lang="scss">
  .page-projectDetails{
    &.el-container.main-content .el-aside {dl{ height:calc(100% - 50px);}}
    .el-main{
      .main{
        width:99%;
        margin: 0 auto 10px;
        box-shadow: 0px 2px 5px #888888;
        height:calc(100% - 50px);
        .center{ margin-top: 5px;   padding: 15px;}
        border-right:1px solid #ededed;
        padding: 0 0px 0 0;
        h2{ font-size: 22px}
        .pieces{font-size: 12px; padding: 15px 0;color:#666666;display:flex;justify-content: space-between;
          span{ font-size: 14px}
        .right{ line-height: 24px}
        }
        .operate-btn{text-align: right}
        .table-list{ margin: 20px 0}
        .sign img{width:40px}

      }
      .sideBar{
        height:calc(100% - 50px);padding: 0;
        .inner{
          h3{display: flex;justify-content: space-between; line-height: 36px}
          padding: 10px;
          margin: 5px;
          box-shadow: 0px 2px 5px #888888;
          height:100%;
        }
        /*.el-button{ margin-left: 100px}*/
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
    .exTable{
      .el-table{
        /*min-height: 320px;*/
      }
      .el-table__fixed,.el-table__fixed-right{box-shadow:none}
      .el-pagination{margin: 20px 0 50px;text-align: right}
    }

    .studentInfo{
      margin-bottom: 10px;
      display: flex;justify-content: space-between;
      .name{span{font-size: 20px;color:#666;padding-left: 10px}}
      .info{span{padding: 0 10px}}
    }
  }
  .vueChart{
    width:730px;
    height:300px;
    .echarts {
      width: 100%;
      height: 100%;
    }
  }

</style>
