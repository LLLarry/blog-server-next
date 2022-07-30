import { message, Modal } from 'antd'
import axios from 'axios'
import router from 'next/router'
import qs from 'qs'
import { store } from '../store'
import { getToken, removeToken, setToken } from '../utils/jwt'
import { isBrowser, isSsr } from '../utils/util'
const server = axios.create({
  // baseURL: 'http://121.5.230.70',
  baseURL: process.env.BASE_URL,
  timeout: 30000, // 30s
  withCredentials: true
})
// headers: {
//   Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NTc3NjU0ODAsInVzZXIiOnsiaWQiOjExMTIyMjMzLCJlbWFpbCI6NjY2NjY2NjZ9fQ.4Z2sCvl4FK9-Fo2dj6I_Bmrv3yrW_ZAoxRK5FM46COI'
// }

server.interceptors.request.use(config => {
  if (config.method?.toLowerCase() !== 'get') {
    // 沒有Content-Type设置默认的Content-Type
    if (!config.headers?.['Content-Type']) {
      config.headers = {
        ...config.headers,
        'Content-Type': 'application/x-www-form-urlencoded; chartset=UTF-8'
      }
    }
    // 判断Content-Type类型，转化对应的data
    if (config.headers && config.headers['Content-Type']) {
      const contentType = config.headers['Content-Type'] as string
      if (contentType.includes('application/json')) {
        config.data = JSON.stringify(config.data)
      } else if (contentType.includes('application/x-www-form-urlencoded')) {
        config.data = qs.stringify(config.data)
      }
    }
  }

  // 设置token
  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${store.getState().token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})

server.interceptors.response.use(response => {
  const { data } = response
  // 返回值中存在token则保存到本地
  if (typeof data.token === 'string' && isBrowser()) {
    setToken(data.token)
  }
  // token失效或解析错误、user信息不存在
  if ([9001, 9002, 9003, 9004, 9005].includes(data.code)) {
    // 服务端请求直接跳转到首页
    if (isSsr()) {
      store.dispatch({
        type: 'RESET'
      })
      router.replace({ pathname: '/login' })
    } else {
      Modal.confirm({
        title: data.message,
        content: '是否立即跳转到登录页？',
        okText: '确认',
        cancelText: '取消',
        onOk () {
          store.dispatch({
            type: 'RESET'
          })
        }
      });
    }
  }
  if (data.code !== 200) {
    message.error(data.message || '请求出错');
    return Promise.reject(data || '请求出错')
  }
  return data
}, error => {
  message.error('请求出错');
  return Promise.reject(error)
})

export default server