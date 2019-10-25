<template>
  <div class="mapDemo">
    <div id="map" style="width:600px;height:600px" />
  </div>
</template>
<script>
import echarts from 'echarts'
export default {
  data () {
    return {
      data: [],
      // 地图
      myChart: '',
      gisData: {
        zhumadian: '../../public/static/data-1562118579950-xXLfaPrXL.json',
        zhoukou: '../../public/static/data-1562118572274-v9xfaTwy5.json',
        zhengzhou: '../../public/static/data-1562118560176-EShp-n1M3.json',
        xuchang: '../../public/static/data-1562118551860-kjVYXRXie.json',
        xinyang: '../../public/static/data-1562118541540-1oHhC50T2.json',
        xinxiang: '../../public/static/data-1562118523296-25lVhSW-v.json',
        shangqiu: '../../public/static/data-1562118518920-oiGJ003Uo.json',
        sanmenxia: '../../public/static/data-1562118509577-7n9hCY3ms.json',
        pingdingshan: '../../public/static/data-1562118493063-2EXbyXPks.json',
        nanyang: '../../public/static/data-1562118482129-BF0-vIlyJ.json',
        luoyang: '../../public/static/data-1562118461353-wCQVj7-4u.json',
        kaifeng: '../../public/static/data-1562118436936-dm62fgITa.json',
        jiaozuo: '../../public/static/data-1562118423443-dsMnIHN5q.json',
        henan: '../../public/static/data-1562117497263-O6MV8S2ot.json',
        anyang: '../../public/static/data-1562117441591-aML_BHbjY.json'
      },
      city: 'henan',
      seriesData: [
        // 左边地图
        {
          type: 'map',
          map: '河南省',
          aspectScale: 0.75,
          left: '2%',
          top: 10,
          width: '60%',
          height: '90%',
          roam: false,
          itemStyle: {
            normal: {
              areaColor: '#667aed',
              borderColor: '#fff',
              borderWidth: 1.5,
              label: {
                show: true,
                color: '#fff'
              },

              emphasis: {
                label: {
                  show: true
                }
              }
            }
          }
        },
        // 右边状图
        {
          name: '',
          type: 'bar',
          xAxisIndex: 0,
          yAxisIndex: 0,
          barWidth: '30%',
          itemStyle: {
            normal: {
              color: '#f5b335'
            }
          },
          label: {
            normal: {
              show: true,
              position: 'right',
              textStyle: {
                color: '#c23531'
              }
            }
          },
          data: [
            {
              name: '焦作市',
              value: '598'
            }, {
              name: '开封市',
              value: '2223'
            }, {
              name: '郑州市',
              value: '637'
            }, {
              name: '周口市',
              value: '885'
            }, {
              name: '许昌市',
              value: '768'
            }, {
              name: '南阳市',
              value: '1233'
            }, {
              name: '信阳市',
              value: '1633'
            }, {
              name: '新乡市',
              value: '1768'
            }, {
              name: '洛阳市',
              value: '1233'
            }, {
              name: '河南省',
              value: '3633'
            }
          ]
        }
      ]
    }
  },
  computed: {
    optionMap: function () {
      let ynameMap = []
      for (let i = 0; i < 10; i++) {
        ynameMap.push(this.seriesData[1].data[i].name)
      }
      return {
        backgroundColor: '#00fa9a',
        grid: {
          right: '5%',
          bottom: '3%',
          width: '25%',
          height: '80%'
        },
        tooltip: {
          trigger: 'item',
          formatter: function (data) {
            if (!isNaN(data.value)) {
              return data.name + '：' + data.value
            }
          }
        },
        xAxis: {
          gridIndex: 0,
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisLine: {
            show: false
          }
        },
        yAxis: {
          gridIndex: 0,
          interval: 0,
          data: ynameMap,
          axisTick: {
            show: false
          },
          axisLabel: {
            show: true
          },
          splitLine: {
            show: false
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#c23531'
            }
          }
        },
        series: this.seriesData
      }
    }
  },
  mounted () {
    this.myChart = echarts.init(document.getElementById('map'))
    this.$axios.get(this.gisData.henan).then(res => {
      echarts.registerMap('河南省', res.data)
      this.myChart.setOption(this.optionMap, true)
    })
    this.myChart.on('click', this.clickCity)
  },
  methods: {
    clickCity (param) {
      switch (param.name) {
        case '河南省': this.city = 'henan'; break
        case '洛阳市': this.city = 'luoyang'; break
        case '新乡市': this.city = 'xinxiang'; break
        case '信阳市': this.city = 'xinyang'; break
        case '南阳市': this.city = 'nanyang'; break
        case '许昌市': this.city = 'xuchang'; break
        case '周口市': this.city = 'zhoukou'; break
        case '郑州市': this.city = 'zhengzhou'; break
        case '开封市': this.city = 'kaifeng'; break
        case '焦作市': this.city = 'jiaozuo'; break
        case '平顶山市': this.city = 'pingdingshan'; break
        case '驻马店市': this.city = 'zhumadian'; break
        case '三门峡市': this.city = 'sanmenxia'; break
        case '商丘市': this.city = 'shangqiu'; break
        case '安阳市': this.city = 'anyang'; break
      }

      this.$axios.get(this.gisData[this.city]).then(res => {
        echarts.registerMap('新乡市', res.data)
        this.seriesData[0].map = '新乡市'
        this.myChart.setOption(this.optionMap, true)
      })
    }
  }
}
</script>
<style lang="scss">
.mapDemo{
  padding: 10px;
}
</style>
