/* 能发送ajax请求的函数模块
  包装axios
  统一处理请求异常，返回自己创建的promise对象
*/
import axios from 'axios'

export default function ajax(url, data={}, type='GET') {
  if (type === 'GET') {
    return axios.get(url, {
      params: data
    })
  } else {
    return axios.post(url, data)
  }
}