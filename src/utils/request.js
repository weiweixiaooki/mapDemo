import axios from "axios";
// 创建 axios 实例，将来对创建出来的实例，进行自定义配置
// 好处：不会污染原始的 axios 实例
const instance = axios.create({
    baseURL: '/api',
    timeout: 8000,
  })
  
  // 添加响应拦截器
  instance.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么 (默认axios会多包装一层data，需要响应拦截器中处理一下)
    const res = response
    if (res.status !== 200) {
      // 抛出一个错误的promise
      return Promise.reject(res.message)
    } 
    return res
  }, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error)
  })
  
  // 导出配置好的实例
  export default instance