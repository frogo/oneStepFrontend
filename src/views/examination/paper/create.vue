<template>
  <el-main class="page-paperCreate">
    <h2 class="pageName">
      创建试卷
    </h2>
    <el-form ref="createForm" :model="createForm" :rules="rules" label-position="left" label-width="120px" class="createForm">
      <div class="head-line">
        <span class="base-info">基本信息</span>
      </div>
      <el-form-item label="试卷名称" prop="paperName">
        <el-input v-model="createForm.paperName" placeholder="请输入" />
      </el-form-item>
      <el-form-item prop="qualifiedPercent" class="qualifiedPercent">
        <div slot="label" class="label">
          <span>合格分数比</span><el-popover
            placement="top-start"
            title="标题"
            width="200"
            trigger="hover"
            content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
          >
            <i slot="reference" class="el-icon-question" />
          </el-popover>
        </div>

        <el-input v-model="createForm.qualifiedPercent" placeholder="请输入" class="w200" /> %
      </el-form-item>

      <div class="head-line">
        <span class="base-info">考试设置
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
      <el-form-item label="考试时长" prop="hours">
        <el-input v-model="createForm.hours" placeholder="请输入" class="w200" /> 分钟
      </el-form-item>

      <div class="inline-form">
        <el-form-item>
          <el-switch
            v-model="createForm.randomSequence"
            active-text="试题顺序随机"
            active-color="#EF6520"
            inactive-color="gray"
          />
        </el-form-item>
        <el-form-item>
          <el-switch
            v-model="createForm.randomOption"
            active-text="试题选项随机"
            active-color="#EF6520"
            inactive-color="gray"
          />
        </el-form-item>
        <el-form-item>
          <el-switch
            v-model="createForm.noLookAnswer"
            active-text="不许查看答案"
            active-color="#EF6520"
            inactive-color="gray"
          />
        </el-form-item>
      </div>

      <div class="head-line">
        <span class="base-info">试题规则</span>
      </div>

      <el-form-item>
        <el-select v-model="createForm.rules" placeholder="请选择" style="width:200px">
          <el-option
            v-for="item in paperRules"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
    </el-form>

    <div class="operation-bar">
      <el-button @click="handleSavePaperDraft" type="success">
        保存草稿
      </el-button>
      <el-button @click="handleSavePaper" type="primary">
        完成
      </el-button>
    </div>
  </el-main>
</template>

<script>
export default {
  data () {
    return {
      createForm: {
        paperName: '',
        qualifiedPercent: '',
        randomSequence: true,
        randomOption: false,
        noLookAnswer: false,
        rules: 'manual'
      },
      rules: {
        paperName: [
          { required: true, message: '请输入试题名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        qualifiedPercent: [
          { required: true, message: '请输入合格分数百分比数字', trigger: 'blur' }
        ],
        hours: [
          { required: true, message: '请输入课时时长', trigger: 'blur' }
        ]
      },
      paperRules: [{ label: '手动出题', value: 'manual' }, { label: '随机出题', value: 'random' }]
    }
  },
  mounted: function () {
  },
  methods: {
    handleSavePaperDraft () {

    },
    handleSavePaper () {

    }
  }
}
</script>

<style lang="scss">
.page-paperCreate{
  box-shadow: 0px 0px 5px #888888;
  margin: 15px auto;
  padding: 20px;
  h2.pageName{font-size: 26px}
  .el-form.createForm{
    .inline-form{
      display: flex; justify-content:flex-start;
      .el-form-item{ margin-right: 50px}
    }
    .head-line{margin: 25px 0;height:1px;position:relative;background:#f3f3f3;
      span.base-info{display: inline-block;position: absolute;top:-10px;background: #fff;padding-right: 1em;color:#EF6520}
      i{color:#8c939d;}
    }
    .el-input{width:55%}
    .el-input.w200{width:200px}
    .el-select.w200{width:200px}
    .el-textarea{width:400px}
    .qualifiedPercent{.label{display: inline-block;justify-content: flex-start;span{ margin-right: 5px;i{color:#8c939d;}}}}
  }
  .operation-bar{
    display: flex;justify-content:center;
    .el-button{width:100px}
  }

}
</style>
