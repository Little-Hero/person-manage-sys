import axios from 'axios'

export function putUser(id, data) {
    return axios.put('http://localhost:3000/users/' + id, data)
}