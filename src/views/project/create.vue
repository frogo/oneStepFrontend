<template lang="html">
  <el-main class="page-projectCreate">
    <h2 class="pageName">
      创建项目
    </h2>
    <el-form ref="createForm" :model="createForm" :rules="rules" label-width="100px" class="createForm">
      <div class="head-line">
        <span class="base-info">基本信息</span>
      </div>
      <el-form-item label="项目名称" prop="projectName">
        <el-input v-model="createForm.projectName" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="项目周期" prop="projectCycle">
        <el-date-picker
          v-model="createForm.projectCycle"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </el-form-item>
      <el-form-item label="参训对象" prop="participants">
        <el-input v-model="createForm.participants" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="目标人数" prop="number">
        <el-input v-model="createForm.number" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="项目简介" prop="intro">
        <el-input
          :rows="4"
          v-model="createForm.intro"
          type="textarea"
          placeholder="请输入内容"
        />
      </el-form-item>
      <div class="head-line">
        <span class="base-info">学习内容</span>
      </div>
      <el-form-item class="chooseCourse">
        <div class="btn-box">
          <el-button @click="chooseCourseDialogVisible = true" size="mini" type="primary">
            选择课程
          </el-button>
          <span>已选课程数 <i>{{ courseSelected.length }}</i> 总学分 <i>336</i> 总课时 <i>32</i></span>
        </div>
        <div class="list">
          <el-table
            :data="selectedCourseTableData"
            style="width: 100%"
          >
            <el-table-column
              prop="date"
              label="课堂"
            />
            <el-table-column
              prop="name"
              label="讲师"
              width="260"
            />
            <el-table-column
              prop="address"
              label="学分（分）"
              width="260"
            />
            <el-table-column
              prop="address"
              label="课时（分钟）"
              width="260"
            />
          </el-table>
        </div>
      </el-form-item>
      <div class="head-line">
        <span class="base-info">项目设置
          <el-popover
            placement="top-start"
            title="标题"
            width="200"
            trigger="hover"
            content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
          >
            <i slot="reference" class="el-icon-question" />
          </el-popover>
        </span>
      </div>
      <el-form-item class="setting">
        <div class="box">
          <span class="item">学员认证
            <el-switch
              v-model="createForm.auth"
              active-color="#EF6520"
              inactive-color="gray"
            /></span>
          <span class="item">手写签到
            <el-switch
              v-model="createForm.sign"
              active-color="#EF6520"
              inactive-color="gray"
            /></span>
          <span class="item">报名审批
            <el-switch
              v-model="createForm.approval"
              active-color="#EF6520"
              inactive-color="gray"
            /></span>
        </div>
        <div class="box">
          <span class="item">参训口令 <el-switch
            v-model="createForm.passwordSwitch"
            active-color="#EF6520"
            inactive-color="gray"
          /> <el-input v-if="createForm.passwordSwitch" v-model="createForm.password" placeholder="请输入口令" size="small" style="width:160px; margin-left: 10px" /></span>

          <span class="item w500">指定参训人员 <el-switch
            v-model="createForm.studentsSwitch"
            active-color="#EF6520"
            inactive-color="gray"
          />
            <span v-if="createForm.studentsSwitch">
              <el-button @click="chooseStudentsDialogVisible = true" size="small" type="primary">选择</el-button>
              已选择参数人员<span class="red">138</span>人
            </span>

          </span>
        </div>
      </el-form-item>
    </el-form>
    <div class="operation-bar">
      <el-button @click="handleSaveProjectDraft" type="success">
        保存草稿
      </el-button>
      <el-button @click="handleSaveProject" type="primary">
        完成
      </el-button>
    </div>
    <el-dialog
      :visible.sync="chooseStudentsDialogVisible"
      title="指定学员"
      custom-class="chooseStudents"
    >
      <el-transfer v-model="transferValue" :data="studentsTransferData" :titles="['姓名 - 工号 - 部门', '姓名 - 工号 - 部门']" filterable>
        <span slot-scope="{ option }">{{ option.name }} - {{ option.no }} - {{ option.dept }}</span>
      </el-transfer>
      <span slot="footer" class="dialog-footer">
        <el-button @click="chooseStudentsDialogVisible = false">取 消</el-button>
        <el-button @click="handleStudentOk" type="primary">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :visible.sync="chooseCourseDialogVisible"
      title="课程选择"
      class="chooseCourse"
      width="80%"
    >
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
          <el-form-item label="来源：">
            <el-radio-group v-model="filterForm.from">
              <el-radio :label="item" v-for="item in tags.from" :key="item" border />
            </el-radio-group>
          </el-form-item>
          <el-form-item label="状态：">
            <el-radio-group v-model="filterForm.status">
              <el-radio :label="item" v-for="item in tags.status" :key="item" border />
            </el-radio-group>
          </el-form-item>
          <el-form-item label="系列：">
            <el-radio-group v-model="filterForm.series">
              <el-radio :label="item" v-for="item in tags.series" :key="item" border />
            </el-radio-group>
          </el-form-item>

          <el-form-item label="层级：">
            <el-checkbox-group v-model="filterForm.level">
              <el-checkbox-button :label="item" v-for="item in tags.level" :key="item" name="type" />
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="职能：">
            <el-checkbox-group v-model="filterForm.department">
              <el-checkbox-button :label="item" v-for="item in tags.department" :key="item" name="type" />
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="自定：">
            <el-checkbox-group v-model="filterForm.custom">
              <el-checkbox-button :label="item" v-for="item in tags.custom" :key="item" name="type" />
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </div>
      <div class="exTable">
        <ex-table
          ref="exTableCourse"
          :data="courseTableData"
          @selection-change="handleSelectionChange"
          @select="handleCourseClick"
          :reload-method="handleReload"
          tooltip-effect="dark"
          show-pagination stripe
        >
          <el-table-column
            type="selection"
            width="55"
          />
          <el-table-column
            prop="name"
            label="课程"
          />
          <el-table-column
            prop="id"
            label="id"
            width="100"
          />
          <el-table-column
            prop="teacher_info.name"
            label="讲师"
            width="150"
          />
          <el-table-column
            prop="credit"
            label="学分"
            width="150"
          />
          <el-table-column
            prop="minutes"
            label="课时"
            width="150"
          />
        </ex-table>
      </div>
      <!--      <el-table-->
      <!--        ref="multipleTable"-->
      <!--        :data="courseTableData"-->
      <!--        @selection-change="handleSelectionChange"-->
      <!--        tooltip-effect="dark"-->
      <!--        style="width: 100%"-->
      <!--      >-->
      <!--        <el-table-column-->
      <!--          type="selection"-->
      <!--          width="55"-->
      <!--        />-->
      <!--        <el-table-column-->
      <!--          prop="name"-->
      <!--          label="课程"-->
      <!--        />-->
      <!--        <el-table-column-->
      <!--          prop="teacher_info.name"-->
      <!--          label="讲师"-->
      <!--          width="150"-->
      <!--        />-->
      <!--        <el-table-column-->
      <!--          prop="credit"-->
      <!--          label="学分"-->
      <!--          width="150"-->
      <!--        />-->
      <!--        <el-table-column-->
      <!--          prop="minutes"-->
      <!--          label="课时"-->
      <!--          width="150"-->
      <!--        />-->
      <!--      </el-table>-->
      <!--      <div class="pager">-->
      <!--        <el-pagination-->
      <!--          @size-change="handleSizeChange"-->
      <!--          @current-change="handleCurrentChange"-->
      <!--          :current-page="pager.currentPage"-->
      <!--          :page-sizes="[10, 20, 50]"-->
      <!--          :page-size="pager.pageSize"-->
      <!--          :total="pager.total"-->
      <!--          layout="total, sizes, prev, pager, next, jumper"-->
      <!--        />-->
      <!--      </div>-->
      <div class="selected-block">
        <div class="operator">
          <el-badge :value="courseSelected.length">
            <el-button @click="courseSelectedBoxShow = !courseSelectedBoxShow" size="small">
              已添加  <i v-if="courseSelectedBoxShow" class="el-icon-arrow-up" />
              <i v-else class="el-icon-arrow-down" />
            </el-button>
          </el-badge>
        </div>
        <transition name="myBox">
          <div v-show="courseSelectedBoxShow" class="box">
            <el-tag
              v-for="(item, index) in courseSelected"
              :key="item.name + index"
              @close="handleDeleteCourseSelected(item)"
              closable
              size="small"
              effect="plain"
            >
              {{ item.name }} {{ item.id }}
            </el-tag>
          </div>
        </transition>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="chooseCourseDialogVisible = false">取 消</el-button>
        <el-button @click="chooseCourseDialogVisible = false" type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </el-main>
</template>
<script>
// import { mapState, mapMutations } from 'vuex'
import { getCourseList } from '@/request/api'
import ExTable from '@/components/exTable.js'
export default {
  components: {
    ExTable
  },
  data () {
    const generateData = _ => {
      const data = []
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: i,
          name: '张三风',
          no: '2008190',
          dept: '技术部'
        })
      }
      return data
    }
    return {
      studentsTransferData: generateData(),
      transferValue: [],
      createForm: {
        projectName: '',
        projectCycle: '',
        participants: '',
        number: '',
        intro: '',

        auth: false,
        sign: false,
        approval: false,
        passwordSwitch: false,
        password: '',
        studentsSwitch: false,
        students: ''

      },
      rules: {
        projectName: [
          { required: true, message: '请输入项目名称', trigger: 'blur' }
        ],
        projectCycle: [
          { required: true, message: '请指定项目周期', trigger: 'blur' }
        ],
        participants: [
          { required: true, message: '请输入参训对象', trigger: 'blur' }
        ],
        number: [
          { required: true, message: '请输入目标人数', trigger: 'blur' }
        ]
      },
      // 试题弹窗
      selectedCourseTableData: [],
      chooseStudentsDialogVisible: false,
      chooseCourseDialogVisible: false,
      // 课程弹窗
      keyword: '',
      filterForm: {
        from: '全部',
        status: '全部',
        series: '全部',
        level: [],
        department: [],
        custom: []
      },
      tags: {
        from: ['全部', '外部', '内部'],
        status: ['全部', '状态1', '状态2', '状态3'],
        series: ['全部', '系列1', '系列2', '系列3'],
        level: ['层级1', '层级2', '层级3'],
        department: ['职能1', '职能2', '职能3'],
        custom: ['职能1', '职能2', '职能3']
      },
      courseTableData: [], // 课程表格数据
      courseSelected: [], // 已选择课程
      courseChecked: [], // 当前页面选择的课程数据
      courseSelectedBoxShow: false
      // pager: {
      //   currentPage: 1,
      //   pageSize: 10,
      //   total: 100
      // }
    }
  },
  computed: {
    addCourseParam: function () {
      return {
        name: this.createForm.courseName,
        minutes: this.createForm.hours,
        credit: this.createForm.credit,
        obj: this.createForm.audience,
        target: this.createForm.target,
        tags: this.createForm.tags,
        introduction: this.createForm.intro
      }
    }
    // getCourseListParam: function () {
    //   let tags = this.filterForm.level.concat(this.filterForm.department, this.filterForm.custom)
    //   tags.push(this.filterForm.from, this.filterForm.series, this.filterForm.status)
    //   return {
    //     keyword: this.keyword,
    //     tag_id: tags,
    //     offset: this.currentPage,
    //     limit: this.pageSize
    //   }
    // }
  },
  watch: {
    filterForm: {
      handler (newVal, oldVal) {
        this.fetchRemoteData()
      },
      deep: true
    }
  },
  mounted: function () {
    this.$store.commit('$_setBreadCrumb', { isShow: true,
      list: [
        { name: '首页', path: '/' }, { name: '培训项目管理', path: '/project' }, { name: '创建项目', path: '/project/create' }
      ] })
    this.getCourseList()
  },
  methods: {
    handleReload (pagination, { currentPage, pageSize }) {
      this.fetchRemoteData(pagination, currentPage, pageSize)
    },
    fetchRemoteData (pagination, currentPage, pageSize) {
      let tags = this.filterForm.level.concat(this.filterForm.department, this.filterForm.custom)
      tags.push(this.filterForm.from, this.filterForm.series, this.filterForm.status)
      let param = {
        keyword: this.keyword,
        tag_id: tags,
        offset: currentPage || 1,
        limit: pageSize || 10
      }
      let paginationObj = pagination || this.$refs.exTableCourse.pagination
      getCourseList(param).then(res => {
        this.courseTableData = res.data.list
        paginationObj.total = res.data.total

        this.courseTableData.map(item => { // 手动选题模式 点击题库，加载试题 遍历 已有试题数据  回显
          // console.log(item.id)
          this.courseSelected.map(cItem => {
            if (item.id === cItem.id) {
              // console.log('---------')
              this.$nextTick(() => {
                this.$refs.exTableCourse.toggleRowSelection(item, true)
              })
            }
          })
        })
      })
    },
    getCourseList () {
      let param = this.getCourseListParam
      // console.log(param)
      getCourseList(param).then(res => {
        this.courseTableData = res.data.list
        this.total = res.data.total
      }, error => {
        error && this.$message.error(error.message)
      })
    },
    handleSaveProjectDraft () {
    },
    handleSaveProject () {
    },
    handleSearch () {
      this.fetchRemoteData()
    },
    handleSelectionChange (val) { // 表格多选
      this.courseChecked = val
    },
    handleDeleteCourseSelected (item) { // 删除已选
      this.courseSelected.splice(this.getItemIndex(this.courseSelected, item), 1)
      let courseCheckedIndex = this.getItemIndex(this.courseChecked, item) // 判断删除的试题是否在列表中且被选中
      if (courseCheckedIndex !== -1) {
        let courseTableDataIndex = this.getItemIndex(this.courseTableData, item)
        this.$nextTick(() => {
          this.$refs.exTableCourse.toggleRowSelection(this.courseTableData[courseTableDataIndex], false)
        })
      }
    },
    handleCourseClick (selection, row) { //  点击checkbox事件,添加试题
      if (this.getItemIndex(this.courseSelected, row) === -1) {
        this.courseSelected.push(row)
      } else {
        this.courseSelected.splice(this.getItemIndex(this.courseSelected, row), 1)
      }
    },
    getItemIndex (list, item) { // 根据id获取index
      let itemIndex = -1
      list.map((i, index, array) => {
        if (i.id === item.id) {
          itemIndex = index
        }
      })
      return itemIndex
    },
    handleStudentOk () {
      this.chooseStudentsDialogVisible = false
      // console.log(this.transferValue)
    }
  }
}
</script>
<style lang="scss">
  .page-projectCreate{
    box-shadow: 0px 0px 5px #888888;
    margin: 0 auto 20px;
    padding: 20px;
    h2.pageName{font-size: 26px}
    .el-form.createForm{
      .head-line{margin: 25px 0;height:1px;position:relative;background:#f3f3f3;
        span.base-info{display: inline-block;position: absolute;top:-10px;background: #fff;padding-right: 1em;color:#EF6520}
        i{color:#8c939d;}
      }
      .el-input{width:55%}
      .el-input.w200{width:200px}
      .el-textarea{width:400px}
      .chooseCourse{
        .btn-box{display: flex;justify-content: space-between;span{i{color:red;font-style: normal}}}

      }
      .setting{
        div.box {
          margin-top: 20px;
          display: flex;justify-content:flex-start;
           span.item{ display: inline-block;width:300px;&.w500{width:500px}.el-button{ margin: 0 20px}}
          &.second{span.item{width:500px}}
        }
      }
    }
    .operation-bar{
      margin: 100px 0 50px;
      display: flex;justify-content:center;
      .el-button{width:100px}
    }

    .chooseStudents{
      width:800px;
      .el-transfer{
        margin: 0 auto;
        .el-transfer-panel{width:320px}
      }
    }
    .chooseCourse{
      min-width:900px;
      .exTable{
        .el-pagination{margin-top: 20px;text-align: right}
          .el-table th:first-child{
            .cell{display: none}
        }
      }
      .filter-box{
        position: relative;
        margin: 20px 0;
        .el-form{
          .el-form-item{border-bottom: 1px dashed #ccc;padding-bottom: 10px; margin-bottom: 10px;
            &.keyword-input{      border-bottom: none;}
          }
        }
        .el-radio__input{display:none}
        .el-radio__label{padding-left: 6px}
        .el-checkbox-button__inner{padding: 8px 15px}
        .keyword-input{
          margin-bottom: 10px;
          .el-input{width:300px}
        }
        .el-radio{ margin-right: 0}
        .add-button{position: absolute;right:0;top:0}
      }
      .selected-block{
        box-shadow: 0px -12px 10px -10px #888888;
        padding: 10px;
        border: 1px solid #efefef;
        border-radius: 5px 5px 0 0 ;
        width:100%;
        height:auto;
        position: absolute;
        left:0;bottom:0;background:#fff;z-index: 2;
        .operator{position: absolute;top:-30px;left:45%}
        .box{
          height:200px;
          overflow: hidden
        }
        .myBox-leave-active,.myBox-enter-active{
          transition:  all 1s ease
        }
        .myBox-leave-active,.myBox-enter{
          height:0px !important
        }
        .myBox-leave,.myBox-enter-active{
          height: 200px
        }
        .el-tag{ margin-right: 10px}
      }
      /*.pager{ margin: 30px 20px; text-align: right}*/
    }
  }
</style>
