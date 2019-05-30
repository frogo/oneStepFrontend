import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      component: () => import('../views/home.vue'),
      children: [
        // { // 首页
        //   path: 'firstPage',
        //   name: '首页',
        //   component: () => import('../views/firstPage/firstPage.vue')
        // }
      ]
    }
  ]
})
