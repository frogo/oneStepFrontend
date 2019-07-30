<template lang="html">
  <el-main class="page-courseCreate">
    <h2 class="pageName">
      创建课程
    </h2>
    <el-form ref="createForm" :model="createForm" label-width="100px" class="createForm">
      <div class="head-line">
        <span class="base-info">基本信息</span>
      </div>
      <el-form-item label="课程名称" prop="">
        <el-input v-model="createForm.courseName" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="课程对象" prop="">
        <el-input v-model="createForm.audience" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="课时" prop="">
        <el-input v-model="createForm.hours" placeholder="请输入" /><span>分钟</span>
      </el-form-item>
      <el-form-item label="学分" prop="">
        <el-input v-model="createForm.credit" placeholder="请输入" /><span>分</span>
      </el-form-item>
      <el-form-item label="课程目标" prop="">
        <el-input v-model="createForm.target" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="标签" prop="">
        <el-button type="info" icon="el-icon-plus" plain>
          添加
        </el-button>
      </el-form-item>
      <el-form-item label="课程简介" prop="">
        <el-input v-model="createForm.outline" type="textarea" />
      </el-form-item>
      <el-form-item label="课程大纲" prop="">
        <el-input v-model="createForm.intro" type="textarea" />
      </el-form-item>
      <el-form-item label="课程封面" prop="" class="cover">
        <el-tabs v-model="activeTabName" @tab-click="handleTabClick" type="card">
          <el-tab-pane label="默认封面" name="default">
            <el-radio-group v-model="radioCover">
              <el-radio v-for="img in defaultCover" :label="img" @change="handleCoverClick">
                <img :src="img">
              </el-radio>
            </el-radio-group>
          </el-tab-pane>
          <el-tab-pane label="自定义" name="custom">
            <div>尺寸：384*198 大小：2M 格式：JPG</div>
            <el-upload
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
          </el-tab-pane>
        </el-tabs>
      </el-form-item>
      <div class="title">
        <span>学习内容</span>
      </div>
    </el-form>
  </el-main>
</template>
<script>
// import { mapState, mapMutations } from 'vuex'
// import { getStatus, getTodo } from '@/request/api'
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
        outline: ''
      },
      activeTabName: 'default',
      radioCover: require('../../assets/img/cover-1.png'),
      defaultCover: [
        require('../../assets/img/cover-1.png'),
        require('../../assets/img/cover-2.png'),
        require('../../assets/img/cover-3.png'),
        require('../../assets/img/cover-4.png'),
        require('../../assets/img/cover-5.png'),
        require('../../assets/img/cover-6.png'),
        require('../../assets/img/cover-7.png'),
        require('../../assets/img/cover-8.png')],
      imageUrl: ''
    }
  },
  computed: {
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
      console.log(this.radioCover)
    },
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>
