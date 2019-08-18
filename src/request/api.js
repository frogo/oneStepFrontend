/**
 * api接口统一管理
 */
import { get, post } from './http'
import CONFIG from './config'
// 登出
export const login = p => post(CONFIG.USER.LOGIN, p)
export const logout = p => post(CONFIG.USER.LOGOUT, p)
// 用户session验证
export const sessionVerify = p => post(CONFIG.USER.VERIFY, p)
// 注册
export const register = p => post(CONFIG.USER.REGISTER, p)
// 找回密码
export const forgotPassword = p => post(CONFIG.USER.FORGOT_PASSWORD, p)
// 重置密码
export const resetPassword = p => post(CONFIG.USER.RESET_PASSWORD, p)
// 修改密码
export const changePassword = p => post(CONFIG.USER.CHANGE_PASSWORD, p)

// 首页
// 我的待办
export const getTodo = p => get(CONFIG.TODO, p)
// 状态预览
export const getStatus = p => get(CONFIG.STATUS, p)

// 课程
// 课程列表
export const getCourseList = p => post(CONFIG.COURSE.LIST, p) // 修改接口为post
export const getExaminationPaperList = p => get(CONFIG.EXAMINATION.PAPER.LIST, p) // 修改接口 传参试卷出题方式,输出内容加ID
export const addCourse = p => post(CONFIG.COURSE.ADD, p) // 入参缺少标签 课程文件是列表
export const addCourseDraft = p => post(CONFIG.COURSE.DRAFT_ADD, p)// 入参缺少标签 课程文件是列表
export const getCourseDetails = p => get(CONFIG.COURSE.DETAILS, p) // 课程详情
// 项目
export const getProjectList = p => post(CONFIG.PROJECT.LIST, p) // 修改接口为post

// 试题
export const getQuestionLibList = p => get(CONFIG.EXAMINATION.QUESTION.QUESTION_LIB, p) // 题库列表
export const addQuestionLib = p => post(CONFIG.EXAMINATION.QUESTION.ADD_QUESTION_LIB, p) // 增加题库
export const deleteQuestionLib = p => post(CONFIG.EXAMINATION.QUESTION.DELETE_QUESTION_LIB, p) // 删除题库
export const getQuestionList = p => post(CONFIG.EXAMINATION.QUESTION.QUESTION_LIST, p) // 试题列表
export const deleteQuestion = p => post(CONFIG.EXAMINATION.QUESTION.DELETE_QUESTION, p) // 删除试题
export const deleteQuestionAll = p => post(CONFIG.EXAMINATION.QUESTION.DELETE_QUESTION_ALL, p) // 批量删除试题
