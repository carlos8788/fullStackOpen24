
import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons'

export const getAll = async () => {
  const request = axios.get(baseUrl)
  const response = await request
  return response.data
}

export const getOne = async (id) => {
  const request = axios.get(`${baseUrl}/${id}`)
  const response = await request
  return response.data
}

export const create = async newObject => {
  const request = axios.post(baseUrl, newObject)
  const response = await request
  return response.data
}

export const update = async (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  const response = await request
  return response.data
}
export const deletePerson = async (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  const response = await request
  return response
}




