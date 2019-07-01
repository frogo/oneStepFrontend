/**
 * api接口统一管理
 */
import { get, post } from './http'
import CONFIG from './config'
// uap 获取移送单位 GET_TRANSFERRED_UNIT
// export const getTransferredUnit = (orgId) => get(CONFIG.UAP.GET_TRANSFERRED_UNIT + '/' + orgId)
export const getLocalJsonDemo = p => get('../../public/demo4.json', p)
export const getExpressUsers = p => get(CONFIG.MOCK.USERS, p)
// 2.3.1.26获取案件流转统计数据
export const postStatisticArchive = p => post('cooperate-case-server/statistic/archive', p)
