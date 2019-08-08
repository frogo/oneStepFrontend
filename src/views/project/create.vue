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
          <span>已选课程数 <i>33</i> 总学分 <i>336</i> 总课时 <i>32</i></span>
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
        <span class="base-info">项目设置</span>
      </div>
      <el-form-item>
        <span>学员认证
          <el-switch
            v-model="createForm.auth"
            active-color="#EF6520"
            inactive-color="gray"
          /></span>
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
  </el-main>
</template>
<script>
// import { mapState, mapMutations } from 'vuex'
// import { getExaminationPaperList, addCourse, addCourseDraft } from '@/request/api'
export default {
  data () {
    return {
      createForm: {
        projectName: '',
        projectCycle: '',
        participants: '',
        number: '',
        intro: '',
        auth: false,
        sign: false,
        approval: false,
        password: '',
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
      chooseCourseDialogVisible: false
    }
  },
  computed: {
    addCourseParam: function () {
      return {
        name: this.createForm.courseName,
        cover: (this.createForm.activeTabName === 'default') ? this.createForm.radioCover : this.createForm.coverImageUrl,
        minutes: this.createForm.hours,
        credit: this.createForm.credit,
        obj: this.createForm.audience,
        target: this.createForm.target,
        tags: this.createForm.tags,
        introduction: this.createForm.intro,
        syllabus: this.createForm.outline,
        teacher_info: {
          name: this.createForm.lecturer,
          pic: this.createForm.lecturerImageUrl,
          introduction: this.createForm.lecturerIntro
        },
        attachment: {
          url: this.createForm.courseFileList[0]['url'],
          name: this.createForm.courseFileList[0]['name']
        },
        examination_id: this.createForm.examinationPaper
      }
    }
  },
  watch: {
  },
  mounted: function () {
  },
  methods: {
    handleSaveProjectDraft () {
    },
    handleSaveProject () {
    }
  }
}
</script>
<style lang="scss">
  .page-projectCreate{
    box-shadow: 0px 0px 5px #888888;
    margin: 15px auto;
    padding: 20px;
    h2.pageName{font-size: 26px}
    .el-form.createForm{
      .head-line{margin: 25px 0;height:1px;position:relative;background:#f3f3f3;
        span.base-info{display: inline-block;position: absolute;top:-10px;background: #fff;padding-right: 1em;color:#EF6520}
      }
      .el-input{width:55%}
      .el-input.w200{width:200px}
      .el-textarea{width:400px}
      .chooseCourse{
        .btn-box{display: flex;justify-content: space-between;span{i{color:red;font-style: normal}}}
      }
    }
    .operation-bar{
      display: flex;justify-content:center;
      .el-button{width:100px}
    }
  }
</style>
