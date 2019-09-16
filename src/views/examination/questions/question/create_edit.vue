<template>
  <el-main class="page-questionCreate">
    <h2 class="pageName">
      创建试题
    </h2>
    <el-form ref="createForm" :model="createForm" :rules="rules" label-width="100px" class="createForm">
      <div class="head-line">
        <span class="base-info">基本信息</span>
      </div>
      <el-form-item label="题库名称" prop="questionLibName">
        <el-input v-model="createForm.questionLibName" placeholder="请输入" readonly />
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
      <el-form-item label="题目" prop="questionName">
        <el-input v-model="createForm.questionName" type="textarea" placeholder="请输入" class="w200" />
      </el-form-item>
      <div class="head-line">
        <span class="base-info">选项内容</span>
      </div>
      <el-form-item prop="questionAnswer">
        <el-table
          ref="singleTable"
          v-show="createForm.questionType === 'single'"
          :data="createForm.optionsSingle.questionOptionsData"
          style="width: 100%"
        >
          <el-table-column
            label="正确"
            width="60"
            align="center"
          >
            <template slot-scope="scope">
              <el-radio v-model="createForm.optionsSingle.trueOption" :label="scope.row.number">
&nbsp;
              </el-radio>
            </template>
          </el-table-column>
          <el-table-column
            label="编号"
            width="60"
            prop="number"
            align="center"
          />
          <el-table-column
            label="描述"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.content" type="textarea" />
            </template>
          </el-table-column>
        </el-table>

        <el-table
          ref="multipleTable"
          v-show="createForm.questionType === 'multi'"
          :data="createForm.optionsMulti.questionOptionsData"
          @selection-change="handleSelectionChange"
          @select="handleCheckboxClick"
          style="width: 100%"
          class="multiTable"
        >
          <el-table-column
            type="selection"
            width="60"
            align="center"
          />
          <el-table-column
            label="编号"
            width="60"
            prop="number"
            align="center"
          />
          <el-table-column
            label="描述(请在左侧勾选正确答案)"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.content" type="textarea" />
            </template>
          </el-table-column>
        </el-table>

        <el-table
          ref="trueFalseTable"
          v-show="createForm.questionType === 'trueFalse'"
          :data="createForm.optionsTrueFalse.questionOptionsData"
          style="width: 100%"
        >
          <el-table-column
            label="正确"
            width="60"
            align="center"
          >
            <template slot-scope="scope">
              <el-radio v-model="createForm.optionsTrueFalse.trueOption" :label="scope.row.number">
&nbsp;
              </el-radio>
            </template>
          </el-table-column>
          <el-table-column
            label="编号"
            width="60"
            align="center"
            prop="number"
          />
          <el-table-column
            label="描述"
            prop="content"
          />
        </el-table>
      </el-form-item>
    </el-form>

    <div class="operation-bar">
      <el-button @click="submit('createForm')" type="primary">
        提交
      </el-button>
      <el-button @click="handleBack">
        返回
      </el-button>
    </div>
  </el-main>
</template>

<script>
import { addQuestion, getQuestionDetails, modifyQuestion } from '@/request/api'
export default {
  name: 'Create',
  data () {
    return {
      questionType: [
        { label: '单选', value: 'single' },
        { label: '多选', value: 'multi' },
        { label: '判断', value: 'trueFalse' }
      ],
      createForm: {
        questionLibName: '',
        questionType: 'single',
        // optionsNumber: 4,
        questionName: '',
        optionsSingle: {
          trueOption: 'A',
          questionOptionsData: [{ number: 'A', content: '', istrue: 1 }, { number: 'B', content: '', istrue: 0 }, { number: 'C', content: '', istrue: 0 }, { number: 'D', content: '', istrue: 0 }]
        },
        optionsMulti: {
          trueOption: [],
          questionOptionsData: [{ number: 'A', content: '', istrue: 0 }, { number: 'B', content: '', istrue: 0 }, { number: 'C', content: '', istrue: 0 }, { number: 'D', content: '', istrue: 0 }]
        },
        optionsTrueFalse: {
          trueOption: 'A',
          questionOptionsData: [{ number: 'A', content: '正确', istrue: 1 }, { number: 'B', content: '错误', istrue: 0 }]
        }
      },
      rules: {
        questionLibName: [
          { required: true, message: '请输入试题名称', trigger: 'blur' }
        ],
        questionType: [
          { required: true, message: '请选择试题类型', trigger: 'blur' }
        ],
        // options: [
        //   { required: true, message: '请输入选项数', trigger: 'blur' }
        // ],
        questionName: [
          { required: true, message: '请输入题目', trigger: 'blur' }
        ]
      },
      editMode: false,
      bank_id: '',
      bank_name: ''
    }
  },
  computed: {
    addSingleParam: function () {
      return {
        bank_id: parseInt(this.bank_id),
        bank_name: this.bank_name,
        type: this.createForm.questionType,
        subject: this.createForm.questionName,
        options: this.createForm.optionsSingle.questionOptionsData.map(item => {
          if (this.createForm.optionsSingle.trueOption === item.number) {
            item.istrue = 1
          } else {
            item.istrue = 0
          }
          return item
        })
      }
    },
    addMultiParam: function () {
      return {
        bank_id: parseInt(this.bank_id),
        bank_name: this.bank_name,
        type: this.createForm.questionType,
        subject: this.createForm.questionName,
        options: this.createForm.optionsMulti.questionOptionsData
      }
    },
    addTrueFalseParam: function () {
      return {
        bank_id: parseInt(this.bank_id),
        bank_name: this.bank_name,
        type: this.createForm.questionType,
        subject: this.createForm.questionName,
        options: this.createForm.optionsTrueFalse.questionOptionsData.map(item => {
          if (this.createForm.optionsTrueFalse.trueOption === item.number) {
            item.istrue = 1
          } else {
            item.istrue = 0
          }
          return item
        })
      }
    }
  },
  mounted: function () {
    this.questionId = this.$route.params.id
    this.bank_id = this.$route.params.bank_id || localStorage.getItem('bank_id')
    this.bank_name = this.$route.params.bank_name || localStorage.getItem('bank_name')
    this.createForm.questionLibName = this.bank_name
    if (this.$route.name === 'question-edit') {
      this.editMode = true
      let id = this.questionId
      getQuestionDetails({ id: id }).then(res => {
        this.createForm.questionName = res.data.subject
        this.createForm.questionType = res.data.type
        if (res.data.type === 'single') {
          this.createForm.optionsSingle.questionOptionsData = res.data.options
          this.createForm.optionsSingle.trueOption = res.data.options.filter(item => item.istrue === 1)[0].number
        } else if (res.data.type === 'multi') {
          this.createForm.optionsMulti.questionOptionsData = res.data.options
          this.createForm.optionsMulti.questionOptionsData.map(item => {
            if (item.istrue === 1) {
              this.$nextTick(() => {
                this.$refs.multipleTable.toggleRowSelection(item, true)
              })
            }
          })
        } else {
          this.createForm.optionsTrueFalse.questionOptionsData = res.data.options
          this.createForm.optionsTrueFalse.trueOption = res.data.options.filter(item => item.istrue === 1)[0].number
        }
      })
    }
    this.$store.commit('$_setBreadCrumb', { isShow: true,
      list: [
        { name: '题库管理', path: '/questionLib' },
        { name: '题库编辑', path: '/questionLib/edit' },
        { name: this.editMode ? '编辑试题' : '创建试题' }
      ] })
  },
  methods: {
    handleCheckboxClick (selection, row) {
      // let checked = false
      // let multiOptionData = this.createForm.optionsMulti.questionOptionsData
      if (selection.length === 0) {
        row.istrue = 0
      }
      selection.map(item => {
        if (item.number === row.number) {
          row.istrue = 1
        } else {
          row.istrue = 0
        }
      })

      // console.log(row)
    },
    handleSelectionChange (val) {
      this.createForm.optionsMulti.trueOption = val
    },
    submit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params
          let hasValFlag = true
          if (this.createForm.questionType === 'single') {
            this.createForm.optionsSingle.questionOptionsData.some(item => {
              if (item.content === '') {
                this.$message.error('请填写单选选择题选项内容！')
                hasValFlag = false
                return true
              }
            })
            if (!hasValFlag) {
              return false
            }
            params = this.addSingleParam
          } else if (this.createForm.questionType === 'multi') {
            if (this.createForm.optionsMulti.trueOption.length === 0) {
              this.$message.error('请至少勾选一个选项！')
              return false
            }
            this.createForm.optionsMulti.questionOptionsData.some(item => {
              if (item.content === '') {
                this.$message.error('请填写多项选择题选项内容！')
                hasValFlag = false
                return true
              }
            })
            if (!hasValFlag) {
              return false
            }
            params = this.addMultiParam
          } else {
            params = this.addTrueFalseParam
          }
          // eslint-disable-next-line no-console
          console.log(params)
          if (this.editMode) {
            params.id = this.questionId
            modifyQuestion(params).then(res => {
              this.$message.success(res.message)
              this.$router.push({ name: 'questionLib-edit' })
            })
          } else {
            addQuestion(params).then(res => {
              this.$message.success(res.message)
              this.$router.push({ name: 'questionLib-edit' })
            })
          }
        } else {
          return false
        }
      })
    },
    handleBack () {
      this.$router.push({ path: '/questionLib/edit' })
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
  .multiTable {
     th:first-child{
      .cell{
        .el-checkbox{display: none}
        &:after{content: '正确';display: inline-block;width:40px}
      }
    }
  }
}
</style>
