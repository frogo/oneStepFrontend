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
          redirect: 'change_password'
        },
        { // 个人中心
          path: 'change_password',
          name: 'change_password',
          meta: {
            breadCrumb: [
              { name: '修改密码' }
            ]
          },
          component: () => import('../views/user/change_password.vue')
        },
        { // 企业课程库
          path: 'course',
          name: 'course',
          component: () => import('../views/course/index.vue')
        },
        { // 企业课程库-详情
          path: '/course/details',
          name: 'course-details',
          meta: {
            breadCrumb: [
              { name: '企业课程库', path: '/course' },
              { name: '课程详情' }
            ]
          },
          component: () => import('../views/course/details.vue')
        },
        { // 企业课程库-创建课程
          path: '/course/create',
          name: 'course-create',
          meta: {
            breadCrumb: [
              { name: '企业课程库', path: '/course' },
              { name: '创建课程' }
            ]
          },
          component: () => import('../views/course/create_edit.vue')
        },
        { // 企业课程库-编辑课程
          path: '/course/edit',
          name: 'course-edit',
          meta: {
            breadCrumb: [
              { name: '企业课程库', path: '/course' },
              { name: '编辑课程' }
            ]
          },
          component: () => import('../views/course/create_edit.vue')
        },
        { // 项目管理
          path: 'project',
          name: 'project',
          meta: {
            breadCrumb: [
              { name: '培训项目管理' }
            ]
          },
          component: () => import('../views/project/index.vue')
        },
        { // 项目管理-创建项目
          path: '/project/create',
          name: 'project-create',
          meta: {
            breadCrumb: [
              { name: '培训项目管理', path: '/project' }, { name: '创建项目' }
            ]
          },
          component: () => import('../views/project/create_edit.vue')
        },
        { // 项目管理-编辑项目
          path: '/project/edit',
          name: 'project-edit',
          meta: {
            breadCrumb: [
              { name: '培训项目管理', path: '/project' }, { name: '编辑项目' }
            ]
          },
          component: () => import('../views/project/create_edit.vue')
        },
        { // 项目管理-统计详情
          path: '/project/details',
          name: 'project-details',
          meta: {
            breadCrumb: [
              { name: '培训项目管理', path: '/project' }, { name: '项目详情' }
            ]
          },
          component: () => import('../views/project/details.vue')
        },
        { // 题库管理首页
          path: 'questionLib',
          name: 'questionLib',
          meta: {
            breadCrumb: [
              { name: '题库管理' }
            ]
          },
          component: () => import('../views/examination/questions/question-lib/index.vue')
        },
        { // 编辑题库
          path: '/questionLib/edit',
          name: 'questionLib-edit',
          meta: {
            breadCrumb: [
              { name: '题库管理', path: '/questionLib' }, { name: '编辑题库' }
            ]
          },
          component: () => import('../views/examination/questions/question-lib/edit.vue')
        },
        { // 创建试题
          path: '/question/create',
          name: 'question-create',
          meta: {
            breadCrumb: [
              { name: '题库管理', path: '/questionLib' }, { name: '题库编辑', path: '/questionLib/edit' }, { name: '创建试题' }
            ]
          },
          component: () => import('../views/examination/questions/question/create_edit.vue')
        },
        { // 编辑试题
          path: '/question/edit',
          name: 'question-edit',
          meta: {
            breadCrumb: [
              { name: '题库管理', path: '/questionLib' }, { name: '题库编辑', path: '/questionLib/edit' }, { name: '编辑试题' }
            ]
          },
          component: () => import('../views/examination/questions/question/create_edit.vue')
        },
        { // 试卷管理-首页
          path: 'paper',
          name: 'paper',
          meta: {
            breadCrumb: [
              { name: '试卷管理' }
            ]
          },
          component: () => import('../views/examination/paper/index.vue')
        },
        { // 试卷管理-创建试卷
          path: '/paper/create',
          name: 'paper-create',
          meta: {
            breadCrumb: [
              { name: '试卷管理', path: '/paper' }, { name: '创建试卷' }
            ]
          },
          component: () => import('../views/examination/paper/create_edit.vue')
        },
        { // 试卷管理-编辑试卷
          path: '/paper/edit',
          name: 'paper-edit',
          meta: {
            breadCrumb: [
              { name: '试卷管理', path: '/paper' }, { name: '编辑试卷' }
            ]
          },
          component: () => import('../views/examination/paper/create_edit.vue')
        },
        { // 特殊学员
          path: 'specialStudent',
          name: 'specialStudent',
          meta: {
            breadCrumb: [
              { name: '特殊学员', path: '/specialStudent' }
            ]
          },
          component: () => import('../views/student/index.vue')
        },
        { // 培训统计
          path: 'trainStatistics',
          name: 'trainStatistics',
          meta: {
            breadCrumb: [
              { name: '培训统计', path: '/trainStatistics' }
            ]
          },
          component: () => import('../views/dataStatistics/trainStatistics/index.vue')
        },
        { // 数据统计-培训统计详情
          path: '/trainStatistics/details',
          name: 'trainStatistics-details',
          meta: {
            breadCrumb: [
              { name: '培训统计', path: '/trainStatistics' }, { name: '培训统计详情' }
            ]
          },
          component: () => import('../views/dataStatistics/trainStatistics/details.vue')
        },
        { // 课程排行
          path: 'courseRanking',
          name: 'courseRanking',
          meta: {
            breadCrumb: [
              { name: '课程排行', path: '/courseRanking' }
            ]
          },
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
      name: 'forgot-password',
      component: () => import('../views/user/forgot_password.vue')
    }
  ]
})
export default router
