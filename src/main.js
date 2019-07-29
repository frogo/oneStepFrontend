import Vue from 'vue'
import App from '@/App.vue'
import store from '@/store'
import axios from '@/request/http'
import router from '@/router'
import ElementUI from 'element-ui'
import QS from 'qs'
// i18n tool
// import locale from 'element-ui/lib/locale'
// zf-frontend-lib
// import zfFrontendLib from 'zf-frontend-lib'
// i18n
// import lang from 'zf-frontend-lib/lib/zh-CN.js'
// theme
// import 'zf-frontend-lib/lib/blue/theme.css'
import 'normalize.css/normalize.css'
import 'minireset.css/minireset.css'
import '@/assets/style/common.scss'
import ECharts from 'vue-echarts'

Vue.use(ElementUI)
Vue.component('v-chart', ECharts)
// Vue.use(zfFrontendLib)
// locale.use(lang)
// Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$store = store
Vue.prototype.QS = QS

new Vue({
  render: function (h) { return h(App) },
  store: store,
  router: router
}).$mount('#app')
