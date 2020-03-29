import axios from 'axios'

/**
 * 封装配置axios的post方法(添加)
 * 
 */

axios.defaults.baseURL = 'http://localhost:8080'

// export function postAdmin(object) {
//     return axios.post('http://localhost:8080/login', object)
// }

export function postUser(data) {
    return axios.post('/add', data)
}

export function postApply(data) {
    return axios.post('/Apply', data)
}