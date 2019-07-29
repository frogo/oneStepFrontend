<template lang="html">
  <el-main class="page-courseCreate">
    <h2 class="pageName">
      创建课程
    </h2>
    <el-form ref="createForm" :model="createForm" :rules="rules" label-width="100px" class="createForm">
      <div class="title">
        <span>基本信息</span>
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
      }
    }
  },
  computed: {
  },
  watch: {
  },
  mounted: function () {
  },
  methods: {
  }
}
</script>
