/**
 * 封装axios配置文件，方便以后的维护
 * 
 */

import axios from 'axios'

export function request(config) {
    const instance = axios.create({
        baseURL: 'http://localhost:3000',
        timeout: 3000
    })

    // axios的拦截器
    // 请求拦截的使用
    instance.interceptors.request.use(config => {
        return config
    }, err => {
        console.log(err);
    })

    // 响应数据
    instance.interceptors.response.use(res => {
        return res
    }, err => {
        return err

    })

    return instance(config)
}