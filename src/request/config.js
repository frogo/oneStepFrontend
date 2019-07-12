const CONTEXTPATH = '/api'

export default {
  // 接口
  USER: {
    LOGIN: CONTEXTPATH + '/user/login',
    LOGOUT: CONTEXTPATH + '/user/loginOut',
    VERIFY: CONTEXTPATH + '/user/session'
  },
  TODO: CONTEXTPATH + '/message/stat',
  STATUS: CONTEXTPATH + '/statistics/info'

}
