import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const router = new VueRouter({
  // mode: 'history',
  // linkActiveClass: 'current-highlight',
  routes: [
    {
      path: '/',
      redirect: 'home',
      component: () => import('../views/layout.vue'),
      children: [
        { // 首页
          path: 'home',
          name: 'home',
          component: () => import('../views/home.vue')
        },
        { // 个人中心
          path: 'user',
          redirect: 'changePassword'
        },
        { // 个人中心
          path: 'changePassword',
          name: 'changePassword',
          component: () => import('../views/user/changePassword.vue')
        },
        { // 企业课程库-
          path: 'course',
          name: 'course',
          component: () => import('../views/course/index.vue')
        },
        { // 企业课程库-详情
          path: '/course/details',
          name: 'course-details',
          component: () => import('../views/course/details.vue')
        },
        { // 企业课程库-创建课程
          path: '/course/create',
          name: 'course-create',
          component: () => import('../views/course/create.vue')
        },
        { // 项目管理
          path: 'project',
          name: 'project',
          component: () => import('../views/project/index.vue')
        },
        { // 项目管理-创建项目
          path: '/project/create',
          name: 'project-create',
          component: () => import('../views/project/create.vue')
        },
        { // 项目管理-统计详情
          path: '/project/details',
          name: 'project-details',
          component: () => import('../views/project/details.vue')
        },
        { // 题库管理首页
          path: 'questionLib',
          name: 'questionLib',
          component: () => import('../views/examination/questions/index.vue')
        },
        { // 创建试题
          path: '/questions/create',
          name: 'questions-create',
          component: () => import('../views/examination/questions/create.vue')
        },
        { // 编辑试题
          path: '/questions/edit',
          name: 'questions-edit',
          component: () => import('../views/examination/questions/itemEdit.vue')
        },
        { // 编辑题库
          path: '/questionLib/edit',
          name: 'questionLib-edit',
          component: () => import('../views/examination/questions/edit.vue')
        },
        { // 试卷管理-首页
          path: 'paper',
          name: 'paper',
          component: () => import('../views/examination/paper/index.vue')
        },
        { // 试卷管理-创建试卷
          path: '/paper/create',
          name: 'paper-create',
          component: () => import('../views/examination/paper/create.vue')
        },
        { // 试卷管理-编辑试卷
          path: '/paper/edit',
          name: 'paper-edit',
          component: () => import('../views/examination/paper/edit.vue')
        },
        { // 特殊学员
          path: 'specialStudent',
          name: 'specialStudent',
          component: () => import('../views/student/index.vue')
        },
        { // 培训统计
          path: 'trainStatistics',
          name: 'trainStatistics',
          component: () => import('../views/dataStatistics/trainStatistics/index.vue')
        },
        { // 数据统计-培训统计详情
          path: '/trainStatistics/details',
          name: 'trainStatistics-details',
          component: () => import('../views/dataStatistics/trainStatistics/details.vue')
        },
        { // 课程排行
          path: 'courseRanking',
          name: 'courseRanking',
          component: () => import('../views/dataStatistics/courseRanking/index.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/user/register.vue')
    },
    {
      path: '/forgotPassword',
      name: 'forgotPassword',
      component: () => import('../views/user/forgotPassword.vue')
    },
    {
      path: '/exTable',
      name: '',
      component: () => import('../views/exTableDemo.vue')
    }
  ]
})
export default router
