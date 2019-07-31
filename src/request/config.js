const CONTEXTPATH = '/api'

export default {
  // 接口
  USER: {
    LOGIN: CONTEXTPATH + '/user/login',
    LOGOUT: CONTEXTPATH + '/user/loginOut',
    VERIFY: CONTEXTPATH + '/user/session',
    REGISTER: CONTEXTPATH + '/user/register',
    FORGOT_PASSWORD: CONTEXTPATH + '/user/forgotPassword',
    RESET_PASSWORD: CONTEXTPATH + '/user/resetPwd',
    CHANGE_PASSWORD: CONTEXTPATH + '/user/passwd'
  },
  TODO: CONTEXTPATH + '/message/stat',
  STATUS: CONTEXTPATH + '/statistics/info',
  COURSE: {
    COURSE_LIST: CONTEXTPATH + '/lesson/list'
  },
  QUESTION: {
    QUESTION_LIST: CONTEXTPATH + '/question/list'
  }
}
