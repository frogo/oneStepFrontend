import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
  // mode: 'history',
  routes: [
    {
      path: '/',
      component: () => import('../views/layout.vue'),
      children: [
        { // 首页
          path: '',
          name: '首页',
          component: () => import('../views/home.vue')
        }
      ]
    },
    {
      path: '/login',
      component: () => import('../views/login.vue')
    },
    {
      path: '/register',
      component: () => import('../views/register.vue')
    },
    {
      path: '/forgotPassword',
      component: () => import('../views/forgotPassword.vue')
    }
  ]
})
