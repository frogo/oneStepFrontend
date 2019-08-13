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

          <el-input v-model="createForm.qualifiedPercent" placeholder="请输入" class="w200" /> %
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

        <div class="questionsChoose">
          <div class="head">
            <span>题库列表</span>
            <span class="notice">C#中的类</span>
          </div>
          <div class="list">
            <div class="questionLib">
              <div class="keyword-input">
                <el-input
                  v-model="questionsLib.keyword"
                  @keyup.enter.native="handleSearch"
                  placeholder="请输入内容"
                  size="medium "
                >
                  <i slot="suffix" @click="handleQuestionsSearch" class="el-input__icon el-icon-search" />
                </el-input>
              </div>
              <ul>
                <li v-for="(item, index) in questionLibData" :key="`lib_${index}`">
                  <el-radio v-model="questionsLib.radio" :label="item.id" /> <span class="name">{{ item.name }}</span> <span class="total">({{ item.total }})</span>
                </li>
              </ul>
            </div>
            <div class="questions">
              <div class="manual">
                <div class="selected-block">
                  <div class="operator">
                    <el-badge :value="12">
                      <el-button @click="boxShow = !boxShow" size="small">
                        已添加  <i v-if="!boxShow" class="el-icon-arrow-up" />
                        <i v-else class="el-icon-arrow-down" />
                      </el-button>
                    </el-badge>
                  </div>
                  <transition name="myBox">
                    <div v-show="boxShow" class="box">
                      <el-tag
                        v-for="tag in paperSelected"
                        :key="tag.name"
                        @close="handleClose(tag)"
                        closable
                        size="small"
                        effect="plain"
                      >
                        {{ tag.name }}
                      </el-tag>
                    </div>
                  </transition>
                </div>
                <el-form ref="filterForm" :model="filterForm" label-width="60px" size="mini">
                  <el-form-item label="题型：">
                    <el-radio-group v-model="filterForm.type">
                      <el-radio :label="item" v-for="item in type" :key="item" border />
                    </el-radio-group>
                  </el-form-item>
                </el-form>

                <el-table
                  ref="multipleTable"
                  :data="paperTableData"
                  @selection-change="handlePaperSelectionChange"
                  tooltip-effect="dark"
                  style="width: 100%"
                  height="260"
                  stripe
                >
                  <el-table-column
                    type="selection"
                    width="55"
                  />
                  <el-table-column
                    prop="title"
                    label="题目"
                    show-overflow-tooltip
                  />
                  <el-table-column
                    prop="type"
                    label="题型"
                    width="120"
                  />
                </el-table>
              </div>
            </div>
          </div>
        </div>
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
      paperRules: [{ label: '手动出题', value: 'manual' }, { label: '随机出题', value: 'random' }],
      questionsLib: {
        keyword: '',
        radio: 46
      },
      questionLibData: [
        { name: '多大的', id: 45, total: 98 },
        { name: '多大的', id: 46, total: 98 },
        { name: '多大的', id: 47, total: 98 },
        { name: '多大的', id: 47, total: 98 },
        { name: '多大的', id: 47, total: 98 },
        { name: '多大的', id: 47, total: 98 },
        { name: '多大的', id: 47, total: 98 },
        { name: '多大的', id: 47, total: 98 },
        { name: '多大的', id: 47, total: 98 },
        { name: '多大的', id: 47, total: 98 },
        { name: '多大的', id: 47, total: 98 },
        { name: '多大的', id: 47, total: 98 }
      ],
      filterForm: {
        type: '不限'
      },
      type: ['不限', '单选', '多选', '判断'],
      paperTableData: [
        {
          type: '单选',
          title: '类与对象的关系'
        },
        {
          type: '多选',
          title: '类与对象'
        },
        {
          type: '判断',
          title: '静态类的声明'
        },
        {
          type: '单选',
          title: '类与对象的关系'
        }
      ],
      paperSelected: [{
        name: '标签一'
      },
      {
        name: '标签二'
      },
      {
        name: '标签三'
      }
      ],
      boxShow: false
    }
  },
  mounted: function () {
  },
  methods: {
    handleSavePaperDraft () {

    },
    handleSavePaper () {

    },
    handleQuestionsSearch () {

    },
    handlePaperSelectionChange () {

    },
    toggleBox () {
      this.boxShow = !this.boxShow
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
    .el-input.w200{width:200px}
    .el-select.w200{width:200px}
    .el-textarea{width:400px}
    .qualifiedPercent{.label{display: inline-block;justify-content: flex-start;span{ margin-right: 5px;i{color:#8c939d;}}}}
    .questionsChoose{

      margin:20px 0;
      .head{padding:0 15px;background: #fafafa;height:30px;line-height: 30px;display: flex;justify-content: space-between;
        span{color:#999;display: inline-block;&:nth-child(1){width:28%}&:nth-child(2){width:70%}}
      }
      .list{
        display: flex;
        justify-content: space-between;
        border: 1px solid #efefef;
        .questionLib{width:28%;border-right: 1px solid #efefef;
          .keyword-input{padding:15px 15px 0 15px}
          ul{padding: 15px;
            height: 260px;
            overflow: auto;
            li{
          line-height: 26px;
          .el-radio{
            .el-radio__label{display: none}
          }
          span{display: inline-block;&.name{width:130px;}&.total{width:60px;text-align: right }}
        }}}
        .questions{width:70%;
          min-height: 400px;
          position: relative;
          /*.el-badge{ position: absolute;bottom:-5px;left:49%}*/
          .selected-block{
            /*box-shadow: 0px 0px 5px #888888;*/
            box-shadow: 0px -12px 10px -10px #888888;
            .box{
              height:200px;

              overflow: hidden;
            }
            .myBox-leave-active,.myBox-enter-active{
              transition:  all 1s ease;
            }
            .myBox-leave-active,.myBox-enter{
              height:0px !important;
            }
            .myBox-leave,.myBox-enter-active{
              height: 200px;
            }
            /*box-shadow:inset 0px 15px 10px -15px #000;*/
            padding: 10px;
            border: 1px solid #efefef;
            border-radius: 5px 5px 0 0 ;
            .operator{position: absolute;top:-30px;left:45%}
            width:100%;
            height:auto;
            position: absolute;
            left:0;bottom:0;background:#efefef;;z-index: 2;
            .el-tag{ margin-right: 10px}
          }
          .manual{
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
      }
    }
  }
  .operation-bar{
    display: flex;justify-content:center;
    .el-button{width:100px}
  }

}
</style>
