import axios from 'axios'
// import { Message } from 'element-ui'
// 环境转换
if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = ''
} else if (process.env.NODE_ENV === 'debug') {
  axios.defaults.baseURL = ''
} else if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = ''
}
// 请求超时秒数
axios.defaults.timeout = 10000

// 携带cookies
axios.defaults.withCredentials = true

// post请求头

axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
/**
 * 请求拦截器
 * @param  {Object} config  config
 * @return {Promise}        Promise
 */
axios.interceptors.request.use(config => {
  // if (config.method === 'post') {
  //   if (config.url.indexOf('cooperate-case-server') > 0) { // 协同接口application/json
  //     config.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
  //   } else {
  //     config.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
  //   }
  // }
  return config
}, function (error) {
  return Promise.reject(error)
})

/**
 * 响应拦截器
 * @param  {Object} response response
 * @return {Promise}         Promise
 */
axios.interceptors.response.use(function (response) {
  // if (response.data.ret && response.data.ret === 302) {
  //   location.href = response.data.redirectUrl
  // }
  return response
}, function (error) {
  return Promise.reject(error)
})

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get (url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err.response.statusText)
    })
  })
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post (url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.response.statusText)
      })
  })
}
export default axios
