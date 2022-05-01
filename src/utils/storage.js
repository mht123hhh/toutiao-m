/**
 * 封装本地存储操作模块
 * 方便vuex的使用，不用担心数据类型的问题
 */

/**
 * 存储数据
 */
// 外部访问，务必导出成员 export
export const setItem = (key, value) => {
  // 将数组、对象类型的数据转换为json格式字符串进行存储
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}
/**
 * 获取数据
 */
export const getItem = key => {
  const data = window.localStorage.getItem(key)
  try {
    return JSON.parse(data) // 解析成对象
  } catch (err) {
    // 如果转换的数据json格式不对，原封不动的返回并报错
    return data
  }
}
/**
 * 删除数据
 */
export const removeItem = key => {
  window.localStorage.removeItem(key)
}
