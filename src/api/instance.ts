import type { AxiosRequestConfig } from 'axios'
import axios from 'axios'

let baseURL = ''

if (process.env.NODE_ENV === 'development')
  baseURL = 'http://localhost:3000'
else
  baseURL = ''

const instance = axios.create({
  timeout: 1000 * 60,
  // `withCredentials` 表示跨域请求时是否需要使用凭证
  withCredentials: true,
  // `validateStatus` 定义对于给定的HTTP 响应状态码是 resolve 或 reject  promise 。
  // 如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，promise 将被 resolve; 否则，promise 将被 rejecte
  validateStatus: (status) => {
    return status >= 200 && status < 300 // default
  },
  baseURL,
})

// 添加请求拦截器
instance.interceptors.request.use((config) => {
  return config
}, (error) => {
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use((response) => {
  return response
}, (error) => {
  return Promise.reject(error)
})

const api = {
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return instance.get(url, config)
  },
  post<T = any>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
    return instance.post(url, data, config)
  },
}

export default api
