<template lang="html">
  <el-main class="page-courseCreate">
    <h2 class="pageName">
      创建课程
    </h2>
    <el-form ref="createForm" :model="createForm" :rules="rules" label-width="100px" class="createForm">
      <div class="head-line">
        <span class="base-info">基本信息</span>
      </div>
      <el-form-item label="课程名称" prop="courseName">
        <el-input v-model="createForm.courseName" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="课程对象" prop="audience">
        <el-input v-model="createForm.audience" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="课时" prop="hours">
        <el-input v-model.number="createForm.hours" placeholder="请输入" class="w200" /> <span>分钟</span>
      </el-form-item>
      <el-form-item label="学分" prop="credit">
        <el-input v-model.number="createForm.credit" placeholder="请输入" class="w200" /> <span>分</span>
      </el-form-item>
      <el-form-item label="课程目标" prop="">
        <el-input v-model="createForm.target" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="标签" prop="">
        <el-button @click="dialogTagsEditorVisible = true; editMode = false" type="info" icon="el-icon-plus" plain size="small">
          编辑标签
        </el-button>
        <!--        <el-button @click="dialogTagsEditorVisible = true; editMode = true" type="primary" plain size="small">-->
        <!--          维护标签-->
        <!--        </el-button>-->
        <span>已选择 <span class="red">{{ createForm.tags ? createForm.tags.length : 0 }}</span> 个标签</span>
      </el-form-item>
      <el-form-item label="课程简介" prop="">
        <el-input v-model="createForm.outline" :rows="4" type="textarea" />
      </el-form-item>
      <el-form-item label="课程大纲" prop="">
        <el-input v-model="createForm.intro" :rows="4" type="textarea" />
      </el-form-item>
      <el-form-item label="课程封面" prop="" class="cover">
        <el-tabs v-model="createForm.activeTabName" type="card">
          <el-tab-pane label="默认封面" name="default">
            <el-radio-group v-model="createForm.radioCover">
              <el-radio v-for="img in defaultCover" :label="img" :key="img">
                <img :src="img">
              </el-radio>
            </el-radio-group>
          </el-tab-pane>
          <el-tab-pane label="自定义" name="custom">
            <div>尺寸：384*198 大小：2M 格式：JPG</div>
            <el-upload
              :show-file-list="false"
              :on-success="handleCoverSuccess"
              :before-upload="beforeCoverUpload"
              class="cover-uploader"
              action="/v1/lesson/uploadCover"
            >
              <img v-if="createForm.coverImageUrl" :src="createForm.coverImageUrl" class="cover">
              <i v-else class="el-icon-plus cover-uploader-icon" />
            </el-upload>
          </el-tab-pane>
        </el-tabs>
      </el-form-item>
      <el-form-item label="讲师信息" prop="lecturer" class="lecturer">
        <el-input v-model="createForm.lecturer" placeholder="讲师姓名" />
        <div>尺寸：384*198 大小：2M 格式：JPG</div>
        <div class="lecturer-info">
          <el-upload
            :show-file-list="false"
            :on-success="handleLecturerSuccess"
            :before-upload="beforeLecturerUpload"
            class="lecturer-uploader"
            action="/v1/lesson/uploadCover"
          >
            <img v-if="createForm.lecturerImageUrl" :src="createForm.lecturerImageUrl" class="lecturer">
            <i v-else class="el-icon-plus lecturer-uploader-icon" />
          </el-upload>
          <el-input v-model="createForm.lecturerIntro" :rows="4" type="textarea" placeholder="讲师简介" />
        </div>
      </el-form-item>
      <div class="head-line">
        <span class="base-info">学习内容</span>
      </div>
      <el-form-item label="课程文件" prop="courseFileList">
        <el-upload
          :limit="1"
          :file-list="createForm.courseFileList"
          :on-success="handleCourseFileSuccess"
          :before-upload="beforeCourseFileUpload"
          class="upload-courseFile"
          action="/v1/lesson/uploadVideo"
        >
          <el-button size="small" type="primary">
            点击上传
          </el-button>
          <div slot="tip" class="el-upload__tip">
            只能上传jpg/png文件，且不超过500kb
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item label="课后考试" prop="examinationPaper">
        <el-button @click="handleExaminationDialog" type="primary" size="small">
          选择试卷
        </el-button>
        <span v-if="createForm.examinationPaper"><i class="el-icon-document" />{{ createForm.examinationPaper.name }}</span>
      </el-form-item>
    </el-form>
    <div class="operation-bar">
      <el-button @click="handleSaveCourseDraft('createForm')" :disabled="editMode && currentStatus !== 2 " type="success">
        保存草稿
      </el-button>
      <el-button @click="handleSaveCourse('createForm')" type="primary">
        完成
      </el-button>
    </div>
    <el-dialog :visible.sync="dialogExaminationVisible" title="试卷选择" custom-class="examinationChoose">
      <div class="filter-box">
        <div class="left">
          <el-select v-model="dialogExaminationData.type" @change="handleExamRuleChange" placeholder="请选择" class="select" size="small">
            <el-option label="手动出题" value="manual" />
            <el-option label="随机抽题" value="random" />
          </el-select>
          <el-input
            v-model="dialogExaminationData.keyword"
            @keyup.enter.native="handleKeywordFilter"
            size="small"
            class="input"
            placeholder="请输入内容"
            suffix-icon="el-icon-search"
          />
        </div>
        <div class="right">
          <el-button @click="gotoPaperCreate" type="primary" size="small">
            创建试卷
          </el-button>
        </div>
      </div>

      <div class="exTable">
        <ex-table
          ref="exTableExaminationPaper"
          :data="dialogExaminationTableData"
          :reload-method="handleExaminationPaperReload"
          @current-change="handleSelectionChange"
          :show-pagination="true"
          highlight-current-row
          tooltip-effect="dark"
          height="480"
        >
          <el-table-column property="name" show-overflow-tooltip label="试卷名称" width="150" />
          <el-table-column property="add_time" show-overflow-tooltip label="创建时间" width="200" />
          <el-table-column property="num" show-overflow-tooltip label="试题数" />
          <el-table-column property="rule" show-overflow-tooltip label="试题规则" />
        </ex-table>
      </div>
      <div class="btn-box">
        <el-button @click="cancelExaminationSelect" size="small">
          清除
        </el-button>
        <el-button @click="confirmExaminationSelect" type="primary" size="small">
          确定
        </el-button>
      </div>
    </el-dialog>
    <tags-editor-dialog
      :dialogTagsEditorVisible.sync="dialogTagsEditorVisible"
      v-if="dialogTagsEditorVisible"
      @closeDialog="dialogTagsEditorVisible = false"
      @getSelectedTags="getSelectedTags"
      :tagsSelectedFromParent="createForm.tags"
    />
  </el-main>
</template>
<script>
// import { mapState, mapMutations } from 'vuex'
import { getExaminationPaperList, addCourse, addCourseDraft, getDefaultCover, getCourseDetails, modifyCourse } from '@/request/api'
import { GetUrlParam } from '@/utility'
import ExTable from '@/components/exTable.js'
import TagsEditorDialog from '@/components/tagsEditorDialog'
export default {
  components: {
    ExTable,
    TagsEditorDialog
  },
  data () {
    return {
      createForm: {
        courseName: '',
        audience: '',
        target: '',
        tags: [],
        hours: '',
        credit: '',
        intro: '',
        outline: '',
        // 讲师
        lecturer: '',
        lecturerImageUrl: '',
        lecturerIntro: '',
        // 默认封面
        activeTabName: 'default',
        coverImageUrl: '',
        radioCover: '',
        // 课程
        courseFileList: [
          // {
          //   name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
          // }
        ],
        examinationPaper: ''// 试卷信息
      },
      defaultCover: [
      ], // 默认封面列表
      rules: {
        courseName: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        audience: [
          { required: true, message: '请输入课程对象名称', trigger: 'blur' },
          { min: 2, max: 9, message: '长度在 2 到 9 个字符', trigger: 'blur' }
        ],
        hours: [
          { required: true, message: '请输入课时', trigger: 'blur' },
          { type: 'number', message: '课时必须为数字值' }
        ],
        credit: [
          { required: true, message: '请输入学分', trigger: 'blur' },
          { type: 'number', message: '学分必须为数字值' }
        ],
        lecturer: [
          { required: true, message: '请输入讲师信息', trigger: 'blur' }
        ],
        courseFileList: [
          { required: true, message: '请选择课程' }
        ],
        examinationPaper: [
          { required: true, message: '请选择试卷' }
        ]
      },
      // 试题弹窗
      dialogExaminationVisible: false,
      dialogExaminationData: { // 试题列表弹窗数据
        type: 'manual',
        keyword: '',
        currentPage: 1,
        pageSize: 10,
        total: 0,
        currentRow: ''
      },
      dialogExaminationTableData: [],
      typeMap: { random: '随机抽题', manual: '手动出题' },
      // 编辑标签弹窗
      dialogTagsEditorVisible: false,
      editMode: false,
      coverSettingShow: true,
      currentStatus: '' // 当前课程状态 0，下线，1，上线中，2，草稿
      // selectedTags: []
    }
  },
  computed: {
    // getExaminationPaperListParam: function () {
    //   return {
    //     type: this.typeMap[this.dialogExaminationData.type],
    //     limit: this.dialogExaminationData.pageSize,
    //     offset: this.dialogExaminationData.currentPage,
    //     keyword: this.dialogExaminationData.keyword
    //   }
    // },
    addCourseParam: function () {
      let tags = this.createForm.tags
      // if (this.createForm.tags && this.createForm.tags.length > 0) {
      //   tags = this.createForm.tags.map(_ => {
      //     return _.id
      //   })
      // } else {
      //   tags = []
      // }

      return {
        name: this.createForm.courseName,
        cover: (this.createForm.activeTabName === 'default') ? this.createForm.radioCover : this.createForm.coverImageUrl,
        minute: this.createForm.hours,
        credit: this.createForm.credit,
        obj: this.createForm.audience,
        target: this.createForm.target,
        tags: tags,
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
        examination_id: this.createForm.examinationPaper.id
      }
    }
  },
  watch: {
  },
  mounted: function () {
    getDefaultCover().then(res => { // 获取默认封面
      this.defaultCover = res.data
      if (this.$route.name === 'course-edit') {
        this.editMode = true
        let id = GetUrlParam('id')
        return getCourseDetails({ id: id })
      }
    }).then(res => { // 编辑模式的课程信息
      // 封面是自定义还是默认，默认取当前的默认封面url
      let activeTabName
      let radioCover = ''
      if (res.data.cover.indexOf('cover') === -1) {
        activeTabName = 'custom'
      } else {
        activeTabName = 'default'
        radioCover = res.data.cover
      }
      this.currentStatus = res.data.status
      this.createForm = { // 编辑回显数据
        courseName: res.data.name,
        audience: res.data.obj,
        target: res.data.target,
        tags: res.data.tags,
        hours: res.data.minute,
        credit: res.data.credit,
        intro: res.data.introduction,
        outline: res.data.syllabus,
        cover: res.data.cover,
        activeTabName: activeTabName,
        // 讲师
        lecturer: res.data.teacher_info.name,
        lecturerImageUrl: res.data.teacher_info.pic,
        lecturerIntro: res.data.teacher_info.introduction,
        // 默认封面
        // activeTabName: 'default',
        coverImageUrl: (activeTabName === 'custom') ? res.data.cover : '',
        radioCover: radioCover,
        // 课程
        courseFileList: [
          {
            url: res.data.attachment.url, name: res.data.attachment.name
          }
        ],
        examinationPaper: res.data.examination_info // 试卷信息
      }
    })
    this.$store.commit('$_setBreadCrumb', { isShow: true,
      list: [
        { name: '首页', path: '/' },
        { name: '企业课程库', path: '/course' },
        { name: this.editMode ? '编辑课程' : '创建课程' }
      ] })
  },
  methods: {
    handleExaminationPaperReload (pagination, { currentPage, pageSize }) {
      this.fetchExaminationPaperRemoteData(pagination, currentPage, pageSize)
    },
    fetchExaminationPaperRemoteData (pagination, currentPage, pageSize) {
      let param = {
        // type: this.typeMap[this.dialogExaminationData.type],
        rule: this.dialogExaminationData.type,
        limit: pageSize || 10,
        offset: currentPage || 1,
        keyword: this.dialogExaminationData.keyword
      }
      let paginationObj = pagination || this.$refs['exTableExaminationPaper'].pagination
      getExaminationPaperList(param).then(res => {
        this.dialogExaminationTableData = res.data.list
        if (paginationObj) {
          paginationObj.total = res.data.total
        }
      })
    },
    getSelectedTags (tags) {
      this.createForm.tags = tags.map(_ => {
        return _.id
      })
    },
    // handleTabClick (tab, event) {
    //   // console.log(tab, event)
    // },
    // handleCoverClick () {
    // // console.log(this.createForm.radioCover)
    // },
    handleCoverSuccess (res, file) {
      if (res.code === '1') {
        this.createForm.coverImageUrl = res.data
      } else {
        this.$message.error(res.message)
      }
    },
    beforeCoverUpload (file) {
      // const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!')
      // }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      // return isJPG && isLt2M
      return isLt2M
    },
    handleLecturerSuccess (res, file) {
      if (res.code === '1') {
        this.createForm.lecturerImageUrl = res.data
      } else {
        this.$message.error(res.message)
      }
    },
    beforeLecturerUpload (file) {
      // const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!')
      // }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isLt2M
    },
    handleCourseFileSuccess (res, file, fileList) {
      if (res.code === '1') {
        this.createForm.courseFileList.push({
          name: file.name,
          url: res.data
        })
      }
    },
    beforeCourseFileUpload (file) {
      const isLt100M = file.size / 1024 / 1024 < 100
      if (!isLt100M) {
        this.$message.error('上传的课程文件大小不能超过 100MB!')
      }
      return isLt100M
    },
    handleExamRuleChange () {
      this.fetchExaminationPaperRemoteData()
    },
    handleKeywordFilter () {
      this.fetchExaminationPaperRemoteData()
    },
    handleExaminationDialog () {
      this.dialogExaminationVisible = true
      this.$nextTick(() => {
        this.fetchExaminationPaperRemoteData()
      })
    },
    handleSelectionChange (val) {
      this.dialogExaminationData.currentRow = val
    },
    confirmExaminationSelect () {
      this.dialogExaminationVisible = false
      this.createForm.examinationPaper = this.dialogExaminationData.currentRow
    },
    cancelExaminationSelect () {
      this.dialogExaminationVisible = false
      this.createForm.examinationPaper = ''
    },
    handleSaveCourseDraft (formName) { // 保存草稿
      if (GetUrlParam('id')) {
        this.addCourseParam.id = GetUrlParam('id')
      }
      addCourseDraft(this.addCourseParam).then(res => {
        this.$message.success(res.message)
      })
      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
      //
      //   }
      // })
    },
    handleSaveCourse (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.editMode) {
            this.addCourseParam.id = GetUrlParam('id')
            modifyCourse(this.addCourseParam).then(res => {
              this.$alert(res.message, '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  this.$router.push({
                    path: '/course'
                  })
                }
              })
            })
          } else {
            addCourse(this.addCourseParam).then(res => {
              this.$alert(res.message, '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  this.$router.push({
                    path: '/course'
                  })
                }
              })
            })
          }
        }
      })
    },
    gotoPaperCreate () {
      this.$router.push({ path: '/paper/create' })
    }
  }
}
</script>
<style lang="scss">
  .examinationChoose{
    .el-table--enable-row-hover .el-table__body tr:hover > td{background: #EF6520;color:#fff}
  }

</style>
