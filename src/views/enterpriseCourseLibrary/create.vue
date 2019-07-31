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
        <el-input v-model="createForm.hours" placeholder="请输入" class="w200" /> <span>分钟</span>
      </el-form-item>
      <el-form-item label="学分" prop="credit">
        <el-input v-model="createForm.credit" placeholder="请输入" class="w200" /> <span>分</span>
      </el-form-item>
      <el-form-item label="课程目标" prop="">
        <el-input v-model="createForm.target" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="标签" prop="">
        <el-button type="info" icon="el-icon-plus" plain size="small">
          添加
        </el-button>
      </el-form-item>
      <el-form-item label="课程简介" prop="">
        <el-input v-model="createForm.outline" :rows="4" type="textarea" />
      </el-form-item>
      <el-form-item label="课程大纲" prop="">
        <el-input v-model="createForm.intro" :rows="4" type="textarea" />
      </el-form-item>
      <el-form-item label="课程封面" prop="" class="cover">
        <el-tabs v-model="createForm.activeTabName" @tab-click="handleTabClick" type="card">
          <el-tab-pane label="默认封面" name="default">
            <el-radio-group v-model="createForm.radioCover">
              <el-radio v-for="img in defaultCover" :label="img" @change="handleCoverClick">
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
              action="https://jsonplaceholder.typicode.com/posts/"
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
            action="https://jsonplaceholder.typicode.com/posts/"
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
      <el-form-item label="课程文件" prop="courseFile">
        <el-upload
          :limit="3"
          :file-list="createForm.courseFileList"
          :on-success="handleCourseFileSuccess"
          class="upload-courseFile"
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple
        >
          <el-button size="small" type="primary">
            点击上传
          </el-button>
          <div slot="tip" class="el-upload__tip">
            只能上传jpg/png文件，且不超过500kb
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item label="课后考试" prop="examination">
        <el-button @click="handleExaminationDialog" type="primary" size="small">
          选择试卷
        </el-button>
      </el-form-item>
    </el-form>
    <div class="operation-bar">
      <el-button>保存草稿</el-button>
      <el-button type="success">
        预览
      </el-button>
      <el-button type="primary">
        完成
      </el-button>
    </div>
    <el-dialog :visible.sync="dialogExaminationVisible" title="试卷选择" class="examinationChoose">
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
          <el-button type="primary" size="small">
            创建试卷
          </el-button>
        </div>
      </div>
      <el-table :data="dialogExaminationTableData" @current-change="handleSelectionChange" highlight-current-row>
        <el-table-column property="name" show-overflow-tooltip label="试卷名称" width="150" />
        <el-table-column property="addtime" show-overflow-tooltip label="创建时间" width="200" />
        <el-table-column property="num" show-overflow-tooltip label="试题数" />
        <el-table-column property="rule" show-overflow-tooltip label="试题规则" />
      </el-table>

      <div class="pager-box">
        <el-pagination
          @current-change="handleExaminationPageChange"
          :current-page.sync="dialogExaminationData.currentPage"
          :page-size="dialogExaminationData.pageSize"
          :total="dialogExaminationData.total"
          layout="total, prev, pager, next"
        />
      </div>

      <div class="btn-box">
        <el-button size="small">
          取消
        </el-button>
        <el-button type="primary" size="small">
          确定
        </el-button>
      </div>
    </el-dialog>
  </el-main>
</template>
<script>
// import { mapState, mapMutations } from 'vuex'
import { getQuestionList } from '@/request/api'
export default {
  data () {
    return {
      createForm: {
        courseName: '',
        audience: '',
        target: '',
        hours: '',
        credit: '',
        intro: '',
        outline: '',
        lecturer: '',
        lecturerIntro: '',
        courseFile: '',
        activeTabName: 'default',
        radioCover: require('../../assets/img/cover-1.png'),
        lecturerImageUrl: '',
        coverImageUrl: '',
        courseFileList: [
          {
            name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
          }
        ]
      },

      defaultCover: [
        require('../../assets/img/cover-1.png'),
        require('../../assets/img/cover-2.png'),
        require('../../assets/img/cover-3.png'),
        require('../../assets/img/cover-4.png'),
        require('../../assets/img/cover-5.png'),
        require('../../assets/img/cover-6.png'),
        require('../../assets/img/cover-7.png'),
        require('../../assets/img/cover-8.png')], // 默认封面列表
      rules: {
        courseName: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        audience: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        hours: [
          { required: true, message: '请输入课时', trigger: 'blur' }
        ],
        credit: [
          { required: true, message: '请输入学分', trigger: 'blur' }
        ],
        courseFile: [
          { required: true }
        ],
        examination: [
          { required: true }
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
        selection: ''
      },
      dialogExaminationTableData: [],
      typeMap: { random: '随机抽题', manual: '手动出题' }
    }
  },
  computed: {
    getQuestionListParam: function () {
      return {
        type: this.typeMap[this.dialogExaminationData.type],
        limit: this.dialogExaminationData.pageSize,
        offset: this.dialogExaminationData.currentPage,
        keyword: this.dialogExaminationData.keyword
      }
    }
  },
  watch: {
  },
  mounted: function () {
  },
  methods: {
    handleTabClick (tab, event) {
      console.log(tab, event)
    },
    handleCoverClick () {
      console.log(this.createForm.radioCover)
    },
    handleCoverSuccess (res, file) {
      this.createForm.coverImageUrl = URL.createObjectURL(file.raw)
    },
    beforeCoverUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    handleLecturerSuccess (res, file) {
      this.createForm.lecturerImageUrl = URL.createObjectURL(file.raw)
      console.log(this.createForm.lecturerImageUrl)
    },
    beforeLecturerUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    handleCourseFileSuccess (response, file, fileList) {
      console.log(response)
      console.log(file)
      console.log(fileList)
    },
    handleSelectionChange (val) {
      this.dialogExaminationData.selection = val
    },
    handleExaminationPageChange (val) {
    },
    handleExamRuleChange () {
      this.getQuestionList()
    },
    handleKeywordFilter () {
      this.getQuestionList()
    },
    handleExaminationDialog () {
      this.dialogExaminationVisible = true
      this.getQuestionList()
    },
    getQuestionList () {
      getQuestionList(this.getQuestionListParam).then(res => {
        if (res.code === '1') {
          this.dialogExaminationTableData = res.data.list
          this.dialogExaminationData.total = res.data.total
        }
      }, error => {
        alert(error)
      })
    }
  }
}
</script>
