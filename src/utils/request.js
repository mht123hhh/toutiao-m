/**
 * 请求模块
 */
import axios from 'axios'
import store from '@/store'

const request = axios.create({
  // baseURL: 'http://123.57.109.30:8000' // 基础路径
  baseURL: 'http://toutiao.itheima.net' // 基础路径

})

// Add a request interceptor
request.interceptors.request.use(function (config) {
  // 请求发起会经过这里
  const { user } = store.state // 解构取 state中的user
  if (user && user.token) { // Bearer 持票人
    config.headers.Authorization = `Bearer ${user.token}`
  }
  // config：本次请求配置对象
  return config // 务必返回一个config，不然不再执行
}, function (error) {
  // 请求出错会进入这里
  return Promise.reject(error)
})

export default request // 导出request
