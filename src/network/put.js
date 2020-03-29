import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8080'

export function putUser(data) {
    return axios.put('/update', data)
}