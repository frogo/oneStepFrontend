<template>
  <el-main class="page-questionCreate">
    <h2 class="pageName">
      创建试题
    </h2>
    <el-form ref="createForm" :model="createForm" :rules="rules" label-width="100px" class="createForm">
      <div class="head-line">
        <span class="base-info">基本信息</span>
      </div>
      <el-form-item label="题库名称" prop="questionsName">
        <el-input v-model="createForm.questionName" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="题型选择" prop="questionType">
        <el-input v-model="createForm.questionType" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="选项数" prop="options">
        <el-input v-model="createForm.options" placeholder="请输入" class="w200" /> <span>分钟</span>
      </el-form-item>
      <el-form-item label="题目" prop="questionTitle">
        <el-input v-model="createForm.questionTitle" type="textarea" placeholder="请输入" class="w200" /> <span>分</span>
      </el-form-item>
      <div class="head-line">
        <span class="base-info">选项内容</span>
      </div>
      <el-form-item prop="questionAnswer" />
    </el-form>
  </el-main>
</template>

<script>
export default {
  name: 'Create',
  data () {
    return {
      createForm: {
        questionName: '',
        questionType: '',
        options: [],
        questionTitle: ''

      }
    }
  }
}
</script>

<style lang="scss">
.page-questionCreate{
  padding: 0;
}
</style>
