import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8080'

export function DetUser(id) {
    console.log(id)
    return axios.get('/detail/' + id)
}