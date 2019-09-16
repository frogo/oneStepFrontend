/**
 * api接口统一管理
 */
import { get, post } from './http'
import CONFIG from './config'
// 登出
export const login = p => post(CONFIG.USER.LOGIN, p)
export const logout = p => post(CONFIG.USER.LOGOUT, p)
// 用户session验证
// export const sessionVerify = p => post(CONFIG.USER.VERIFY, p)
// 注册
export const register = p => post(CONFIG.USER.REGISTER, p)
// 找回密码
export const forgotPassword = p => post(CONFIG.USER.FORGOT_PASSWORD, p)
// 重置密码
export const resetPassword = p => post(CONFIG.USER.RESET_PASSWORD, p)
// 修改密码
export const changePassword = p => post(CONFIG.USER.CHANGE_PASSWORD, p)
// 发送手机验证码
export const sendPhone = p => post(CONFIG.USER.SEND_PHONE, p)
// 首页
// 我的待办
export const getTodo = p => get(CONFIG.TODO, p)
// 状态预览
export const getStatus = p => get(CONFIG.STATUS, p)

// 课程
// 课程列表
export const getCourseList = p => get(CONFIG.COURSE.LIST, p) // 修改接口为post
export const addCourse = p => post(CONFIG.COURSE.ADD, p) // 入参缺少标签 课程文件是列表
export const addCourseDraft = p => post(CONFIG.COURSE.DRAFT_ADD, p)// 入参缺少标签 课程文件是列表
export const getCourseDetails = p => get(CONFIG.COURSE.DETAILS, p) // 课程详情
export const deleteCourse = p => post(CONFIG.COURSE.DELETE, p) // 课程删除
export const modifyCourse = p => post(CONFIG.COURSE.MODIFY, p) // 课程修改
export const courseOnlineOrOffline = p => post(CONFIG.COURSE.ONLINE_OR_OFFLINE, p) // 课程上线下线
export const getDefaultCover = p => get(CONFIG.COURSE.DEFAULT_COVER, p) // 课程封面

export const getTagList = p => get(CONFIG.COURSE.TAG.LIST, p) // 获取标签列表
export const deleteTag = p => post(CONFIG.COURSE.TAG.DELETE, p) // 删除标签
export const addTag = p => post(CONFIG.COURSE.TAG.ADD, p) // 新增标签
export const getCourseTags = p => get(CONFIG.COURSE.TAG.GET_COURSE_TAGS, p) // 获取课程标签
export const updateCourseTags = p => post(CONFIG.COURSE.TAG.UPDATE_COURSE_TAGS, p) // 更新课程标签

// 项目
export const getProjectList = p => get(CONFIG.PROJECT.LIST, p) // 修改接口为post
export const getProjectDetails = p => get(CONFIG.PROJECT.DETAILS, p) // 修
export const deleteProject = p => post(CONFIG.PROJECT.DELETE, p) // 删除
export const onLineProject = p => post(CONFIG.PROJECT.ONLINE, p) // 上线下线
export const approvalProject = p => post(CONFIG.PROJECT.APPROVAL, p) // 学员审批
export const addDraftProject = p => post(CONFIG.PROJECT.DRAFT, p) // 添加到草稿
export const addProject = p => post(CONFIG.PROJECT.ADD, p) // 添加
export const getApprovalList = p => get(CONFIG.PROJECT.PENDING_LIST, p) // 获取待审批学员
export const modifyProject = p => post(CONFIG.PROJECT.MODIFY, p) // 修改项目
export const getProjectStudents = p => get(CONFIG.PROJECT.STUDENTS, p) // 获取参训学员
export const getProjectStudentCourse = p => get(CONFIG.PROJECT.COURSE_STUDENT, p) // 获取项目培训详情
export const getStudentLearning = p => get(CONFIG.PROJECT.STUDENT_LEARNING, p) // 获取学生学习详情
export const deleteProjectStudent = p => post(CONFIG.PROJECT.DELETE_STUDENT, p) // 删除项目学员
export const resetExamination = p => post(CONFIG.PROJECT.RESET_EXAMINATION, p) // 重置考试
export const exportStudentForm = p => post(CONFIG.PROJECT.EXPORT_STUDENT, p) // 导出学员报表
export const exportStudentCourseForm = p => post(CONFIG.PROJECT.EXPORT_STUDENT_COURSE, p) // 导出项目详情报表
export const exportCreditRankingForm = p => post(CONFIG.PROJECT.EXPORT_CREDIT_RANKING, p) // 导出学分排行报表
export const getCreditRanking = p => get(CONFIG.PROJECT.CREDIT_RANKING, p) // 学分排行
export const getProjectChartData = p => get(CONFIG.PROJECT.PROJECT_CHART, p) // 图表

// 试题
export const getQuestionLibList = p => get(CONFIG.EXAMINATION.QUESTION.QUESTION_LIB, p) // 题库列表
export const addQuestionLib = p => post(CONFIG.EXAMINATION.QUESTION.ADD_QUESTION_LIB, p) // 增加题库
export const modifyQuestionLib = p => post(CONFIG.EXAMINATION.QUESTION.MODIFY_QUESTION_LIB, p) // 修改题库名字
export const deleteQuestionLib = p => post(CONFIG.EXAMINATION.QUESTION.DELETE_QUESTION_LIB, p) // 删除题库
export const getQuestionList = p => get(CONFIG.EXAMINATION.QUESTION.QUESTION_LIST, p) // 试题列表
export const deleteQuestion = p => post(CONFIG.EXAMINATION.QUESTION.DELETE_QUESTION, p) // 删除试题
// export const deleteQuestionAll = p => post(CONFIG.EXAMINATION.QUESTION.DELETE_QUESTION_ALL, p) // 批量删除试题
export const addQuestion = p => post(CONFIG.EXAMINATION.QUESTION.ADD_QUESTION, p) // 添加试题
export const modifyQuestion = p => post(CONFIG.EXAMINATION.QUESTION.QUESTION.MODIFY, p) // 修改试题
export const getQuestionDetails = p => get(CONFIG.EXAMINATION.QUESTION.QUESTION_DETAILS, p) // 试题详情

// 试卷
export const getExaminationPaperList = p => get(CONFIG.EXAMINATION.PAPER.LIST, p) // 修改接口 传参试卷出题方式,输出内容加ID
export const deleteExaminationPaper = p => post(CONFIG.EXAMINATION.PAPER.DELETE, p) // 缺少
export const modifyExaminationPaper = p => post(CONFIG.EXAMINATION.PAPER.MODIFY, p) // 修改试卷
export const addExaminationPaper = p => post(CONFIG.EXAMINATION.PAPER.ADD, p) //
export const getExaminationPaperDetails = p => get(CONFIG.EXAMINATION.PAPER.DETAILS, p) //

// 特殊学员
export const getSpecialStudentList = p => get(CONFIG.SPECIAL_STUDENT.LIST, p) //
export const deleteSpecialStudent = p => post(CONFIG.SPECIAL_STUDENT.DELETE, p) //
export const addSpecialStudent = p => post(CONFIG.SPECIAL_STUDENT.ADD, p) //
// export const deleteStudentAll = p => post(CONFIG.SPECIAL_STUDENT.DELETE_ALL, p) // 批量删除试题
export const editSpecialStudent = p => post(CONFIG.SPECIAL_STUDENT.EDIT, p) // 批量删除试题

// 统计
export const getTrainTotal = p => get(CONFIG.STATISTIC.GET_TRAIN_TOTAL, p) // 项目总计
export const getCourseRank = p => get(CONFIG.COURSE.RANK, p) // 课程排行
