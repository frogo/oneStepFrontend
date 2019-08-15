<template>
  <el-main class="page-questionCreate">
    <h2 class="pageName">
      创建试题
    </h2>
    <el-form ref="createForm" :model="createForm" :rules="rules" label-width="100px" class="createForm">
      <div class="head-line">
        <span class="base-info">基本信息</span>
      </div>
      <el-form-item label="题库名称" prop="questionName">
        <el-input v-model="createForm.questionName" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="题型选择" prop="questionType">
        <el-select v-model="createForm.questionType" placeholder="请选择">
          <el-option
            v-for="item in questionType"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <!--      <el-form-item label="选项数" prop="options">-->
      <!--        <el-input v-model="createForm.optionsNumber" placeholder="请输入" class="w200" />-->
      <!--      </el-form-item>-->
      <el-form-item label="题目" prop="questionTitle">
        <el-input v-model="createForm.questionTitle" type="textarea" placeholder="请输入" class="w200" />
      </el-form-item>
      <div class="head-line">
        <span class="base-info">选项内容</span>
      </div>
      <el-form-item prop="questionAnswer">
        <el-table
          ref="singleTable"
          :data="createForm.options.questionOptionsData"
          style="width: 100%"
        >
          <el-table-column
            label="正确"
            width="100"
          >
            <template slot-scope="scope">
              <el-radio v-model="createForm.options.trueOption" :label="scope.row.option" />
            </template>
          </el-table-column>
          <!--          <el-table-column-->
          <!--            property="option"-->
          <!--            label="编号"-->
          <!--            width="120"-->
          <!--          />-->
          <el-table-column
            property="name"
            label="描述"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.content" type="textarea" />
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
    </el-form>

    <div class="operation-bar">
      <el-button @click="submit" type="primary">
        提交
      </el-button>
      <el-button>重置</el-button>
    </div>
  </el-main>
</template>

<script>
export default {
  name: 'Create',
  data () {
    return {
      questionType: [
        { label: '多选', value: 'multi' },
        { label: '单选', value: 'signal' },
        { label: '判断', value: 'trueFalse' }
      ],
      createForm: {
        questionName: '',
        questionType: '',
        optionsNumber: 4,
        questionTitle: '',
        options: {
          trueOption: 'A',
          questionOptionsData: [{ option: 'A', content: '' }, { option: 'B', content: '' }, { option: 'C', content: '' }, { option: 'D', content: '' }]
        }

      },
      rules: {
        questionName: [
          { required: true, message: '请输入试题名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        questionType: [
          { required: true, message: '请选择试题类型', trigger: 'blur' }
        ],
        options: [
          { required: true, message: '请输入选项数', trigger: 'blur' }
        ],
        questionTitle: [
          { required: true, message: '请输入题目', trigger: 'blur' }
        ]
      }
    }
  },

  mounted: function () {
    this.$store.commit('$_setBreadCrumb', { isShow: true,
      list: [
        { name: '首页', path: '/' }, { name: '题库管理', path: '/questions' }, { name: '创建试题', path: '/questions/create' }
      ] })
  },
  methods: {
    submit () {
      // eslint-disable-next-line no-console
      console.log(this.createForm)
    }
  }
}
</script>

<style lang="scss">
.page-questionCreate{
  box-shadow: 0px 0px 5px #888888;
  margin: 0 auto 20px;
  padding: 20px;
  h2.pageName{font-size: 26px}
  .el-form.createForm{
    .head-line{margin: 25px 0;height:1px;position:relative;background:#f3f3f3;
      span.base-info{display: inline-block;position: absolute;top:-10px;background: #fff;padding-right: 1em;color:#EF6520}
    }
    .el-input{width:55%}
    .el-input.w200{width:200px}
    .el-textarea{width:400px}
  }
  .operation-bar{
    display: flex;justify-content:center;
    .el-button{width:100px}
  }
}
</style>
