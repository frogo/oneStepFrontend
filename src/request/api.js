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

// 首页
// 我的待办
export const getTodo = p => get(CONFIG.TODO, p)
// 状态预览
export const getStatus = p => get(CONFIG.STATUS, p)
