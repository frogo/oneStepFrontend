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
      name: '首页',
      component: () => import('../views/layout.vue'),
      children: [
        { // 首页
          path: '',
          name: '首页',
          component: () => import('../views/home.vue')
        },
        { // 个人中心
          path: '/user',
          name: '个人中心',
          component: () => import('../views/user/changePassword.vue')
        },
        { // 企业课程库
          path: '/course',
          name: '课程库',
          component: () => import('../views/course/index.vue')
        },
        { // 企业课程库-详情
          path: '/course/details',
          name: '课程库-详情',
          component: () => import('../views/course/details.vue')
        },
        { // 企业课程库-创建课程
          path: '/course/create',
          name: '课程库-创建',
          component: () => import('../views/course/create.vue')
        },
        { // 项目管理
          path: '/project',
          name: '项目管理',
          component: () => import('../views/project/index.vue')
        },
        { // 项目管理-创建项目
          path: '/project/create',
          name: '项目管理-创建项目',
          component: () => import('../views/project/create.vue')
        },
        { // 项目管理-统计详情
          path: '/project/details',
          name: '项目管理-统计详情',
          component: () => import('../views/project/details.vue')
        },
        { // 题库管理
          path: '/questions/management',
          name: '题库管理',
          component: () => import('../views/examination/questions/index.vue')
        },
        { // 题库管理-创建试题
          path: '/questions/create',
          name: '题库管理-创建试题',
          component: () => import('../views/examination/questions/create.vue')
        },
        { // 题库管理-编辑试题
          path: '/questions/edit',
          name: '题库管理-编辑试题',
          component: () => import('../views/examination/questions/edit.vue')
        },
        { // 试卷管理
          path: '/paper/management',
          name: '试卷管理',
          component: () => import('../views/examination/paper/index.vue')
        },
        { // 试卷管理-创建试卷
          path: '/paper/create',
          name: '试卷管理-创建试卷',
          component: () => import('../views/examination/paper/create.vue')
        },
        { // 试卷管理-编辑试卷
          path: '/paper/edit',
          name: '试卷管理-编辑试卷',
          component: () => import('../views/examination/paper/edit.vue')
        },
        { // 特殊学员
          path: '/student',
          name: '特殊学员',
          component: () => import('../views/student/index.vue')
        },
        { // 数据统计-培训统计
          path: '/trainStatistics',
          name: '培训统计',
          component: () => import('../views/dataStatistics/trainStatistics/index.vue')
        },
        { // 数据统计-培训统计详情
          path: '/trainStatisticsDetails',
          name: '数据统计-培训统计详情',
          component: () => import('../views/dataStatistics/trainStatistics/details.vue')
        },
        { // 数据统计-课程排行
          path: '/courseRanking',
          name: '数据统计-课程排行',
          component: () => import('../views/dataStatistics/courseRanking/index.vue')
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
      component: () => import('../views/user/register.vue')
    },
    {
      path: '/forgotPassword',
      name: '忘记密码',
      component: () => import('../views/user/forgotPassword.vue')
    },
    {
      path: '/exTable',
      name: '',
      component: () => import('../views/exTableDemo.vue')
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
