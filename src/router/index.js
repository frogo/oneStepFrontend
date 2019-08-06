import Vue from 'vue'
import VueRouter from 'vue-router'
import { sessionVerify } from '@/request/api'
Vue.use(VueRouter)

const router = new VueRouter({
  // mode: 'history',
  // linkActiveClass: 'current-highlight',
  routes: [
    {
      path: '/',
      component: () => import('../views/layout.vue'),
      children: [
        { // 首页
          path: '',
          name: '首页',
          component: () => import('../views/home.vue')
        },
        { // 个人中心
          path: '/userCenter',
          name: '个人中心',
          component: () => import('../views/userCenter/changePassword.vue')
        },
        { // 企业课程库
          path: '/enterpriseCourseLibrary',
          name: '课程库首页',
          component: () => import('../views/enterpriseCourseLibrary/index.vue')
        },
        { // 企业课程库-详情
          path: '/enterpriseCourseLibrary/details',
          name: '课程库详情',
          component: () => import('../views/enterpriseCourseLibrary/details.vue')
        },
        { // 企业课程库-创建课程
          path: '/enterpriseCourseLibrary/create',
          name: '课程库创建',
          component: () => import('../views/enterpriseCourseLibrary/create.vue')
        },
        { // 项目管理
          path: '/projectManagement',
          name: '项目管理首页',
          component: () => import('../views/projectManagement/index.vue')
        }
      ]
    },
    {
      path: '/login',
      name: '登录',
      component: () => import('../views/login.vue')
    },
    {
      path: '/register',
      name: '注册',
      component: () => import('../views/userCenter/register.vue')
    },
    {
      path: '/forgotPassword',
      name: '忘记密码',
      component: () => import('../views/userCenter/forgotPassword.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login' || to.path === '/register' || to.path === '/forgotPassword' || from.path === '/login') {
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
