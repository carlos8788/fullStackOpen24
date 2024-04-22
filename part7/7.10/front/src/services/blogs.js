import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null;

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const login = async (data) => {
  const result = await axios.post('api/login', data)
  return result.data
}

const getAll = () => {
  try {
    const config = {
      headers: { Authorization: token },
    }
    // console.log(config)
    const request = axios.get(baseUrl, config)
    return request.then(response => response.data)
  } catch (error) {
    return 'Cant get data'
  }
}


const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const updateBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(`${baseUrl}/${id}`, { likes: 1 }, config)
  return response.data
}

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

const getBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.get(`${baseUrl}/${id}`, config)
  return response.data
}

export default { getAll, login, setToken, create, updateBlog, deleteBlog, getBlog }