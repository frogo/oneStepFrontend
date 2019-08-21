import Vue from 'vue'
import App from '@/App.vue'
import store from '@/store'
import axios from '@/request/http'
import router from '@/router'
import ElementUI from 'element-ui'
import QS from 'qs'

import 'normalize.css/normalize.css'
import 'minireset.css/minireset.css'
import '@/assets/style/common.scss'
import ECharts from 'vue-echarts'
import { sessionVerify } from '@/request/api'

Vue.use(ElementUI)
Vue.component('v-chart', ECharts)
Vue.prototype.$axios = axios
Vue.prototype.$store = store
Vue.prototype.QS = QS

new Vue({
  render: function (h) { return h(App) },
  store: store,
  router: router
}).$mount('#app')

router.beforeEach((to, from, next) => {
  store.commit('$_setBreadCrumb', { isShow: false, list: [] })
  if (to.path === '/login' || to.path === '/register' || to.path === '/forgotPassword' || from.path === '/login') {
    next()
  } else {
    sessionVerify().then(res => {
      if (!localStorage.getItem('user') || localStorage.getItem('user') !== res.data.name) {
        localStorage.setItem('user', res.data.name)
        // store.commit('$_setUserStorage', res.data.name)
      }
      next()
    }, error => {
      if (error.response && error.response.status === 404) {
        next({
          path: '/login',
          query: { redirect: to.fullPath }// 将跳转的路由path作为参数，登录成功后跳转到该路由
        })
      }
    })
  }
})
