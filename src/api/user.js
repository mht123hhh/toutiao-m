/**
 * 用户相关请求模块
 */
import request from '@/utils/request'
// import store from '@/store'

export const login = data => {
  return request({
    method: 'POST',
    url: '/v1_0/authorizations',
    data // data:data  简写 data
  })
}
/**
 * 发送验证码
 * 每个手机号一分钟一次
 */
export const sendSms = mobile => {
  return request({
    method: 'GET',
    url: `/v1_0/sms/codes/${mobile}`
  })
}
/**
 * 获取用户信息
 */
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user'
    // 发送请求头数据
    // 该接口需要授权才能访问
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  })
}
