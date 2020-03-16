import axios from 'axios'

export function DetUser(id) {
    return axios.get('http://localhost:3000/users/' + id)
}