<template>
  <el-main class="page-paperCreate">
    <h2 class="pageName">
      创建试卷
    </h2>
    <el-form ref="createForm" :model="createForm" :rules="rules" label-position="left" label-width="120px" class="createForm">
      <div class="head-line">
        <span class="base-info">基本信息</span>
      </div>
      <div class="inline-form">
        <el-form-item label="试卷名称" prop="paperName">
          <el-input v-model="createForm.paperName" placeholder="请输入" class="w200" />
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

          <el-input v-model.number="createForm.qualifiedPercent" placeholder="请输入" class="w200" /> %
        </el-form-item>
      </div>
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
        <el-input v-model.number="createForm.hours" placeholder="请输入" class="w200" /> 分钟
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
        <el-select v-model="createForm.rules" @change="handleRulesSwitch(createForm.rules)" placeholder="请选择" style="width:200px">
          <el-option
            v-for="item in paperRules"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>

        <div class="questionsChoose">
          <div class="head">
            <span>题库列表</span>
            <span v-if="createForm.rules === 'manual'" class="notice">{{ manual.currentQuestionLib.name }}</span>
            <span v-else class="notice" title="提示：各题库题型后面的数字，左边为抽取题数，右边为题库中该题型的总数，抽取题数不得大于题型总数，请填写需要抽取的题型整数">提示：各题库题型后面的数字，左边为抽取题数，右边为题库中该题型的总数，抽取题数不得大于题型总数，请填写需要抽取的题型整数</span>
          </div>
          <div class="list">
            <div v-show="createForm.rules === 'manual'" class="manual">
              <div class="questionLib">
                <div class="keyword-input">
                  <el-input
                    v-model="questionsLib.keyword"
                    @keyup.enter.native="handleQuestionsSearch"
                    placeholder="请输入内容"
                    size="medium "
                  >
                    <i slot="suffix" @click="handleQuestionsSearch" class="el-input__icon el-icon-search" />
                  </el-input>
                </div>
                <div class="exTable">
                  <ex-table
                    ref="exTableQuestionLib"
                    :data="questionLibDataRemote"
                    :reload-method="handleQuestionLibReload"
                    @current-change="handleQuestionLibCurrentChange"
                    :show-pagination="false"
                    tooltip-effect="dark"
                    highlight-current-row
                    height="480"
                  >
                    <el-table-column
                      type="index"
                      width="40"
                    />
                    <el-table-column
                      prop="name"
                      label="题库名"
                      show-overflow-tooltip
                    />
                    <el-table-column
                      prop="num"
                      label="试题数"
                      width="70"
                    />
                  </ex-table>
                </div>
              </div>
              <div class="questions">
                <div class="selected-block">
                  <div class="operator">
                    <el-badge :value="manual.questionSelected.length">
                      <el-button @click="manual.questionSelectedBoxShow = !manual.questionSelectedBoxShow" size="small">
                        已添加  <i v-if="!manual.questionSelectedBoxShow" class="el-icon-arrow-up" />
                        <i v-else class="el-icon-arrow-down" />
                      </el-button>
                    </el-badge>
                  </div>
                  <transition name="myBox">
                    <div v-show="manual.questionSelectedBoxShow" class="box">
                      <el-tag
                        v-for="(item, index) in manual.questionSelected"
                        :key="item.subject + index"
                        @close="handleDeleteQuestionSelected(item)"
                        closable
                        size="small"
                        effect="plain"
                      >
                        {{ item.subject }} {{ item.id }}
                      </el-tag>
                    </div>
                  </transition>
                </div>
                <el-form ref="filterForm" :model="manual.filterForm" label-width="60px" size="mini">
                  <el-form-item label="题型：">
                    <el-radio-group v-model="manual.filterForm.type" @change="handleRulesSwitch">
                      <el-radio :label="item" v-for="item in manual.filterForm.typeList" :key="item" border />
                    </el-radio-group>
                  </el-form-item>
                </el-form>

                <div class="exTable exTableQuestion">
                  <ex-table
                    ref="exTableQuestion"
                    :data="manual.questionTableData"
                    :reload-method="handleQuestionReload"
                    @selection-change="handleQuestionCurrentChange"
                    @select="handleQuestionClick"
                    tooltip-effect="light"
                    height="320"
                  >
                    <el-table-column
                      type="selection"
                      width="55"
                    />
                    <el-table-column
                      prop="subject"
                      label="题目"
                      show-overflow-tooltip
                    />
                    <el-table-column
                      prop="id"
                      label="id"
                      show-overflow-tooltip
                    />
                    <el-table-column
                      prop="type"
                      label="题型"
                      width="120"
                    />
                  </ex-table>
                </div>
              </div>
            </div>

            <div v-show="createForm.rules === 'random'" class="random">
              <div class="questionLib">
                <div class="keyword-input">
                  <el-input
                    v-model="questionsLib.keyword"
                    @keyup.enter.native="handleQuestionsSearch"
                    placeholder="请输入内容"
                    size="medium "
                  >
                    <i slot="suffix" @click="handleQuestionsSearch" class="el-input__icon el-icon-search" />
                  </el-input>
                </div>
                <div class="exTable">
                  <ex-table
                    ref="exTableQuestionLib"
                    :data="questionLibDataRemote"
                    :reload-method="handleQuestionLibReload"
                    @selection-change="handleQuestionLibListChange"
                    @select="handleQuestionLibClick"
                    :show-pagination="false"
                    tooltip-effect="dark"
                    height="480"
                  >
                    <el-table-column
                      type="selection"
                      width="55"
                    />
                    <el-table-column
                      prop="name"
                      label="题库名"
                      show-overflow-tooltip
                    />
                    <el-table-column
                      prop="num"
                      label="试题数"
                      width="70"
                    />
                  </ex-table>
                </div>
              </div>
              <div class="questions">
                <div class="collect">
                  <span><i>总试题：</i>{{ random.allSingle + random.allMulti + random.allTrueFalse }}</span>
                  <span><i>单项选择题：</i>{{ random.allSingle }}</span>
                  <span><i>多项选择题：</i>{{ random.allMulti }}</span>
                  <span><i>判断题：</i>{{ random.allTrueFalse }}</span>
                </div>
                <ul>
                  <li v-for="(item, index) in random.questionLibSelected" :key="item.name + index">
                    <p class="title">
                      {{ item.name }}
                    </p>
                    <p class="input">
                      <span><i class="red">*</i> 单项选择题
                        <el-input-number v-model="item.single" :min="0" :max="item.single_total" @change="handleCountChange" size="mini" controls-position="right" />

                        / {{ item.single_total }}</span>
                      <span><i class="red">*</i> 多项选择题
                        <el-input-number v-model="item.multiple" :min="0" :max="item.multiple_total" @change="handleCountChange" size="mini" controls-position="right" />
                        / {{ item.multiple_total }}</span>
                      <span><i class="red">*</i> 判断题
                        <el-input-number v-model="item.judge" :min="0" :max="item.judge_total" @change="handleCountChange" size="mini" controls-position="right" />
                        / {{ item.judge_total }}</span>
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </el-form-item>
    </el-form>

    <div class="operation-bar">
      <!--      <el-button @click="handleSavePaperDraft" type="success">-->
      <!--        保存草稿-->
      <!--      </el-button>-->
      <el-button @click="handleSavePaper('createForm')" type="primary">
        完成
      </el-button>
    </div>
  </el-main>
</template>

<script>
import ExTable from '@/components/exTable.js'
import { getQuestionLibList, addExaminationPaper, getQuestionList, getExaminationPaperDetails } from '@/request/api'
import { GetUrlParam } from '@/utility'
export default {
  components: {
    ExTable
  },
  data () {
    let checkQualifiedPercent = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('合格分数比不能为空'))
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'))
        } else {
          if (value > 100) {
            callback(new Error('合格分数比不能大于100'))
          } else {
            callback()
          }
        }
      }, 500)
    }
    let checkHours = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('课时不能为空'))
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'))
        } else {
          callback()
        }
      }, 500)
    }
    return {
      createForm: {
        paperName: '',
        qualifiedPercent: '',
        hours: '',
        randomSequence: true,
        randomOption: false,
        noLookAnswer: false,
        rules: 'manual'
      },
      rules: {
        paperName: [
          { required: true, message: '请输入试题名称', trigger: 'blur' }
        ],
        qualifiedPercent: [
          { required: true, validator: checkQualifiedPercent, trigger: 'blur' }
        ],
        hours: [
          { required: true, validator: checkHours, trigger: 'blur' }
        ]
      },
      paperRules: [{ label: '手动出题', value: 'manual' }, { label: '随机出题', value: 'random' }],
      questionLibDataRemote: [
      ],
      questionsLib: {
        keyword: ''
      },
      manual: {
        currentQuestionLib: '',
        filterForm: {
          type: '不限',
          typeList: ['不限', '单选', '多选', '判断']
        },
        questionTableData: [
        ], // 手动出题，当前选择的题库的试题列表
        questionChecked: [], // 试题列表checkbox 选中状态
        questionSelected: [
        ], // 已选择的试题列表
        questionSelectedBoxShow: false // 已选择试题列表盒子是否隐藏
      },
      random: {
        allSingle: 0,
        allMulti: 0,
        allTrueFalse: 0,
        questionLibSelected: [
        ] // 随机出题，当前已经选择题库
      },
      editMode: false // 编辑模式
    }
  },
  watch: {
  },
  mounted: function () {
    if (this.$route.name === 'paper-edit') {
      this.editMode = true
      let id = GetUrlParam('id')
      getExaminationPaperDetails({ id: id }).then(res => {
        this.createForm = { // 编辑回显数据
          paperName: res.data.name,
          qualifiedPercent: res.data.ratio,
          hours: res.data.minute,
          randomSequence: res.data.is_question_random,
          randomOption: res.data.is_option_random,
          noLookAnswer: res.data.is_show_answer,
          rules: res.data.rule
        }
        if (res.data.rule === 'manual') {
          this.manual.questionSelected = res.data.question
          // console.log(this.manual.questionSelected)
        } else {
          this.random.questionLibSelected = res.data.question_bank
          this.reCount()
          // console.log(this.questionLibDataRemote)
          // console.log('HHHHHH'+ this.random.questionLibSelected[0].id)
          this.questionLibDataRemote.map(item => { // 遍历题库数据和已有题库数据 回显题库数据
            // let bankId = item.id
            // console.log(item.id)
            this.random.questionLibSelected.map(cItem => {
              if (cItem.id === item.id) {
                this.$refs.exTableQuestionLib.toggleRowSelection(item, true)
              }
            })
          })
        }
      })
    }
    // getExaminationPaperDetails
    this.$store.commit('$_setBreadCrumb', { isShow: true,
      list: [
        { name: '首页', path: '/' }, { name: '试卷管理', path: '/paper' }, { name: this.editMode ? '编辑试卷' : '创建试卷' }
      ] })
    this.fetchQuestionLibRemoteData() // 获取题库数据
  },
  methods: {
    handleQuestionLibReload (pagination, { currentPage, pageSize }) {
      this.fetchQuestionLibRemoteData(pagination, currentPage, pageSize)
    },
    fetchQuestionLibRemoteData (pagination, currentPage, pageSize) {
      let param = {
        keyword: this.questionsLib.keyword,
        offset: currentPage || 1,
        limit: pageSize || 10
      }
      let paginationObj = pagination || this.$refs['exTableQuestionLib'].pagination
      getQuestionLibList(param).then(res => {
        this.questionLibDataRemote = res.data.list
        if (paginationObj) {
          paginationObj.total = res.data.total
        }
        // this.$nextTick(() => {
        //   this.$refs.exTableQuestionLib.toggleRowSelection(this.questionLibDataRemote[0], true)
        // })
      })
      this.reCount()
    },
    handleQuestionReload (pagination, { currentPage, pageSize }) {
      this.fetchQuestionRemoteData(pagination, currentPage, pageSize)
    },
    fetchQuestionRemoteData (pagination, currentPage, pageSize) {
      let param = {
        type: this.manual.filterForm.type,
        bank_id: this.manual.currentQuestionLib.id,
        keyword: this.questionsLib.keyword,
        offset: currentPage || 1,
        limit: pageSize || 10
      }
      let paginationObj = pagination || this.$refs['exTableQuestion'].pagination
      getQuestionList(param).then(res => {
        this.manual.questionTableData = res.data.list
        if (paginationObj) {
          paginationObj.total = res.data.total
        }
        // this.$refs.exTableQuestion.toggleRowSelection(this.manual.questionTableData[0], true)
        // console.log(this.manual.questionTableData[0])
        this.manual.questionTableData.map(item => { // 手动选题模式 点击题库，加载试题 遍历 已有试题数据  回显
          // console.log(item.id)
          this.manual.questionSelected.map(cItem => {
            if (item.id === cItem.id) {
              // console.log('---------')
              this.$nextTick(() => {
                this.$refs.exTableQuestion.toggleRowSelection(item, true)
              })
            }
          })
        })
      })
    },
    // handleSavePaperDraft () {
    // },
    paperAddFun () { // 处理试卷添加
      // save paper
      let questionIdList = []
      let questionLibIdList = []
      this.manual.questionSelected.map(item => {
        questionIdList.push(item.id)
      })
      this.random.questionLibSelected.map(item => {
        let obj = {
          id: item.id,
          single: item.single,
          multi: item.multiple,
          judge: item.judge
        }
        questionLibIdList.push(obj)
      })
      let param = {
        'rule': this.createForm.rules,
        'question': questionIdList,
        'question_bank': questionLibIdList,
        'name': this.createForm.paperName,
        'ratio': this.createForm.qualifiedPercent,
        'minute': this.createForm.hours,
        'is_question_random': this.createForm.randomSequence,
        'is_option_random': this.createForm.randomOption,
        'is_show_answer': this.createForm.noLookAnswer
      }
      addExaminationPaper(param).then(res => {
        this.$message.success('添加成功')
      })
      // save paper
    },
    handleSavePaper (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.createForm.rules === 'manual') {
            if (this.manual.questionSelected.length > 0) {
              this.paperAddFun()
            } else {
              this.$message.error('请添加试题')
            }
          } else {
            if (this.random.questionLibSelected.length > 0) {
              this.paperAddFun()
            } else {
              this.$message.error('请添加题库')
            }
          }
        } else {
          return false
        }
      })
    },
    getItemIndex (list, item) { // 根据id获取index
      let itemIndex = -1
      list.map((i, index, array) => {
        if (i.id === item.id) {
          itemIndex = index
        }
      })
      return itemIndex
    },
    // 手动选择 ======================================
    handleQuestionLibCurrentChange (val) { // 左侧题库数据初始
      this.manual.currentQuestionLib = val
      this.fetchQuestionRemoteData()
    },
    handleQuestionsSearch () { // 关键字过滤左侧题库
      this.fetchQuestionLibRemoteData()
    },
    handleRulesSwitch () { // 右侧试题题型切换过滤
      if (!this.manual.currentQuestionLib.id) {
        return false
      }
      this.fetchQuestionRemoteData()
    },
    handleQuestionClick (selection, row) { //  点击checkbox事件,添加试题
      if (this.getItemIndex(this.manual.questionSelected, row) === -1) {
        this.manual.questionSelected.push(row)
      } else {
        this.manual.questionSelected.splice(this.getItemIndex(this.manual.questionSelected, row), 1)
      }
    },
    handleQuestionCurrentChange (val) { // 手动选题 右侧试题选择
      this.manual.questionChecked = val
    },
    handleDeleteQuestionSelected (item) {
      // console.log('ddddddddddd')
      //  console.log(this.manual.questionSelected)
      this.manual.questionSelected.splice(this.getItemIndex(this.manual.questionSelected, item), 1)
      let questionCheckedIndex = this.getItemIndex(this.manual.questionChecked, item) // 判断删除的试题是否在列表中且被选中
      if (questionCheckedIndex !== -1) {
        let questionTableDataIndex = this.getItemIndex(this.manual.questionTableData, item)
        this.$nextTick(() => {
          this.$refs.exTableQuestion.toggleRowSelection(this.manual.questionTableData[questionTableDataIndex], false)
        })
      }
    },
    // 随机选择 ======================================
    handleQuestionLibListChange (list) {
    },
    handleQuestionLibClick (selection, row) { // 随机选题左侧题库选择
      if (this.getItemIndex(this.random.questionLibSelected, row) === -1) {
        let obj = {
          id: row.id,
          name: row.name,
          single_total: row.single_total,
          multiple_total: row.multiple_total,
          judge_total: row.judge_total,
          single: 0,
          multiple: 0,
          judge: 0
        }
        this.random.questionLibSelected.push(obj)
      } else {
        this.random.questionLibSelected.splice(this.getItemIndex(this.random.questionLibSelected, row), 1)
      }
      this.reCount()
    },
    handleCountChange (val) {
      this.reCount()
    },
    reCount () { // 重新计算题型数量
      this.random.allSingle = 0
      this.random.allMulti = 0
      this.random.allTrueFalse = 0
      this.random.questionLibSelected.map(item => {
        this.random.allSingle += item.single
        this.random.allMulti += item.multiple
        this.random.allTrueFalse += item.judge
      })
    }
  }
}
</script>

<style lang="scss">
.page-paperCreate{
  box-shadow: 0 0 5px #888888;
  margin: 0 auto 20px;
  padding: 20px;
  h2.pageName{font-size: 26px}
  .el-form.createForm{
    .inline-form{
      display: flex; justify-content:flex-start;
      .el-form-item{
        margin-right: 50px
      }
    }
    .head-line{margin: 25px 0;height:1px;position:relative;background:#f3f3f3;
      span.base-info{display: inline-block;position: absolute;top:-10px;background: #fff;padding-right: 1em;color:#EF6520}
      i{color:#8c939d}
    }
    .el-input.w200{width:200px}
    .el-select.w200{width:200px}
    .el-textarea{width:400px}
    .qualifiedPercent{
      .label{
        display: inline-block;justify-content: flex-start;
          span{ margin-right: 5px;
                 i{color:#8c939d}
              }
            }
     }
    .questionsChoose{
      margin:20px 0;
      .head{padding:0 15px;background: #fafafa;height:30px;line-height: 30px;display: flex;justify-content: space-between;
        span{color:#999;display: inline-block;
          &:nth-child(1){width:28%}
          &:nth-child(2){width:70%;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}
        }
      }
      .list{
        .manual{
          display: flex;
          justify-content: space-between;
          border: 1px solid #efefef;
          padding-bottom: 20px;
          .questionLib{width:28%;border-right: 1px solid #efefef;
            .keyword-input{padding:15px 15px 0 15px}
            .exTable{
              .el-pagination{
                margin: 10px auto 0;
                text-align: center;
                .el-pagination__total,.el-pagination__sizes,.el-pagination__jump{display: none}
              }
            }
          }
          .questions{
            width:70%;
            min-height: 400px;
            position: relative;
            .exTable{
              .el-table th:first-child{
                .cell{display: none}
              }
            }
            .el-pagination{
              margin: 10px auto 0;
              text-align: right;
            }
            .selected-block{
              box-shadow: 0px -12px 10px -10px #888888;
              padding: 10px;
              border: 1px solid #efefef;
              border-radius: 5px 5px 0 0 ;
              width:100%;
              height:auto;
              position: absolute;
              left:0;bottom:0;background:#fff;z-index: 2;
              .operator{position: absolute;top:-30px;left:45%}
              .box{
                height:200px;
                overflow: hidden
              }
              .myBox-leave-active,.myBox-enter-active{
                transition:  all 1s ease
              }
              .myBox-leave-active,.myBox-enter{
                height:0px !important
              }
              .myBox-leave,.myBox-enter-active{
                height: 200px
              }
              .el-tag{ margin-right: 10px}
            }
              .el-form{
                padding: 15px 0;
                .el-form-item{border-bottom: 1px dashed #ccc;padding-bottom: 10px; margin-bottom: 10px;
                  .el-radio{ margin-right: 0;
                    .el-radio__input{display:none}
                    .el-radio__label{padding-left: 6px}
                    .el-checkbox-button__inner{padding: 8px 15px}
                  }
                }
              }
          }
        }
        .random{
          display: flex;
          justify-content: space-between;
          border: 1px solid #efefef;
          padding-bottom: 20px;
          .questionLib {
            width: 28%;
            border-right: 1px solid #efefef;
            .keyword-input {
              padding: 15px 15px 0 15px
            }
            .exTable{
                .el-table th:first-child{
                  .cell{display: none}
                }
              .el-pagination{
                margin: 10px auto 0;
                text-align: center;
                .el-pagination__total,.el-pagination__sizes,.el-pagination__jump{display: none}
              }
            }
           /* .el-table td, .el-table th{padding: 6px 0}*/
          }
          .questions{
            width:70%;
            min-height: 400px;
            position: relative;

            .collect{
              display: flex;
              justify-content: space-around;
              padding: 15px 0;
              border-bottom: 1px solid #efefef;
              span{display: inline-block;color:red;font-size: 24px;position: relative;width:25%;text-align: center;height:40px;
              i{position: absolute;left:0;top:0;font-style: normal;font-size: 12px;display: inline-block;height:20px;color:#999;line-height: 20px}
              }
            }
            ul{
              height:460px;overflow: auto;
              li {
                border-bottom: 1px dashed #efefef;
                padding: 10px 0;
                .title{ font-size: 16px;color:#666}
                .input{display: flex;justify-content: space-between;
                  span{width:33%;color:#999;i{font-style: normal;}}
                }
                .el-input-number--mini{width:88px}
              }
            }
          }
        }
      }
    }
  }
  .operation-bar{
    display: flex;justify-content:center;
    .el-button{width:100px}
  }
}
</style>
