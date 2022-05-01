/**
 * 请求模块
 */
import axios from 'axios'

const request = axios.create({
  // baseURL: 'http://123.57.109.30:8000' // 基础路径
  baseURL: 'http://toutiao.itheima.net' // 基础路径

})

export default request // 导出request
