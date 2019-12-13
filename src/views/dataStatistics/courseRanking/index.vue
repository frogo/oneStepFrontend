<template>
  <el-container class="main-content page-courseRanking">
    <AsideMenu />
    <el-main>
      <h2>课程排行</h2>
      <div class="filter-box">
        <span><i>排序：</i>
          <el-radio-group v-model="radio" @change="radioChange" size="mini">
            <el-radio-button label="0">不限</el-radio-button>
            <el-radio-button label="1">学习数</el-radio-button>
            <el-radio-button label="2">完成数</el-radio-button>
            <el-radio-button label="3">点赞数</el-radio-button>
          </el-radio-group>
        </span>
        <span><el-button @click="handleExport" type="success" size="mini">导出报表</el-button></span>
      </div>
      <div class="block-list list">
        <ul class="block">
          <li v-for="(item, index) in listData" :class="{'gray':(index+1)%2 === 0}">
            <h4>{{ item.name }}</h4>
            <div class="detail">
              <span>讲师：{{ item.teacher_info.name }}</span>
              <span>学习数：{{ item.learn_num }}</span>
              <span>完成数：{{ item.finish_num }}</span>
              <span>点赞数：{{ item.like_num }}</span>
              <span>创建时间: {{ item.add_time }}</span>
            </div>
          </li>
        </ul>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pager.currentPage"
          :page-sizes="[5, 10, 20]"
          :page-size="pager.pageSize"
          :total="pager.total"
          layout="total, sizes, prev, pager, next, jumper"
        />
      </div>
    </el-main>
  </el-container>
</template>

<script>
import { getCourseRank, exportCourseRank } from '@/request/api'
import AsideMenu from '@/components/asideMenu'
export default {
  components: {
    AsideMenu
  },
  data () {
    return {
      pager: {
        pageSize: 5,
        total: 0,
        currentPage: 1
      },
      radio: 0,
      listData: [
        {
          'id': 112,
          'company_id': 1,
          'status': 0,
          'name': '撒撒旦撒水水水水',
          'cover': 'http://localhost:8080/res/upload/file/1567223185ipaddress.png',
          'minute': 23,
          'credit': 12,
          'obj': '啊大啊V',
          'target': '1发点福',
          'introduction': '撒下啊潇洒',
          'syllabus': '行啊擦',
          'teacher_info': {
            'name': '张三丰',
            'pic': '',
            'introduction': ''
          },
          'examination_id': 4,
          'attachment': {
            'name': '',
            'url': ''
          },
          'tags': null,
          'like_num': 0,
          'visit_num': 0,
          'learn_num': 0,
          'finish_num': 0,
          'add_time': '2019-08-17',
          'source': 2
        },
        {
          'id': 113,
          'company_id': 1,
          'status': 0,
          'name': '速度非常精彩v你|的尝试多次',
          'cover': 'http://localhost:8080/res/upload/file/1567223185ipaddress.png',
          'minute': 23,
          'credit': 12,
          'obj': '啊大啊V',
          'target': '1发点福',
          'introduction': '撒下啊潇洒',
          'syllabus': '行啊擦',
          'teacher_info': {
            'name': '张三丰',
            'pic': '',
            'introduction': ''
          },
          'examination_id': 4,
          'attachment': {
            'name': '',
            'url': ''
          },
          'tags': null,
          'like_num': 0,
          'visit_num': 0,
          'learn_num': 0,
          'finish_num': 0,
          'add_time': '2019-08-17',
          'source': 2
        }
      ]
    }
  },
  watch: {
  },
  created () {
    // this.$store.commit('$_setBreadCrumb', { isShow: true,
    //   list: [
    //     { name: '课程排行', path: '/courseRanking' }
    //   ] })
  },
  mounted: function () {
    this.getCourseRank()
  },
  methods: {
    radioChange () {
      this.getCourseRank()
    },
    handleExport () {
      exportCourseRank({ rankType: this.radio }).then(res => { // todo 空参数
        window.location.href = res.data.url
      })
    },
    getCourseRank () {
      let param = {
        rankType: this.radio,
        offset: this.pager.currentPage,
        limit: this.pager.pageSize
      }
      getCourseRank(param).then(res => {
        this.listData = res.data.list
        this.pager.total = res.data.total
      })
    },
    handleSizeChange (val) {
      this.pager.pageSize = val
      this.getCourseRank()
    },
    handleCurrentChange (val) {
      this.pager.currentPage = val
      this.getCourseRank()
    }
  }
}
</script>

<style lang="scss">
  .page-courseRanking{
    padding: 0;
    .filter-box{
      display: flex;
      justify-content: space-between;
      margin: 20px 0;
      padding: 15px 5px;
      span{i{color:#999;font-size: 12px;vertical-align: middle;font-style: normal}}
    }
    .block-list {
      height: calc(100% - 141px)!important;
      ul.block{
        li{
          padding: 15px;
          border-bottom: 1px solid #f3f3f3;border-top: 1px solid #fff;
          &.gray{background: #fafafa}
          &:hover{ background: #FFF0E9;border-bottom: 1px solid #EF6520;border-top: 1px solid #EF6520}
          h4{ font-size: 18px;color:#666; margin-bottom: 20px;font-weight: bold}
          .detail{
/*            display: flex;
            justify-content: space-between;*/
            span{font-size: 14px;color:#999;width:19%;display: inline-block}
          }
        }
      }
      .el-pagination{ text-align: right; margin: 20px 0}
    }

  }
</style>
