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
  EXAMINATION: {
    PAPER: {
      LIST: CONTEXTPATH + '/examinationPaper/list',
      DELETE: CONTEXTPATH + '/examinationPaper/delete',
      ADD: CONTEXTPATH + '/examinationPaper/add',
      DETAILS: CONTEXTPATH + '/examinationPaper/info'
    },
    QUESTION: {
      QUESTION_LIB: CONTEXTPATH + '/questionBank/list',
      ADD_QUESTION_LIB: CONTEXTPATH + '/questionBank/add',
      DELETE_QUESTION_LIB: CONTEXTPATH + '/questionBank/delete',
      QUESTION_LIST: CONTEXTPATH + '/question/list',
      DELETE_QUESTION: CONTEXTPATH + 'question/delete',
      DELETE_QUESTION_ALL: CONTEXTPATH + '/question/deleteAll',
      ADD_QUESTION: CONTEXTPATH + '/question/add',
      QUESTION_DETAILS: CONTEXTPATH + '/question/info'
    }

  },
  PROJECT: {
    LIST: CONTEXTPATH + '/project/list'
  },
  SPECIAL_STUDENT: {
    LIST: CONTEXTPATH + '/spStudent/list',
    DELETE: CONTEXTPATH + '/spStudent/delete',
    ADD: CONTEXTPATH + '/spStudent/add',
    DELETE_ALL: CONTEXTPATH + '/spStudent/deleteAll',
    EDIT: CONTEXTPATH + '/spStudent/modify'
  }
}
