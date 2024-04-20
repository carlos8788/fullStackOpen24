import axios from 'axios'
const baseUrl = '/api/users'

export const getAllUsers = () => {
    try {
        const request = axios.get(baseUrl)
        
        return request.then(response => response.data)
    } catch (error) {
        return 'Cant get data'
    }
}
