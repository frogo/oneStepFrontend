<template lang="html">
  <el-main class="page-courseDetails">
    <div v-if="courseDetails" class="video-box">
      <div class="video">
        <video controls>
          <source src="https://www.runoob.com/try/demo_source/movie.mp4" type="video/mp4">
          <source src="https://www.runoob.com/try/demo_source/movie.ogg" type="video/ogg">
          您的浏览器不支持 HTML5 video 标签。
        </video>
      </div>
      <div class="pieces">
        <h1>{{ courseDetails.name }}</h1>
        <ul class="some">
          <li>
            <span style="margin-right: 30px" class="c999"><i class="el-icon-thumb" /> 158</span>
            <span class="c999"><i class="el-icon-view" /> 358</span>
          </li>
          <li><span class="c999">课程对象：</span>一般新员工</li>
          <li><span class="c999">上传时间：</span>2019-05-13</li>
          <li><span class="c999">标签：</span>课程、开发</li>
        </ul>
        <div>
          <el-button type="primary">
            课程编辑
          </el-button>
        </div>
      </div>
    </div>
    <div v-if="courseDetails" class="introduction">
      <div class="course-intro">
        <el-tabs v-model="courseActiveName">
          <el-tab-pane label="课程介绍" name="intro">
            {{ courseDetails.introduction }}
          </el-tab-pane>
          <el-tab-pane label="课程大纲" name="outline">
            {{ courseDetails.syllabus }}
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="lecturer-intro">
        <h2 class="intro">
          讲师简介
        </h2>
        <div class="head">
          <div class="avatar">
            <el-avatar :src="courseDetails.teacher_info.pic" />
          </div>
          <div class="name">
            <p>{{ courseDetails.teacher_info.name }}</p>
            <p style="color:#c2c2c2; margin-top: 10px;">
              <i class="el-icon-thumb" /> 158
            </p>
          </div>
        </div>
        <div class="section">
          {{ courseDetails.teacher_info.introduction }}
        </div>
      </div>
    </div>
  </el-main>
</template>
<script>
// import { mapState, mapMutations } from 'vuex'
import { getCourseDetails } from '@/request/api'
import { GetUrlParam } from '@/utility'

export default {
  data () {
    return {
      courseActiveName: 'intro',
      courseDetails: ''
    }
  },
  computed: {
  },
  watch: {
  },
  mounted: function () {
    this.$store.commit('$_setBreadCrumb', { isShow: true,
      list: [
        { name: '首页', path: '/' },
        { name: '企业课程库', path: '/course' },
        { name: '课程详情', path: '/course/details' }
      ] })
    let param = { id: GetUrlParam('id') }
    getCourseDetails(param).then(res => {
      this.courseDetails = res.data
    })
  },
  methods: {

  }
}
</script>
