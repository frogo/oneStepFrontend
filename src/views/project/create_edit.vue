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
          value-format="yyyy-MM-dd"
        />
      </el-form-item>
      <el-form-item label="参训对象" prop="participants">
        <el-input v-model="createForm.participants" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="目标人数" prop="number">
        <el-input v-model.number="createForm.number" placeholder="请输入" />
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
          <el-button @click="openCourseChooseDialog" size="mini" type="primary">
            课程设置
          </el-button>
          <span>已选课程数 <i>{{ dialogCourse.selectedData.length }}</i> 总学分 <i>{{ dialogCourse.courseChooseTotal.credit }}</i> 总课时 <i>{{ dialogCourse.courseChooseTotal.hours }}</i></span>
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
              <el-button @click="handleStudentDialogOpen" size="small" type="primary">{{ editMode ? '重新指定' : '设置' }}</el-button>
              已选择参数人员<span class="red">{{ dialogStudents.transferSelectedData.length }}</span>人
            </span>

          </span>
        </div>
      </el-form-item>
    </el-form>
    <div class="operation-bar">
      <el-button @click="handleSaveProjectDraft('createForm')" type="success">
        保存草稿
      </el-button>
      <el-button @click="handleSaveProject('createForm')" type="primary">
        完成
      </el-button>
    </div>
    <el-dialog
      :visible.sync="dialogStudents.visible"
      title="设置参训人员"
      custom-class="chooseStudents"
    >
      <el-transfer
        v-model="dialogStudents.transferSelectedData" :data="dialogStudents.transferData"
        :filter-method="studentFilterMethod"
        :props="{
          key: 'id',
          label: 'name'
        }"
        :titles="['编号 - 姓名 - 部门', '编号 - 姓名 - 部门']" filter-placeholder="请输入学员名称" filterable
      >
        <span slot-scope="{ option }">{{ option.number }} - {{ option.name }} - {{ option.department }}</span>
      </el-transfer>
      <span slot="footer" class="dialog-footer">
        <!--        <el-button @click="dialogStudents.visible = false">取 消</el-button>-->
        <el-button @click="dialogStudents.visible = false" type="primary">关闭</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :visible.sync="dialogCourse.visible"
      title="课程设置"
      class="chooseCourse"
      width="80%"
    >
      <div class="filter-box">
        <div class="keyword-input">
          <el-input
            v-model="dialogCourse.keyword"
            @keyup.enter.native="handleSearch"
            placeholder="请输入内容"
            size="medium "
          >
            <i slot="suffix" @click="handleSearch" class="el-input__icon el-icon-search" />
          </el-input>
        </div>
        <el-form ref="filterForm" :model="dialogCourse.filterForm" label-width="60px" size="mini">
          <el-form-item label="来源：">
            <el-radio-group v-model="dialogCourse.filterForm.from">
              <el-radio label="all" border>
                全部
              </el-radio>
              <el-radio :label="item.value" v-for="(item, index) in dialogCourse.tags.source" :key="item.name + index" border>
                {{ item.name }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="状态：">
            <el-radio-group v-model="dialogCourse.filterForm.status">
              <el-radio label="all" border>
                全部
              </el-radio>
              <el-radio :label="item.value" v-for="(item, index) in dialogCourse.tags.status" :key="item.name + index" border>
                {{ item.name }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <!--          <el-form-item label="层级：">-->
          <!--            <el-checkbox-group v-model="dialogCourse.filterForm.level">-->
          <!--              <el-checkbox-button :label="item.id" v-for="(item, index) in dialogCourse.tags.level" :key="item + index">-->
          <!--                {{ item.name }}-->
          <!--              </el-checkbox-button>-->
          <!--            </el-checkbox-group>-->
          <!--          </el-form-item>-->
          <el-form-item label="职能：">
            <el-checkbox-group v-model="dialogCourse.filterForm.department">
              <el-checkbox-button :label="item.id" v-for="(item, index) in dialogCourse.tags.department" :key="item + index">
                {{ item.name }}
              </el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="自定：">
            <el-checkbox-group v-model="dialogCourse.filterForm.custom">
              <el-checkbox-button :label="item.id" v-for="(item, index) in dialogCourse.tags.custom" :key="item + index">
                {{ item.name }}
              </el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </div>
      <div class="exTable">
        <ex-table
          ref="exTableCourse"
          :data="dialogCourse.tableData"
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
            prop="minute"
            label="课时"
            width="150"
          />
        </ex-table>
      </div>
      <div class="selected-block">
        <div class="operator">
          <el-badge :value="dialogCourse.selectedData.length">
            <el-button @click="dialogCourse.courseSelectedBoxShow = !dialogCourse.courseSelectedBoxShow" size="small">
              已添加  <i v-if="dialogCourse.courseSelectedBoxShow" class="el-icon-arrow-up" />
              <i v-else class="el-icon-arrow-down" />
            </el-button>
          </el-badge>
        </div>
        <transition name="myBox">
          <div v-show="dialogCourse.courseSelectedBoxShow" class="box">
            <el-tag
              v-for="(item, index) in dialogCourse.selectedData"
              :key="item.name + item.id + index"
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
        <!--        <el-button @click="chooseCourseDialogVisible = false">取 消</el-button>-->
        <el-button @click="dialogCourse.visible = false" type="primary">关闭</el-button>
      </span>
    </el-dialog>
  </el-main>
</template>
<script>
// import { mapState, mapMutations } from 'vuex'
import { getCourseList, addDraftProject, getSpecialStudentList, addProject, getTagList, modifyProject, getProjectDetails } from '@/request/api'
import ExTable from '@/components/exTable.js'
import { GetUrlParam } from '@/utility'
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
      // 表单内容
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
      // 验证规则
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
          { required: true, message: '请输入目标人数', trigger: 'blur' },
          { type: 'number', message: '目标人数必须为数字值' }
        ]
      },
      // 课程选择弹窗信息
      dialogCourse: { // 课程选择弹窗信息
        visible: false,
        keyword: '',
        filterForm: {
          from: 'all',
          status: 'all',
          series: 'all',
          level: [],
          department: [],
          custom: []
        },
        tags: {
          source: [],
          status: [],
          series: [],
          level: [],
          department: [],
          custom: []
        },
        tableData: [], // 课程表格远程数据
        selectedData: [], // 已选择课程
        courseChecked: [], // 当前页面选择的课程数据
        courseSelectedBoxShow: false, // 已选择课程容器开关
        courseChooseTotal: {
          credit: 0,
          hours: 0
        } // 课程的学分统计，用于展示
      },
      // 指定参训学员弹窗信息
      dialogStudents: { // 制定参训学院弹窗信息
        visible: false, // 选择学员弹窗开关
        keyword: '', // 穿梭框搜索关键字
        transferData: generateData(), // 穿梭框学员远程数据
        transferSelectedData: [], // 学员当前穿梭框选择数据
        editModeStudentSelectedData: [] // 编辑的时候拉取的参训学员数据 //废弃
      },
      // 是否编辑模式
      editMode: false
    }
  },
  computed: {
    addProjectParam: function () {
      let lesson = this.dialogCourse.selectedData.map(item => {
        return item.id
      })
      let student = this.dialogStudents.transferSelectedData
      // let student = this.dialogStudents.transferSelectedData.map(item => {
      //   return item.id
      // })
      return {
        name: this.createForm.projectName,
        start_time: this.createForm.projectCycle[0],
        end_time: this.createForm.projectCycle[1],
        introduction: this.createForm.intro,
        obj: this.createForm.participants,
        target_num: parseInt(this.createForm.number),
        lesson_info: lesson,
        is_review: this.createForm.approval ? 1 : 0,
        is_auth: this.createForm.auth ? 1 : 0,
        is_pwd: this.createForm.passwordSwitch ? 1 : 0,
        is_sign: this.createForm.sign ? 1 : 0,
        password: this.createForm.password,
        personnel: student
      }
    }
  },
  watch: {
    'dialogCourse.filterForm': {
      handler (newVal, oldVal) {
        this.fetchRemoteData()
      },
      deep: true
    },
    'dialogCourse.selectedData': { // 课程选择总数计算侦听
      handler (newVal, oldVal) {
        this.dialogCourse.courseChooseTotal.credit = 0
        this.dialogCourse.courseChooseTotal.hours = 0
        newVal.map(item => {
          this.dialogCourse.courseChooseTotal.credit += item.credit
          this.dialogCourse.courseChooseTotal.hours += item.minute
        })
      },
      deep: true
    }
  },
  mounted: function () {
    if (this.$route.name === 'project-edit') {
      this.editMode = true
      let id = GetUrlParam('id')
      getProjectDetails({ id: id }).then(res => { // todo 项目编辑
        this.createForm = { // 编辑回显数据
          projectName: res.data.name,
          projectCycle: [res.data.start_time, res.data.end_time],
          participants: res.data.obj,
          number: res.data.target_num,
          intro: res.data.introduction,
          auth: res.data.auth === 1,
          sign: res.data.is_sign === 1,
          approval: res.data.is_review === 1,
          passwordSwitch: res.data.is_pwd === 1,
          password: res.data.passwd,
          studentsSwitch: res.data.personnel && res.data.personnel.length > 0,
          students: res.data.personnel || []
        }
        this.dialogCourse.selectedData = res.data.lesson_info
        this.dialogStudents.transferSelectedData = res.data.personnel || []
      })
    }
    this.$store.commit('$_setBreadCrumb', { isShow: true,
      list: [
        { name: '首页', path: '/' }, { name: '培训项目管理', path: '/project' }, { name: this.editMode ? '编辑项目' : '创建项目' }
      ] })
    this.getCourseList()
  },
  methods: {
    handleReload (pagination, { currentPage, pageSize }) { // 带翻页表格数据重载
      this.fetchRemoteData(pagination, currentPage, pageSize)
    },
    fetchRemoteData (pagination, currentPage, pageSize) { // 带翻页表格数据远程拉取
      let tags = this.dialogCourse.filterForm.level.concat(this.dialogCourse.filterForm.department, this.dialogCourse.filterForm.custom)
      // tags.push(this.dialogCourse.filterForm.from, this.dialogCourse.filterForm.series, this.dialogCourse.filterForm.status)
      let param = {
        keyword: this.dialogCourse.keyword,
        source: this.dialogCourse.filterForm.from,
        status: this.dialogCourse.filterForm.status,
        tag_id: tags,
        offset: currentPage || 1,
        limit: pageSize || 10
      }
      let paginationObj = pagination || this.$refs.exTableCourse.pagination
      getCourseList(param).then(res => {
        this.dialogCourse.tableData = res.data.list
        paginationObj.total = res.data.total

        this.dialogCourse.tableData.map(item => { // 手动选题模式 点击题库，加载试题 遍历 已有试题数据  回显
          // console.log(item.id)
          this.dialogCourse.selectedData.map(cItem => {
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
    getCourseList () { // 选择课程 获取课程列表
      let param = this.getCourseListParam
      // console.log(param)
      getCourseList(param).then(res => {
        this.dialogCourse.tableData = res.data.list
        this.total = res.data.total
      }, error => {
        error && this.$message.error(error.message)
      })
    },
    handleSaveProjectDraft (formName) { // 保存草稿
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.dialogCourse.selectedData.length === 0) {
            this.$message.error('请选择课程')
            return false
          }
          if (this.createForm.passwordSwitch && !this.createForm.password) {
            this.$message.error('请输入参训口令')
            return false
          }
          if (this.createForm.studentsSwitch && (this.dialogStudents.transferSelectedData.length === 0)) {
            this.$message.error('请制定参训学员')
            return false
          }
          addDraftProject(this.addProjectParam).then(res => {
            this.$message.success(res.message)
            this.$router.push({ path: '/project' })
          })
        } else {
          return false
        }
      })
    },
    handleSaveProject (formName) { // 保存项目
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.dialogCourse.selectedData.length === 0) {
            this.$message.error('请选择课程')
            return false
          }
          if (this.createForm.passwordSwitch && !this.createForm.password) {
            this.$message.error('请输入参训口令')
            return false
          }
          if (this.createForm.studentsSwitch && (this.dialogStudents.transferSelectedData.length === 0)) {
            this.$message.error('请制定参训学员')
            return false
          }
          if (this.editMode) {
            this.addProjectParam.id = GetUrlParam('id')
            modifyProject(this.addProjectParam).then(res => {
              this.$message.success(res.message)
              this.$router.push({ path: '/project' })
            })
          } else {
            addProject(this.addProjectParam).then(res => {
              this.$message.success(res.message)
              this.$router.push({ path: '/project' })
            })
          }
        } else {
          return false
        }
      })
    },
    handleSearch () { // 处理课程搜索
      this.fetchRemoteData()
    },
    handleSelectionChange (val) { // 表格多选
      this.dialogCourse.courseChecked = val
    },
    handleDeleteCourseSelected (item) { // 删除已选 处理课程已选删除
      this.dialogCourse.selectedData.splice(this.getItemIndex(this.dialogCourse.selectedData, item), 1)
      let courseCheckedIndex = this.getItemIndex(this.dialogCourse.courseChecked, item) // 判断删除的试题是否在列表中且被选中
      if (courseCheckedIndex !== -1) {
        let courseTableDataIndex = this.getItemIndex(this.dialogCourse.tableData, item)
        this.$nextTick(() => {
          this.$refs.exTableCourse.toggleRowSelection(this.dialogCourse.tableData[courseTableDataIndex], false)
        })
      }
    },
    handleCourseClick (selection, row) { //  点击checkbox事件,添加试题 处理课程列表checkbox选中
      if (this.getItemIndex(this.dialogCourse.selectedData, row) === -1) {
        this.dialogCourse.selectedData.push(row)
      } else {
        this.dialogCourse.selectedData.splice(this.getItemIndex(this.dialogCourse.selectedData, row), 1)
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
    handleStudentDialogOpen () { // 打开指定参训学员 弹窗
      this.dialogStudents.visible = true
      this.dialogStudents.transferSelectedData = []
      let _this = this
      getSpecialStudentList({ keyword: this.dialogStudents.keyword, offset: 0, limit: 20 }).then(res => {
        _this.dialogStudents.transferData = res.data.list
        // if (_this.dialogStudents.transferSelectedData.length > 0) {
        //   let selected = _this.dialogStudents.transferSelectedData.map(item => {
        //     return item.id
        //   })
        //   _this.dialogStudents.transferSelectedData = []
        //   _this.dialogStudents.transferData.map(item => {
        //     if (selected.indexOf(item.id) > -1) {
        //       _this.dialogStudents.transferSelectedData.push(item)
        //     }
        //   })
        // }
        // // eslint-disable-next-line no-console
        // console.log(_this.dialogStudents.transferSelectedData)
      })
    },
    studentFilterMethod (query, item) { // 穿梭框学员搜索 穿梭框过滤办法
      return item.name.indexOf(query) > -1
    },
    openCourseChooseDialog () {
      this.dialogCourse.visible = true
      getTagList().then(res => {
        this.dialogCourse.tags.source = res.data.source
        this.dialogCourse.tags.status = res.data.status
        this.dialogCourse.tags.series = res.data.series
        this.dialogCourse.tags.level = res.data.tag[0].child
        this.dialogCourse.tags.department = res.data.tag[1].child
        this.dialogCourse.tags.custom = res.data.tag[2].child
      })
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
