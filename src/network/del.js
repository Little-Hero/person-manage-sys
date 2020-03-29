import axios from 'axios'

/**
 * 封装配置一个axios的del方法
 * 
 */

axios.defaults.baseURL = 'http://localhost:8080'

export function delUser(id) {
    return axios.delete('/del/' + id)
}