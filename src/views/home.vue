<template lang="html">
  <div class="home">
    <el-row>
      <el-col :span="16">
        <el-carousel trigger="click" height="150px">
          <el-carousel-item v-for="item in 4" :key="item">
            <h3 class="small">
              {{ item }}
            </h3>
          </el-carousel-item>
        </el-carousel>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple" />
      </el-col>
    </el-row>
    <h2 class="home-title">
      我的待办
    </h2>
    <el-row>
      <el-row :gutter="20">
        <el-col :span="6" />
        <el-col :span="6">
          <el-card shadow="hover">
            鼠标悬浮时显示
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover">
            鼠标悬浮时显示
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover">
            鼠标悬浮时显示
          </el-card>
        </el-col>
      </el-row>
    </el-row>
    <h2 class="home-title">
      状态预览
    </h2>
    <el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-card shadow="hover">
            <div class="" />
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover">
            鼠标悬浮时显示
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover">
            <a @click="goto('login')">登录</a>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover">
            鼠标悬浮时显示
          </el-card>
        </el-col>
      </el-row>
    </el-row>
  </div>
</template>
<script>
// import { mapState, mapMutations } from 'vuex'
// import { getExpressUsers, postStatisticArchive } from '@/request/api'
export default {
  data () {
    return {

    }
  },
  computed: {
  },
  // 监听,当路由发生变化的时候执行
  watch: {
  },
  mounted: function () {

  },
  methods: {
    goto (path) {
      this.$router.push({ path: path })
    }
  }
}
</script>
