<template lang="html">
  <el-main class="page-courseDetails">
    <div v-if="courseDetails" class="video-box">
      <div class="video">
        <video controls>
          <source :src="courseDetails.attachment.url" type="video/mp4">
          您的浏览器不支持 HTML5 video 标签。
        </video>
      </div>
      <div class="pieces">
        <h1>{{ courseDetails.name }}</h1>
        <ul class="some">
          <li>
            <span style="margin-right: 30px" class="c999"><i class="el-icon-thumb" /> {{ courseDetails.like_num }}</span>
            <span class="c999"><i class="el-icon-view" /> {{ courseDetails.visit_num }}</span>
          </li>
          <li><span class="c999">课程对象：</span>{{ courseDetails.obj }}</li>
          <li><span class="c999">上传时间：</span>{{ courseDetails.add_time }}</li>
          <li><span class="c999">标签：</span> <span v-for="item in courseDetails.tags" style="padding-left: 10px">{{ item.name }}</span></li>
        </ul>
        <div>
          <el-button @click="goToEdit" type="primary">
            课程编辑
          </el-button>
        </div>
      </div>
    </div>
    <div v-if="courseDetails" class="introduction">
      <div class="course-intro">
        <div class="inner">
          <el-tabs v-model="courseActiveName">
            <el-tab-pane label="课程介绍" name="intro">
              <!--              <div class="item">-->
              <!--                <p class="title">课程对象：</p>-->
              <!--                <p class="content"> {{ courseDetails.obj }}</p>-->
              <!--              </div>-->
              <div class="item">
                <p class="title">
                  课程目标：
                </p>
                <p class="content">
                  {{ courseDetails.target }}
                </p>
              </div>
              <div class="item">
                <p class="title">
                  课程简介：
                </p>
                <p class="content">
                  {{ courseDetails.introduction }}
                </p>
              </div>
            </el-tab-pane>
            <el-tab-pane label="课程大纲" name="outline" class="outline">
              {{ courseDetails.syllabus }}
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <div class="lecturer-intro">
        <div class="inner">
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
    // this.$store.commit('$_setBreadCrumb', { isShow: true,
    //   list: [
    //     { name: '企业课程库', path: '/course' },
    //     { name: '课程详情', path: '/course/details' }
    //   ] })
    let param = { id: GetUrlParam('id') }
    getCourseDetails(param).then(res => {
      this.courseDetails = res.data
    })
  },
  methods: {
    goToEdit () {
      this.$router.push({ path: '/course/edit', query: { id: GetUrlParam('id') } })
    }
  }
}
</script>
<style lang="scss">
  .page-courseDetails{
    .introduction{
      .course-intro{
        .inner{
          .outline{ font-size: 12px;color:#666}
          .item{
            padding: 2em 0;
            p{
              font-size: 12px;
              &.title{color:#999;margin-bottom: 10px}
              &.content{color:#666}
            }
          }
        }
      }
    }
  }
</style>
