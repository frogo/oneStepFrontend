<template>
  <el-main class="page-questionCreate">
    <h2 class="pageName">
      {{ editMode ? '编辑试题' : '创建试题' }}
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
        <div v-show="createForm.questionType === 'single'" class="single">
          <el-table
            ref="singleTable"
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
              :formatter="optionFormat"
              label="选项"
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
            <el-table-column
              label=""
            >
              <template slot-scope="scope">
                <el-button
                  v-if="createForm.optionsSingle.questionOptionsData.length > 4 && createForm.optionsSingle.questionOptionsData.length === scope.row.number"
                  @click="removeOption('single',scope.row)" type="danger" size="mini"
                >
                  移除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <p class="add_btn">
            <i @click="addOption('single')" class="el-icon-circle-plus-outline" />
            <!--            <el-button @click="addOption('single')" type="success" icon="el-icon-circle-plus-outline">-->
            <!--              增加选项-->
            <!--            </el-button>-->
          </p>
        </div>
        <div v-show="createForm.questionType === 'multi'" class="multi">
          <el-table
            ref="multipleTable"
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
              :formatter="optionFormat"
              label="选项"
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
            <el-table-column
              label=""
            >
              <template slot-scope="scope">
                <el-button
                  v-if="createForm.optionsMulti.questionOptionsData.length > 4 && createForm.optionsMulti.questionOptionsData.length === scope.row.number"
                  @click="removeOption('multi',scope.row)" type="danger" size="mini"
                >
                  移除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <p class="add_btn">
            <i @click="addOption('multi')" class="el-icon-circle-plus-outline" />
            <!--            <el-button @click="addOption('multi')" type="success" icon="el-icon-circle-plus-outline">-->
            <!--              增加选项-->
            <!--            </el-button>-->
          </p>
        </div>
        <div v-show="createForm.questionType === 'trueFalse'" class="trueFalse">
          <el-table
            ref="trueFalseTable"
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
              :formatter="optionFormat"
              label="选项"
              width="60"
              align="center"
              prop="number"
            />
            <el-table-column
              label="描述"
              prop="content"
            />
          </el-table>
        </div>
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
          trueOption: 1,
          questionOptionsData: [{ number: 1, content: '', istrue: 1 }, { number: 2, content: '', istrue: 0 }, { number: 3, content: '', istrue: 0 }, { number: 4, content: '', istrue: 0 }]
        },
        optionsMulti: {
          trueOption: [],
          questionOptionsData: [{ number: 1, content: '', istrue: 0 }, { number: 2, content: '', istrue: 0 }, { number: 3, content: '', istrue: 0 }, { number: 4, content: '', istrue: 0 }]
        },
        optionsTrueFalse: {
          trueOption: 1,
          questionOptionsData: [{ number: 1, content: '正确', istrue: 1 }, { number: 2, content: '错误', istrue: 0 }]
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
          // this.createForm.optionsSingle.questionOptionsData = res.data.options.map(item => {
          //   item.number = String.fromCharCode(64 + parseInt(item.number))
          //   return item
          // })
          this.createForm.optionsSingle.trueOption = res.data.options.filter(item => item.istrue === 1)[0].number
        } else if (res.data.type === 'multi') {
          this.createForm.optionsMulti.questionOptionsData = res.data.options
          // this.createForm.optionsMulti.questionOptionsData = res.data.options.map(item => {
          //   item.number = String.fromCharCode(64 + parseInt(item.number))
          //   return item
          // })
          this.createForm.optionsMulti.questionOptionsData.map(item => {
            if (item.istrue === 1) {
              this.$nextTick(() => {
                this.$refs.multipleTable.toggleRowSelection(item, true)
              })
            }
          })
        } else {
          this.createForm.optionsTrueFalse.questionOptionsData = res.data.options
          // this.createForm.optionsTrueFalse.questionOptionsData = res.data.options.map(item => {
          //   item.number = String.fromCharCode(64 + parseInt(item.number))
          //   return item
          // })
          this.createForm.optionsTrueFalse.trueOption = res.data.options.filter(item => item.istrue === 1)[0].number
        }
      })
    }
  },
  methods: {
    removeOption (type, row) { // 删除选项
      if (type === 'single') {
        this.createForm.optionsSingle.questionOptionsData.splice(row.number - 1, 1)
        if (this.createForm.optionsSingle.trueOption === row.number) {
          this.createForm.optionsSingle.trueOption = row.number - 1
        }
      } else if (type === 'multi') {
        this.createForm.optionsMulti.questionOptionsData.splice(row.number - 1, 1)
        let index = this.createForm.optionsMulti.trueOption.indexOf(row.number)
        if (index !== -1) {
          this.createForm.optionsMulti.trueOption.splice(index, 1)
        }
      }
    },
    addOption (type) { // 增加选项
      if (type === 'single' && this.createForm.optionsSingle.questionOptionsData.length < 26) {
        let option = { number: this.createForm.optionsSingle.questionOptionsData.length + 1, content: '', istrue: 0 }
        this.createForm.optionsSingle.questionOptionsData.push(option)
      } else if (type === 'multi' && this.createForm.optionsMulti.questionOptionsData.length < 26) {
        let option = { number: this.createForm.optionsMulti.questionOptionsData.length + 1, content: '', istrue: 0 }
        this.createForm.optionsMulti.questionOptionsData.push(option)
      }
    },
    optionFormat (row, column, cellValue, index) { // 1234转ABCD
      return String.fromCharCode(64 + parseInt(cellValue))
    },
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
    .add_btn{ padding: 10px 0;
      i{
       font-size: 25px;color:#666666;cursor: pointer; margin-left: 80px;
    }}
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
