<template lang="html">
  <el-main class="page-home">
    <div class="banner-box clearFix">
      <el-carousel trigger="click" height="260px">
        <el-carousel-item v-for="item in ads.slider">
          <a :href="item.link" target="_blank"><img :src="item.image"></a>
        </el-carousel-item>
      </el-carousel>
      <div class="ad-box">
        <a :href="ads.rightOne.link" target="_blank"><img :src="ads.rightOne.image"></a>
        <a :href="ads.rightTwo.link" target="_blank"><img :src="ads.rightTwo.image"></a>
      </div>
    </div>
    <div class="todo-wrap">
      <h2 class="home-title">
        我的待办
      </h2>
      <el-row class="card-list todo">
        <el-col :span="8">
          <el-card shadow="hover">
            <div class="item-card">
              <div class="img">
                <img src="../assets/img/icon-1.png">
              </div>
              <div class="txt">
                <h3>待审批</h3>
                <p class="desc">
                  有报名学员等待审批
                </p>
                <el-badge :value="todo.approval" class="item" type="primary">
                  <el-button size="small">
                    立即审批
                  </el-button>
                </el-badge>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover">
            <div class="item-card">
              <div class="img">
                <img src="../assets/img/icon-2.png">
              </div>
              <div class="txt">
                <h3>到期培训项目</h3>
                <p class="desc">
                  即将到期培训的项目
                </p>
                <el-badge :value="todo.project" class="item" type="primary">
                  <el-button @click="$router.push({ path:'project',query:{from:'expire'}})" size="small">
                    查看项目
                  </el-button>
                </el-badge>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover">
            <div class="item-card">
              <div class="img">
                <img src="../assets/img/icon-3.png">
              </div>
              <div class="txt">
                <h3>到期课程</h3>
                <p class="desc">
                  即将到期的课程
                </p>
                <el-badge :value="todo.lesson" class="item" type="primary">
                  <el-button size="small">
                    立即续费
                  </el-button>
                </el-badge>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="status-wrap">
      <h2 class="home-title">
        状态预览
      </h2>
      <el-row class="card-list status">
        <el-col :span="6">
          <el-card shadow="hover">
            <div class="item-card">
              <div class="img">
                <img src="../assets/img/icon-4.png">
              </div>
              <div class="txt">
                <h3>课程库</h3>
                <p class="desc">
                  可用课程数
                </p>
                <p class="number">
                  {{ status.lesson }}
                </p>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover">
            <div class="item-card">
              <div class="img">
                <img src="../assets/img/icon-5.png">
              </div>
              <div class="txt">
                <h3>培训项目</h3>
                <p class="desc">
                  发布中的培训项目数
                </p>
                <p class="number">
                  {{ status.project }}
                </p>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover">
            <div class="item-card">
              <div class="img">
                <img src="../assets/img/icon-6.png">
              </div>
              <div class="txt">
                <h3>参训人数</h3>
                <p class="desc">
                  参加培训的人数
                </p>
                <p class="number">
                  {{ status.people }}
                </p>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover">
            <div class="item-card">
              <div class="img">
                <img src="../assets/img/icon-7.png">
              </div>
              <div class="txt">
                <h3>完成人数</h3>
                <p class="desc">
                  完成考试的人数
                </p>
                <p class="number">
                  {{ status.pass }}
                </p>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </el-main>
</template>
<script>
// import { mapState, mapMutations } from 'vuex'
import { getStatus, getTodo, getAds } from '@/request/api'
export default {
  data () {
    return {
      status: {
        pass: 0,
        people: 0,
        project: 0,
        lesson: 0
      },
      todo: {
        approval: 0,
        project: 0,
        lesson: 0
      },
      ads: {
        slider: [
          { image: '', link: '' },
          { image: '', link: '' },
          { image: '', link: '' }
        ],
        rightOne: { image: '', link: '' },
        rightTwo: { image: '', link: '' }
      }
    }
  },
  computed: {
  },
  watch: {
  },
  mounted: function () {
    getStatus().then(res => {
      this.status = res.data
    }, error => {
      error && this.$message.error(error)
    })
    getTodo().then(res => {
      this.todo = res.data
    }, error => {
      error && this.$message.error(error)
    })
    getAds().then(res => {
      if (res.data && res.data.list) {
        for (let i of res.data.list) {
          if (i.code === 'company_right_sidebar') {
            this.ads.rightOne.image = i.ads_list[0].image
            this.ads.rightOne.link = i.ads_list[0].link
          } else if (i.code === 'index_recommend_camp') {
            this.ads.rightTwo.image = i.ads_list[0].image
            this.ads.rightTwo.link = i.ads_list[0].link
          } else if (i.code === 'index_slider') {
            this.ads.slider = i.ads_list.map((item) => {
              return {
                image: item.image,
                link: item.link
              }
            })
          }
        }
      }
    }, error => {
      error && this.$message.error(error)
    })
  },
  methods: {
    goto (path) {
      this.$router.push({ path: path })
    }
  }
}
</script>
