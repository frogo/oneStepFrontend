<template>
  <el-container class="main-content page-trainStatistics">
    <AsideMenu />
    <el-main>
      <div class="inner">
        <h2>培训统计</h2>
        <div class="filter-box">
          <span>
            <el-date-picker
              v-model="date"
              type="daterange"
              range-separator="~"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
            />

            <el-button @click="handleSearch" type="primary"> 搜索</el-button>
          </span>
          <span>
            <el-button @click="handleGotoDetail" type="primary"> 项目详情</el-button>
          </span>
        </div>
        <div class="card-list">
          <el-card class="box-card">
            <h3>项目数</h3>
            <p>{{ totalData.project }}</p>
          </el-card>
          <el-card class="box-card">
            <h3>总课时</h3>
            <p>{{ totalData.lesson_minute }}</p>
          </el-card>
          <el-card class="box-card">
            <h3>参训人数</h3>
            <p>{{ totalData.people }}</p>
          </el-card>
          <el-card class="box-card">
            <h3>完成人数</h3>
            <p>{{ totalData.pass }}</p>
          </el-card>
        </div>
        <div class="ring-chart">
          <v-chart :options="ringData" />
        </div>
        <div class="thumbs">
          <img src="../../../assets/img/indexBg.png">
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
// 需要引入的echarts 组件
import 'echarts/lib/chart/pie'
import AsideMenu from '@/components/asideMenu'
import { getTrainTotal } from '@/request/api'
// 常用的抽象的数据
let abstractData = {
  radius: ['51%', '62%'], // 设置内径和外径
  centerLabel: { // 圆环中间的样式
    normal: {
      show: true,
      position: 'center',
      formatter: [
        '{d|{d}%}', // {d|} 竖线代表class的分割，前面的d是class
        '{a|{a}}'
      ].join('\r\n'),
      rich: {
        d: { fontSize: '44' },
        a: {
          fontSize: '14',
          color: '#666666',
          lineHeight: '18'
        }
      },
      // formatter: function (argument) {//函数传参方法
      //   console.log(argument)
      //   let html
      //   html = argument.percent + '%' + '\r\n' + argument.seriesName
      //   return html
      // },
      textStyle: {
        fontSize: 15,
        color: '#00c0ef'
      }
    }
  },
  legendData: ['完成度'], // 图例数据
  seriesColor: ['#51C8B6'], // 系列色
  seriesData: [ // 系列数据
    { 'name': '完成度', 'position': ['50%', '50%'], 'data': [50, 50] }
  ],
  seriesOption: function () {
    let seriesArray = []
    this.seriesData.forEach(function (item) {
      let series = {
        name: item.name,
        type: 'pie',
        center: item.position, // 圆环基于整个画布的位置
        radius: this.radius, // 圆的内径和外径
        itemStyle: {
          color: function (param) {
            let thisColor
            if (param.dataIndex === 0) {
              thisColor = this.seriesColor[this.legendData.indexOf(param.seriesName)]
            } else {
              thisColor = '#e1e6ed'
            }
            return thisColor
          }.bind(this) },
        labelLine: {
          normal: {
            show: false
          }
        },
        clockWise: false, // 顺时加载
        data: [
          { value: item.data[0], label: this.centerLabel },
          { value: item.data[1], tooltip: { showContent: false } }
        ]
      }
      seriesArray.push(series)
    }.bind(this))
    return seriesArray
  }
}
export default {
  components: {
    AsideMenu
  },
  data () {
    return {
      date: [],
      ringData: {
        color: abstractData.seriesColor,
        series: ''
      },
      totalData: ''
    }
  },
  watch: {
  },
  created () {
    // this.$store.commit('$_setBreadCrumb', { isShow: true,
    //   list: [
    //     { name: '培训统计', path: '/trainStatistics' }
    //   ] })
  },
  mounted: function () {
    this.getTrainTotal()
  },
  methods: {
    getTrainTotal () {
      let param = {
        start_time: this.date ? this.date[0] : '',
        end_time: this.date ? this.date[1] : ''
      }
      getTrainTotal(param).then(res => {
        this.totalData = res.data
        abstractData.seriesData[0].data[0] = res.data.pass
        abstractData.seriesData[0].data[1] = res.data.people - res.data.pass

        this.ringData.series = abstractData.seriesOption()
      })
    },
    handleSearch () {
      this.getTrainTotal()
    },
    handleGotoDetail () {
      this.$router.push({ path: '/trainStatistics/details', query: { start_time: this.date[0], end_time: this.date[1] } })
    }
  }
}
</script>

<style lang="scss">
  .page-trainStatistics{
    .inner{
      margin: 5px;
      box-shadow: 0px 2px 5px #888888;
      padding: 15px;
      height:calc(100% - 10px)
    }
    padding: 0;
    .filter-box{
      margin: 20px 0;
      padding: 15px 0;
      justify-content: space-between;
      display: flex;
      border-bottom: 1px solid #efefef;
    }
    .card-list{
      width:80%; margin: 20px auto 0;
      display: flex;
      justify-content: space-around;
      .box-card{width:160px;
        height:120px;
        border-radius: 6px;
        background: #fff;
        border: 1px solid #dfdfdf;
        h3{color:#999}
        p{font-size: 28px;color:#E84D4D;text-align: center; padding-top: 20px}
      }
    }
    .thumbs{ text-align: center; margin-top: -100px}
    .echarts{ margin: 0 auto}
  }
</style>
