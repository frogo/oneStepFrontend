const CONTEXTPATH = '/v1'

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
    LIST: CONTEXTPATH + '/lesson/list',
    ADD: CONTEXTPATH + '/lesson/add',
    DRAFT_ADD: CONTEXTPATH + '/lessonDraft/add',
    DETAILS: CONTEXTPATH + '/lesson/info'
  },
  EXAMINATION_PAPER: {
    LIST: CONTEXTPATH + '/examinationPaper/list'
  }
}
