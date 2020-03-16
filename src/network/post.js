import axios from 'axios'

/**
 * 封装配置axios的post方法(添加)
 * 
 */

export function postUser(data) {
    return axios.post('http://localhost:3000/users', data)
}