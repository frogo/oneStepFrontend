<template lang="html">
  <el-main class="page-courseCreate">
    <h2 class="pageName">
      创建课程
    </h2>
    <el-form ref="createForm" :model="createForm" :rules="rules" label-width="100px" class="createForm">
      <div class="head-line">
        <span class="base-info">基本信息</span>
      </div>
      <div class="inline-form">
        <el-form-item label="课程名称" prop="courseName">
          <el-input v-model="createForm.courseName" placeholder="请输入" style="width:583px" maxlength="22" show-word-limit />
        </el-form-item>
        <el-form-item label="课时" prop="hours">
          <el-input v-model.number="createForm.hours" placeholder="请输入" class="w200" /> <span>分钟</span>
        </el-form-item>
      </div>
      <div class="inline-form">
        <el-form-item label="课程对象" prop="audience">
          <el-input v-model="createForm.audience" placeholder="请输入" style="width:583px" />
        </el-form-item>
        <el-form-item label="学分" prop="credit">
          <el-input v-model.number="createForm.credit" placeholder="请输入" class="w200" /> <span>分</span>
        </el-form-item>
      </div>

      <el-form-item label="课程目标" prop="">
        <el-input v-model="createForm.target" :rows="4" type="textarea" style="width:583px" />
      </el-form-item>
      <el-form-item label="标签" prop="">
        <el-button @click="dialogTagsEditorVisible = true; editMode = false" type="info" icon="el-icon-plus" plain size="small">
          选择标签
        </el-button>
        <!--        <el-button @click="dialogTagsEditorVisible = true; editMode = true" type="primary" plain size="small">-->
        <!--          维护标签-->
        <!--        </el-button>-->
        <span>已选择 <span class="red">{{ createForm.tags ? createForm.tags.length : 0 }}</span> 个标签</span>
        <!--        <span v-for="item in createForm.tags">{{item.name}}</span>-->
      </el-form-item>
      <el-form-item label="课程简介" prop="">
        <el-input v-model="createForm.intro" :rows="4" type="textarea" style="width:583px" />
      </el-form-item>
      <el-form-item label="课程大纲" prop="">
        <!--        <el-input v-model="createForm.outline" :rows="4" type="textarea" />-->
        <el-button @click="dialogOutLineVisible = true" type="default" icon="el-icon-plus" size="small">
          新增一条大纲内容
        </el-button>
        <ul v-for="(item,index) in createForm.outline" class="outlineList">
          <li :key="item">
            <span class="number">{{ index+1 }}.</span> <span class="text">{{ item }}</span>
            <i @click="handleModifyOutline(index)" class="el-icon-edit" title="修改该条" style="cursor: pointer" />
            <i @click="handleDeleteOutline(index)" class="el-icon-delete" title="删除该条" style="cursor: pointer" />
          </li>
        </ul>
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
          :on-remove="removeCourseFile"
          :on-exceed="handleExceed"
          :before-remove="beforeRemove"
          class="upload-courseFile"
          action="/v1/lesson/uploadVideo"
        >
          <el-button size="small" type="primary">
            点击上传
          </el-button>
          <div slot="tip" class="el-upload__tip">
            请上传mp3/mp4文件，且不超过100M
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
    <el-dialog
      :visible.sync="dialogExaminationVisible"
      title="选择试卷"
      custom-class="examinationChoose"
      width="42%"
    >
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
          @row-click="handleSelectionChange"
          :show-pagination="true"
          tooltip-effect="dark"
          height="480"
          stripe
        >
          <el-table-column label="选择" width="50" align="center">
            <template scope="scope">
              <el-radio
                v-model="dialogExaminationData.courseRadio"
                :label="scope.$index"
                class="radio"
              />
            </template>
          </el-table-column>
          <el-table-column property="name" show-overflow-tooltip label="试卷名称" />
          <el-table-column property="add_time" show-overflow-tooltip label="创建时间" width="150" align="center" />
          <el-table-column property="num" show-overflow-tooltip label="试题数" width="90" align="center" />
          <el-table-column property="rule" show-overflow-tooltip label="试题规则" width="120" align="center" />
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
    <el-dialog
      :title="outlineDialogEditMode ? '大纲修改' : '大纲添加'"
      :visible.sync="dialogOutLineVisible"
      width="30%"
    >
      <el-input
        :rows="4"
        v-model="outLineTextarea"
        type="textarea"
        placeholder="请输入大纲内容"
      />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogOutLineVisible = false">取 消</el-button>
        <el-button v-if="outlineDialogEditMode" @click="handleUpdateOutLine" type="primary">更新</el-button>
        <el-button v-else @click="handleAddOutLine" type="primary">增加</el-button>
      </span>
    </el-dialog>
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
        outline: [],
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
          { required: true, message: '请输入课程名称', trigger: 'blur' },
          { min: 2, max: 22, message: '长度在 2 到 22 个字符', trigger: 'blur' }
        ],
        audience: [
          { required: true, message: '请输入课程对象名称', trigger: 'blur' },
          { min: 2, max: 9, message: '长度在 2 到 9 个字符', trigger: 'blur' }
        ],
        hours: [
          { required: true, message: '请输入课时', trigger: 'blur' },
          { type: 'number', message: '课时必须为数字值' }
        ],
        // credit: [
        //   { required: true, message: '请输入学分', trigger: 'blur' },
        //   { type: 'number', message: '学分必须为数字值' }
        // ],
        // lecturer: [
        //   { required: true, message: '请输入讲师信息', trigger: 'blur' }
        // ],
        courseFileList: [
          { required: true, message: '请选择课程' }
        ]
        // examinationPaper: [
        //   { required: true, message: '请选择试卷' }
        // ]
      },
      // 试题弹窗
      dialogExaminationVisible: false,
      dialogExaminationData: { // 试题列表弹窗数据
        courseRadio: '',
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
      currentStatus: '', // 当前课程状态 0，下线，1，上线中，2，草稿
      dialogOutLineVisible: false,
      outLineTextarea: '', // 当前大纲内容
      // outlineList: [],
      outlineDialogEditMode: false,
      outlineDialogEditIndex: -1 // 当前编辑大纲的index
      // selectedTags: []
    }
  },
  computed: {
    addCourseParam: function () {
      let tags = this.createForm.tags
      return {
        name: this.createForm.courseName,
        cover: (this.createForm.activeTabName === 'default') ? this.createForm.radioCover : this.createForm.coverImageUrl,
        minute: this.createForm.hours,
        credit: this.createForm.credit,
        obj: this.createForm.audience,
        target: this.createForm.target,
        tags: tags,
        introduction: this.createForm.intro,
        syllabus: JSON.stringify(this.createForm.outline),
        teacher_info: {
          name: this.createForm.lecturer,
          pic: this.createForm.lecturerImageUrl,
          introduction: this.createForm.lecturerIntro
        },
        attachment: {
          url: this.createForm.courseFileList.length ? this.createForm.courseFileList[0]['url'] : '',
          name: this.createForm.courseFileList.length ? this.createForm.courseFileList[0]['name'] : ''
        },
        examination_id: this.createForm.examinationPaper.id
      }
    }
  },
  watch: {
  },
  mounted: function () {
    if (this.$route.name === 'course-edit') { // 编辑模式
      this.editMode = true
      let id = GetUrlParam('id')
      getDefaultCover().then(res => { // 获取默认封面
        this.defaultCover = res.data
        return getCourseDetails({ id: id })
      }).then(res => { // 编辑模式的课程信息
        // 封面是自定义还是默认，默认取当前的默认封面url
        let activeTabName
        let radioCover = ''
        if (this.defaultCover.indexOf(res.data.cover) === -1) {
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
          outline: JSON.parse(res.data.syllabus),
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
          courseFileList: res.data.attachment.url !== '' ? [
            {
              url: res.data.attachment.url,
              name: res.data.attachment.name
            }
          ] : [],
          examinationPaper: res.data.examination_info // 试卷信息
        }
      })
    } else { // 非编辑模式
      getDefaultCover().then(res => { // 获取默认封面
        this.defaultCover = res.data
      })
    }
  },
  methods: {
    handleAddOutLine () { // 新增大纲
      this.createForm.outline.push(this.outLineTextarea)
      this.dialogOutLineVisible = false
      this.outLineTextarea = ''
    },
    handleUpdateOutLine () { // 更新大纲
      this.createForm.outline[this.outlineDialogEditIndex] = this.outLineTextarea
      this.outlineDialogEditMode = false
      this.dialogOutLineVisible = false
      this.outLineTextarea = ''
      this.outlineDialogEditIndex = -1
    },
    handleModifyOutline (index) { // 修改大纲
      this.outlineDialogEditMode = true
      this.dialogOutLineVisible = true
      this.outlineDialogEditIndex = index
      this.outLineTextarea = this.createForm.outline[index]
    },
    handleDeleteOutline (index) { // 删除大纲
      this.createForm.outline.splice(index, 1)
    },
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

        this.dialogExaminationData.courseRadio = this.dialogExaminationTableData.indexOf(this.dialogExaminationData.currentRow)

        let a = this.dialogExaminationTableData.map((item, index) => {
          if (item.id === this.dialogExaminationData.currentRow.id) {
            return index
          }
        })
        // console.log(a)
        this.dialogExaminationData.courseRadio = a[0]
        // console.log(this.dialogExaminationTableData)
        // console.log(this.dialogExaminationData.currentRow)
        // console.log(this.dialogExaminationTableData.indexOf(this.dialogExaminationData.currentRow))
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
    removeCourseFile (file, fileList) {
    },
    handleCourseFileSuccess (res, file, fileList) {
      if (res.code === '1') {
        this.createForm.courseFileList = []
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
    handleExceed () {
      if (this.createForm.courseFileList.length) {
        this.$message.error('请先删除原有课程文件!')
      }
    },
    beforeRemove (file) {
      return this.$confirm(`确定移除 ${file.name}？`)
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
    handleSelectionChange (row) {
      this.dialogExaminationData.courseRadio = this.dialogExaminationTableData.indexOf(row)
      this.dialogExaminationData.currentRow = row
    },
    confirmExaminationSelect () {
      this.dialogExaminationVisible = false
      this.createForm.examinationPaper = this.dialogExaminationData.currentRow
    },
    cancelExaminationSelect () {
      // this.dialogExaminationVisible = false
      // this.createForm.examinationPaper = ''
      this.dialogExaminationData.courseRadio = ''
      this.dialogExaminationData.currentRow = ''
    },
    handleSaveCourseDraft (formName) { // 保存草稿
      if (GetUrlParam('id')) {
        this.addCourseParam.id = GetUrlParam('id')
      }
      if (!this.createForm.courseName) {
        this.$message.error('请至少输入课程名称！')
        return false
      }
      addCourseDraft(this.addCourseParam).then(res => {
        this.$message.success(res.message)
        this.$router.push({
          path: '/course'
        })
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
              this.$message.success(res.message)
              this.$router.push({
                path: '/course'
              })
            })
          } else {
            addCourse(this.addCourseParam).then(res => {
              this.$message.success(res.message)
              this.$router.push({
                path: '/course'
              })
            })
          }
        }
      })
    },
    gotoPaperCreate () {
      let target = this.$router.resolve({ path: '/paper/create' })
      window.open(target.href, '_blank')
    }
  }
}
</script>
<style lang="scss">
.page-courseCreate{
  .el-tabs {.el-tabs__content{height:140px}}
  .inline-form{
    display: flex; justify-content:flex-start;
    .el-form-item{
      margin-right: 50px
    }
  }
  .upload-courseFile{ position: relative;
    .el-upload-list{position: absolute;top:0px;left:100px}
  }
  .outlineList{
    li{
      color:#666;font-size: 14px;
      span{
        &.text{ display: inline-block;margin: 0 10px}
      }
      i{
        &:hover{color:red}
      }
    }
  }
}
  .examinationChoose{
    margin-top: 10vh!important;
    /*.el-table--enable-row-hover .el-table__body tr:hover > td{background: #EF6520;color:#fff}*/
    .exTable{
      margin-top: 20px;
      .el-pagination{margin-top: 20px;text-align: right}
      tr td:first-child{
        .el-radio__label{display: none}
      }
    }

  }

</style>
