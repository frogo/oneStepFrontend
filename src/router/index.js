import Vue from 'vue'
import VueRouter from 'vue-router'
import { sessionVerify } from '@/request/api'
Vue.use(VueRouter)

const router = new VueRouter({
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

router.beforeEach((to, from, next) => {
  if (to.path === '/login' || from.path === '/login') {
    next()
  } else {
    sessionVerify().then(res => {
      if (res.code === '1') {
        if (!localStorage.getItem('user') || localStorage.getItem('user') !== res.data.name) {
          localStorage.setItem('user', res.data.name)
        }
        next()
      }
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
export default router
