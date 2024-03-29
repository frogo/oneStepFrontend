<template lang="html">
  <el-container class="main-content page-project">
    <AsideMenu />
    <el-main>
      <div class="filter-box">
        <el-button @click="gotoCreate" type="primary" class="add-button">
          创建项目
        </el-button>
        <div class="keyword-input">
          <el-input
            v-model="keyword"
            @keyup.enter.native="handleSearch"
            placeholder="请输入内容"
            size="medium "
          >
            <i slot="suffix" @click="handleSearch" class="el-input__icon el-icon-search" />
          </el-input>
        </div>
        <el-form ref="filterForm" :model="filterForm" label-width="60px" size="mini">
          <el-form-item label="状态：">
            <el-radio-group v-model="filterForm.status" @change="handleChangeStatus">
              <el-radio :label="item.label" v-for="item in status" :key="item.label" border>
                {{ item.name }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
      <div class="project-block">
        <span class="btn_option">
          <el-checkbox v-model="byEndTime" @change="getProjectListByEndTime">按结束时间排序</el-checkbox>
        </span>
        <el-tabs v-model="activeName">
          <el-tab-pane name="card">
            <span slot="label"><i class="el-icon-menu" /> </span>
            <el-row style="padding-left: 35px">
              <el-col :span="5" v-for="(item, index) in projectList" :key="`project_card_${index}`" :offset="index%4 ==0 ? 0 : 1">
                <el-card class="project-card">
                  <div :class="`status-bg ${statusMap.bg[item.status]}`">
                    <span @click="handlePending(item)" v-if="item.is_review" class="special-status">待审批</span>
                    <span>{{ statusMap.txt[item.status] }}</span>
                  </div>
                  <div @click="gotoDetails(item)" class="headline">
                    {{ item.name }}
                  </div>
                  <div class="date">
                    <p>发布时间： {{ item.start_time }}</p>
                    <p>结束时间： {{ item.end_time }}</p>
                  </div>
                  <div class="percent">
                    <span class="person-num"><i class=" el-icon-user" /> {{ item.join_num }}</span>
                    <el-progress :percentage="item.join_num === 0 ? 0 : Math.round(item.complete_num / item.join_num * 100)" :stroke-width="3" />
                  </div>
                  <div class="mask">
                    <div class="operate">
                      <div @click="handleEdit(item.id)" class="item">
                        <p class="icon">
                          <i class="el-icon-edit" />
                        </p>
                        <p class="text">
                          编辑
                        </p>
                      </div>
                      <div @click="handleView(item.id)" class="item">
                        <p class="icon">
                          <i class="el-icon-view" />
                        </p>
                        <p class="text">
                          预览
                        </p>
                      </div>
                      <div @click="handleOffline(item)" class="item">
                        <p class="icon">
                          <i class="el-icon-download" />
                        </p>
                        <p class="text">
                          {{ item.status === 0 ? '上线' : '下线' }}
                        </p>
                      </div>
                      <div @click="handleDelete(item.id)" class="item">
                        <p class="icon">
                          <i class="el-icon-delete" />
                        </p>
                        <p class="text">
                          删除
                        </p>
                      </div>
                    </div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane name="list">
            <span slot="label"><i class="el-icon-bank-card" /> </span>
            <div v-for="(item, index) in projectList" :key="`project_list_${index}`" class="project-list">
              <span @click="handlePending(item)" v-if="item.is_review" class="pending">待审批</span>
              <el-row :gutter="20">
                <el-col :span="2">
                  <el-progress :percentage="item.join_num === 0 ? 0 : Math.round(item.complete_num / item.join_num * 100)" :width="52" :stroke-width="4" type="circle" />
                </el-col>
                <el-col :span="16">
                  <div class="headline">
                    <span @click="gotoDetails(item)" class="status">[{{ statusMap.txt[item.status] }}]</span>{{ item.name }}
                  </div>
                  <div class="pieces">
                    <span>发布时间： {{ item.start_time }}</span>  <span class="end-date">结束时间： {{ item.end_time }}</span>  <span class="person-num"><i class=" el-icon-user" /> {{ item.join_num }}</span>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="operate-item">
                    <span @click="handleEdit(item.id)"><i class="el-icon-edit" /> 编辑</span>
                    <span @click="handleView(item.id)"><i class="el-icon-view" /> 预览</span>
                    <span @click="handleOffline(item)"><i class="el-icon-download" />{{ item.status === 0 ? '上线' : '下线' }}</span>
                    <span @click="handleDelete(item.id)"><i class="el-icon-delete" /> 删除</span>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-tab-pane>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pagination.currentPage"
            :page-sizes="[8, 16, 24]"
            :page-size="pagination.pageSize"
            :total="pagination.total"
            layout="total, sizes, prev, pager, next, jumper"
          />
        </el-tabs>
      </div>
    </el-main>
    <el-dialog
      :visible.sync="viewProjectDialogVisible"
      :title="projectDetails.name"
      class="projectViewDialog"
    >
      <div class="project-view-box">
        <ul>
          <li class="flex">
            <span class="obj"><i>参训对象：</i><em :title="projectDetails.obj">{{ projectDetails.obj }}</em></span>
            <span class="num"><i>目标人数：</i>{{ projectDetails.target_num }}</span>
          </li>
          <li class="flex">
            <span class="startTime"><i>开始日期：</i>{{ projectDetails.start_time }}</span>
            <span class="endTime"><i>结束日期：</i>{{ projectDetails.end_time }}</span>
          </li>
          <li class="intro">
            <div class="head">
              项目简介：
            </div>
            <div class="content intro">
              {{ projectDetails.introduction }}
            </div>
          </li>
          <li style="display:flex;justify-content: space-between">
            <div class="left" style="width:50%">
              <div class="head">
                包含课程：
              </div>
              <p v-for="(item, index) in projectDetails.lesson_info" :key="item + index">
                {{ item.name }}
              </p>
            </div>
            <div class="right" style="width:150px;text-align: center">
              <img ref="qrcode" :src="projectDetails.wx_qrcode">
              <el-button @click="handleDownloadQrCode" type="primary" size="small">
                下载培训项目二维码
              </el-button>
            </div>
            <!--            <div class="content">
              <div class="qrCode">

              </div>
            </div>-->
          </li>
          <li class="copyLink">
            <el-input id="url" :value="projectDetails.wx_url" /> <el-button @click="copyUrl2">
              复制链接
            </el-button>
          </li>
        </ul>
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync="approvalProjectDialogVisible"
      title="报名审批"
      width="50%"
      class="projectApprovalDialog"
    >
      <div class="btn-box">
        <el-button :disabled="multiplePendingSelection.length > 0 ? false: true" @click="handleNoPass(multiplePendingSelection)" type="success" size="small">
          批量通过
        </el-button>
        <el-button :disabled="multiplePendingSelection.length > 0 ? false: true" @click="handlePass(multiplePendingSelection)" type="primary" size="small">
          批量不通过
        </el-button>
      </div>

      <div class="exTable">
        <ex-table
          ref="exTableApprovalList"
          :data="pendingTableData"
          :header-cell-style="{background:'#fafafa',color:'#909399'}"
          @selection-change="handleSelectionChange"
          :reload-method="handleReload"
          tooltip-effect="dark"
          show-pagination stripe
        >
          <el-table-column
            type="selection"
            width="55"
          />
          <el-table-column
            prop="name"
            label="学员姓名"
          />
          <el-table-column
            prop="phone"
            label="联系电话"
            width="150"
            align="center"
          />
          <el-table-column
            prop="add_time"
            label="申请时间"
            width="150"
            align="center"
          />
          <el-table-column
            label="操作"
            align="center"
            width="150"
          >
            <template slot-scope="scope">
              <el-button
                @click="handlePass([scope.row])"
                size="mini"
                type="text"
                style="color:dodgerblue"
              >
                通过
              </el-button>
              <el-button
                @click="handleNoPass([scope.row])"
                size="mini"
                type="text"
              >
                不通过
              </el-button>
            </template>
          </el-table-column>
        </ex-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCloseApprovalProjectDialog" type="primary">退出</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>
<script>
// import { mapState, mapMutations } from 'vuex'
import { getProjectList, getProjectDetails, deleteProject, onLineProject, approvalProject, getApprovalList } from '@/request/api'
import AsideMenu from '@/components/asideMenu'
import ExTable from '@/components/exTable.js'
import { GetUrlParam } from '@/utility'
export default {
  components: {
    AsideMenu,
    ExTable
  },
  data () {
    return {
      byEndTime: false,
      activeName: 'card',
      keyword: '',
      filterForm: {
        status: 'all'
      },
      status: [
        { label: 'all', name: '全部' },
        { label: 1, name: '发布中' },
        { label: 2, name: '草稿' },
        { label: 0, name: '下线' }
      ],
      projectList: [], // 项目列表远程数据
      statusMap: {
        bg: { 0: 'gray', 1: 'green', 2: 'blue' },
        txt: { 0: '已下线', 1: '进行中', 2: '编辑中' }
      },
      viewProjectDialogVisible: false,
      approvalProjectDialogVisible: false,
      pendingTableData: [],
      multiplePendingSelection: '',
      pagination: {
        currentPage: 1,
        pageSize: 8,
        total: 8
      },
      projectDetails: '',
      projectId: ''
    }
  },
  computed: {
    getProjectListParam: function () {
      return {
        keyword: this.keyword,
        status: this.filterForm.status,
        offset: this.pagination.currentPage,
        limit: this.pagination.pageSize,
        order: this.byEndTime ? 'end_time' : ''
      }
    }
  },
  watch: {
  },
  mounted: function () {
    this.$route.params.id && this.handleView(this.$route.params.id)
    GetUrlParam('id') && this.handleView(GetUrlParam('id'))
    if (GetUrlParam('from') && GetUrlParam('from') === 'expire') {
      this.byEndTime = true
      this.filterForm.status = 1
    }
    this.getProjectList()
  },
  methods: {
    getProjectListByEndTime () {
      this.getProjectList()
    },
    handleDownloadQrCode () {
      this.downloadImage1(this.$refs.qrcode.src, '二维码')
    },
    async downloadImage1 (url, name) {
      var canvas = document.createElement('canvas')
      var ctx = canvas.getContext('2d')
      var img = new Image()
      img.crossOrigin = 'Anonymous'
      img.onload = function () {
        canvas.height = img.height
        canvas.width = img.width
        ctx.drawImage(img, 0, 0)
        var dataURL = canvas.toDataURL('image/png')
        let a = document.createElement('a')
        a.href = dataURL
        a.download = name
        document.body.appendChild(a)
        a.click()
        setTimeout(() => {
          document.body.removeChild(a)
          canvas = null
        }, 1000)
      }
      img.src = url
    },
    downloadImage (selector, name) {
      let image = new Image()
      // 解决跨域 Canvas 污染问题
      image.setAttribute('crossOrigin', 'anonymous')
      image.onload = function () {
        let canvas = document.createElement('canvas')
        canvas.width = image.width
        canvas.height = image.height

        let context = canvas.getContext('2d')
        context.drawImage(image, 0, 0, image.width, image.height)
        let url = canvas.toDataURL('image/png')

        // 生成一个a元素
        let a = document.createElement('a')
        // 创建一个单击事件
        let event = new MouseEvent('click')

        // 将a的download属性设置为我们想要下载的图片名称，若name不存在则使用‘下载图片名称’作为默认名称
        a.download = name || '下载图片名称'
        // 将生成的URL设置为a.href属性
        a.href = url

        // 触发a的单击事件
        a.dispatchEvent(event)
      }

      image.src = selector.src
    },
    handleReload (pagination, { currentPage, pageSize }) {
      this.fetchRemoteData(pagination, currentPage, pageSize)
    }, // 带翻页表格数据重载
    fetchRemoteData (pagination, currentPage, pageSize) {
      let param = {
        id: this.projectId,
        offset: currentPage || 1,
        limit: pageSize || 10
      }
      let paginationObj = pagination || this.$refs.exTableApprovalList.pagination
      getApprovalList(param).then(res => {
        this.pendingTableData = res.data.list
        paginationObj.total = res.data.total
      })
    }, // 带翻页表格数据远程拉取
    getProjectList () {
      let param = this.getProjectListParam
      // console.log(param)
      getProjectList(param).then(res => {
        this.projectList = res.data.list
        this.pagination.total = res.data.total
      }, error => {
        error && this.$message.error(error.message)
      })
    },
    gotoCreate () {
      let target = this.$router.resolve({ path: '/project/create' })
      window.open(target.href, '_blank')
    },
    gotoDetails (item) {
      if (item.is_review) {
        this.handlePending(item)
      } else {
        this.$router.push({ path: '/project/details', query: { id: item.id } })
      }
    },
    handleView (id) {
      this.viewProjectDialogVisible = true
      getProjectDetails({ id: id }).then(res => {
        this.projectDetails = res.data
        // console.log(this.projectDetails)
      })
    },
    handleEdit (id) {
      let routeData = this.$router.resolve({
        path: '/project/edit',
        query: {
          id: id
        }
      })
      window.open(routeData.href, '_blank')
      // this.$router.push({ path: '/project/edit', query: { id: id } })
    },
    handleOffline (item) {
      let isOffline = 0
      let tipTxt = '下线'
      if (item.status === 2) {
        this.$message.error('该项目处于编辑状态！')
        return false
      } else if (item.status === 0) {
        isOffline = 1
        tipTxt = '上线'
      } else {
        isOffline = 0
        tipTxt = '下线'
      }
      this.$confirm('您确定要' + tipTxt + '该项目吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        onLineProject({ id: item.id, online: isOffline }).then(res => {
          this.$message.success(res.message)
          this.getProjectList()
        })
      })
    },
    handleDelete (id) {
      this.$confirm('您确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteProject({ id: id }).then(res => {
          this.$message.success(res.message)
          this.getProjectList()
        })
      }).catch(() => {

      })
    },
    copyUrl2 () {
      let Url2 = document.getElementById('url')
      Url2.select() // 选择对象
      document.execCommand('Copy') // 执行浏览器复制命令
      alert('已复制好，可贴粘。')
    },
    handlePending (item) {
      this.projectId = item.id
      this.approvalProjectDialogVisible = true
      this.$nextTick(() => {
        this.fetchRemoteData()
      })
    },
    handleSelectionChange (val) {
      this.multiplePendingSelection = val
    },
    // 列表数据改变
    handleSearch () {
      this.pagination.pageSize = 8
      this.pagination.currentPage = 1
      this.getProjectList()
    },
    handleChangeStatus () {
      this.pagination.pageSize = 8
      this.pagination.currentPage = 1
      this.getProjectList()
    },
    handleSizeChange (size) {
      this.pagination.pageSize = size
      this.pagination.currentPage = 1
      this.getProjectList()
    },
    handleCurrentChange (page) {
      this.pagination.currentPage = page
      this.getProjectList()
    },
    // todo 待确认接口
    handlePass (val) { // 审批通过 ,审批后需要刷新待审批的数据
      let idList = val.map(item => {
        return item.id
      })
      let param = { id: idList, pass: 1 }
      approvalProject(param).then(res => {
        // this.$message.success(res.message)
        this.fetchRemoteData()
      })
    },
    handleNoPass (val) { // 审批不通过, 审批后需要刷新待审批的数据
      let idList = val.map(item => {
        return item.id
      })
      let param = { id: idList, pass: 0 }
      approvalProject(param).then(res => {
        this.$message.success(res.message)
        this.fetchRemoteData()
      })
    },
    handleCloseApprovalProjectDialog () {
      this.approvalProjectDialogVisible = false
      this.getProjectList()
    }
  }
}
</script>
<style lang="scss">
  .page-project{
    .el-aside{
      dl{
       height: calc(100% - 10px)!important;
      }
    }
    .el-main{

      .filter-box{
        .el-radio.is-bordered{border: 1px solid #fff;&.is-checked{border-color: #EF6520}}
        position: relative;
        margin: 20px 0;
        padding: 0 20px;
        .el-form{
          .el-form-item{padding-bottom: 10px; margin-bottom: 10px;
            &.keyword-input{      border-bottom: none;}
            .el-radio{ margin-right: 0;
              .el-radio__input{display:none}
              .el-radio__label{padding-left: 6px}
              .el-checkbox-button__inner{padding: 8px 15px}
            }
          }
        }
        .keyword-input{
          margin-bottom: 10px;
          .el-input{width:300px}
        }

        .add-button{position: absolute;right:0;top:0}
      }
      .project-block{
        position: relative;
        .btn_option{position: absolute;left:80px;top:10px;z-index: 1}
        box-shadow: 0px 2px 5px #888888;
        width:99%;
        margin: 0 auto;
        height: calc(100% - 130px);
        .el-tabs{
          width:98%;
          margin: 0 auto;
          .el-tabs__nav-wrap::after{display: none}
          .el-tabs__active-bar{display: none}
          .el-tabs__item{ font-size: 20px;padding: 0 4px}
          .project-card{
            width:200px;
            margin-bottom: 20px;
            .el-card__body{
              position: relative;
              padding: 0;
              .status-bg{
                /*cursor: pointer;*/
                height:42px;position: relative;
                color:#fff;
                font-size: 16px;
                font-weight: bold;
                text-align: center;
                line-height: 42px;
                &.blue{ background:#29ABE2 }
                &.green{ background: #15D1A4}
                &.gray{ background: #afafaf}
                span.special-status{
                  cursor:pointer;
                  position: absolute;
                  top:0;left:0;
                  display: inline-block;
                  width:60px;height:26px;
                  line-height: 26px;
                  color:#fff;background: #3e7fe5;
                  text-align: center;
                  font-size: 12px;
                  border-radius: 0 0 3px 0;
                }
              }
              .headline{height:58px;padding: 10px; line-height: 1.4em; font-size: 14px;cursor: pointer}
              .date{padding:0 10px;font-size: 12px;color:#a0a0a0; line-height: 1.6em}
              .percent{
                padding: 5px 10px;margin-top: 20px;
                width:100%;
                position: relative;
                .person-num{position: absolute;display: inline-block;width:40px;height:26px; line-height: 26px;color:#a0a0a0;font-size: 12px;top:-12px;right:-10px}
                .el-progress{position: relative;
                  .el-progress-bar{ padding-right: 0;
                    .el-progress-bar__inner{ background: #51c8b6}
                  }
                  .el-progress__text{position: absolute;left: 0;
                    margin-left: 0;
                    top: -12px;}
                }
              }
              .mask{display: none;}
              &:hover {
                .mask{
                  display: block;
                  position: absolute;
                  width:100%;
                  height: 80px;
                  background: rgba(0,0,0,0.75);
                  z-index: 2;
                  bottom:0;
                  left:0;
                  .operate{
                    z-index: 3;
                    justify-content:space-around;
                    display: flex;
                    .item{
                      cursor: pointer;
                      text-align: center;
                      p{color:#fff;
                        font-size: 12px;
                        &.icon{font-size: 18px;margin: 10px 0}
                      }
                    }
                  }
                }
              }
            }
          }
          .project-list{
            border-bottom: 1px solid #fff;border-top: 1px solid #fff;
            position: relative;
            padding: 10px;
            margin: 5px 0;
            .operate-item{visibility: hidden}
            &:hover{
              background: #fff0e9;border-bottom: 1px solid #ef6520;border-top: 1px solid #ef6520;
              .operate-item{
                visibility: visible;
                font-size: 12px; margin-top: 35px;color:#4771d4;
                span{ margin-left: 10px;cursor: pointer }
              }
            }
            .pending{z-index:1;cursor:pointer;display: inline-block;width:60px;height:26px; line-height: 26px; font-size: 12px; text-align: center;background: #15d1a4;color:#fff;position: absolute;top:10px;right:10px;border-radius:4px }
            .el-row{
              .headline {
                margin: 4px 0 15px 0;
                font-size: 14px;
                color:#666;
                overflow: hidden;white-space: nowrap;text-overflow: ellipsis;
                .status{color:#15d1a4}
              }
              .pieces{font-size: 12px;color:#999;
                .end-date{margin: 0 20px}
              }

            }

          }
          .el-pagination{text-align: right;margin-top: 20px; margin-bottom: 50px}
        }
      }
    }

  }
  .projectViewDialog{
    .el-dialog{width:700px}
    /*width:680px;*/
    /*height:680px;*/
    .project-view-box{
      ul li{
        font-size: 16px;
        line-height: 2em;
        &.flex{ display: flex;justify-content: space-between;
          span{display: inline-block;width:200px;
            overflow: hidden;white-space: nowrap;text-overflow: ellipsis;
            &.obj{width:400px; em{ font-style: normal}}
            i{font-style: normal;color:#8c939d}
          }
        }
        &.intro{
          padding: 10px 0 30px;
          .content.intro{
            max-height: 180px;
            overflow: auto;
          }
        }
        .head{color:#8c939d}
        .content{position: relative;
          .chapter{width:70%;height:200px;overflow: auto}
          .qrCode{position:absolute;top:-40px;right:0;width:22%;text-align: center;img{margin:0 auto 10px;display: block}}
        }
        &.copyLink{display: flex;justify-content: space-between; margin-top: 20px;.el-input{padding-right: 10px}}
      }
    }
    .el-dialog__title{ font-weight: bold;font-size: 22px}
    .el-dialog__body{ padding-top: 15px}
  }
  .exTable{
    .el-pagination{margin-top: 20px;text-align: right}
  }
</style>
