import axios from 'axios'

/**
 * 封装配置一个axios的del方法
 * 
 */
export function delUser(id) {
    return axios.delete('http://localhost:3000/users/' + id)
}