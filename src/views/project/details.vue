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
                  <span class="c666">参与总数:</span>  123
                </el-tag>
                <el-tag effect="plain" size="small">
                  <span class="c666">完成总数:</span>  98
                </el-tag>
              </div>

              <div class="right">
                开始时间：2019-05-21 结束时间：2019-05-21
              </div>
            </div>
            <div class="lineChart" />
            <div class="operate-btn">
              <el-button @click="handleStudentStats" size="small" type="success">
                学员报表
              </el-button>
              <el-button @click="handleTrainingDetail" size="small" type="primary">
                详情报表
              </el-button>
            </div>
            <div class="table-list">
              <div class="exTable">
                <ex-table ref="exTable" :data="paperTableData" :reload-method="handleReload" show-pagination stripe>
                  <el-table-column
                    prop="name"
                    label="姓名"
                    width="150"
                  />
                  <el-table-column
                    prop="start_time"
                    label="参加时间"
                    width="150"
                  />
                  <el-table-column
                    prop="end_time"
                    label="完成时间"
                    width="150"
                  />
                  <el-table-column
                    prop="credit"
                    label="获得学分"
                    width="150"
                  />
                  <el-table-column
                    label="操作"
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
              <!--              <el-table-->
              <!--                :data="studentTableData"-->
              <!--                stripe-->
              <!--                style="width: 100%"-->
              <!--              >-->
              <!--                <el-table-column-->
              <!--                  prop="name"-->
              <!--                  label="姓名"-->
              <!--                  width="160"-->
              <!--                />-->
              <!--                <el-table-column-->
              <!--                  prop="start_time"-->
              <!--                  label="参加时间"-->
              <!--                  width="160"-->
              <!--                />-->
              <!--                <el-table-column-->
              <!--                  prop="end_time"-->
              <!--                  label="完成时间"-->
              <!--                  width="160"-->
              <!--                />-->
              <!--                <el-table-column-->
              <!--                  prop="credit"-->
              <!--                  label="获得学分"-->
              <!--                  width="160"-->
              <!--                />-->
              <!--                <el-table-column label="操作">-->
              <!--                  <template slot-scope="scope">-->
              <!--                    <el-button-->
              <!--                      @click="handleViewLearning(scope.$index, scope.row)"-->
              <!--                      size="mini"-->
              <!--                    >-->
              <!--                      查看-->
              <!--                    </el-button>-->
              <!--                    <el-button-->
              <!--                      @click="handleDeleteLearning(scope.$index, scope.row)"-->
              <!--                      size="mini"-->
              <!--                      type="danger"-->
              <!--                    >-->
              <!--                      删除-->
              <!--                    </el-button>-->
              <!--                  </template>-->
              <!--                </el-table-column>-->
              <!--              </el-table>-->
            </div>
            <!--            <div class="pager">-->
            <!--              <el-pagination-->
            <!--                @size-change="handleSizeChange"-->
            <!--                @current-change="handleCurrentChange"-->
            <!--                :current-page="pager.currentPage"-->
            <!--                :page-sizes="[10, 20, 50]"-->
            <!--                :page-size="pager.pageSize"-->
            <!--                :total="pager.total"-->
            <!--                layout="total, sizes, prev, pager, next, jumper"-->
            <!--              />-->
            <!--            </div>-->
          </div>
        </el-col>
        <el-col :span="6">
          <div class="sideBar">
            <h3>
              学分排行<el-button @click="handleViewRanking" type="text">
                查看报表
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
      :visible.sync="studentStatsDialogVisible"
      title="学员报表"
      width="70%"
    >
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="studentStatsDialogVisible = false">取 消</el-button>
        <el-button @click="studentStatsDialogVisible = false" type="primary">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      :visible.sync="trainingDetailsDialogVisible"
      title="详情报表"
      width="70%"
    >
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="trainingDetailsDialogVisible = false">取 消</el-button>
        <el-button @click="trainingDetailsDialogVisible = false" type="primary">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      :visible.sync="learningDetailDialogVisible"
      title="学习详情"
      width="70%"
    >
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="learningDetailDialogVisible = false">取 消</el-button>
        <el-button @click="learningDetailDialogVisible = false" type="primary">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      :visible.sync="rankingDialogVisible"
      title="学分排行"
      width="70%"
    >
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="rankingDialogVisible = false">取 消</el-button>
        <el-button @click="rankingDialogVisible = false" type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>
<script>

// import { getProjectDetails } from '@/request/api'
import AsideMenu from '@/components/asideMenu'
import ExTable from '@/components/exTable.js'
export default {
  components: {
    AsideMenu,
    ExTable
  },
  data () {
    return {
      studentStatsDialogVisible: false,
      trainingDetailsDialogVisible: false,
      rankingDialogVisible: false,
      learningDetailDialogVisible: false,
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
        { name: '首页', path: '/' }, { name: '培训统计', path: '/trainStatistics' }, { name: '培训统计详情', path: '/trainStatistics/details' }
      ] })
  },
  methods: {
    handleReload (pagination, { currentPage, pageSize }) {
      this.fetchRemoteData(pagination, currentPage, pageSize)
    },
    fetchRemoteData (pagination, currentPage, pageSize) {
      // let param = {
      //   keyword: this.keyword,
      //   offset: currentPage || 1,
      //   limit: pageSize || 10
      // }
      // let paginationObj = pagination || this.$refs.exTable.pagination
      // getExaminationPaperList(param).then(res => {
      //   this.paperTableData = res.data.list
      //   paginationObj.total = res.data.total
      // })
    },
    handleStudentStats () {
      this.studentStatsDialogVisible = true
    },
    handleTrainingDetail () {
      this.trainingDetailsDialogVisible = true
    },
    handleViewRanking () {
      this.rankingDialogVisible = true
    },
    handleViewLearning (index, row) {
      this.learningDetailDialogVisible = true
    },
    handleDeleteLearning (index, row) {
      this.$confirm('确认删除？')
        .then(_ => {
          // do something
        })
        .catch(_ => {

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
