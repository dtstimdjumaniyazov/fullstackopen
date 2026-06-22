import axios from 'axios'
import Blog from '../components/Blog'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {

  const request = axios.get(baseUrl)
  return request.then(response => {
    // console.log('response.data', response.data)
    return response.data
  })
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newObject, config)
  console.log(response.data)
  return response.data
}

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject)
  return response.data
}

const remove = async (BlogId) => {
  const config = {
    headers: { Authorization: token }
  }
  await axios.delete(`${baseUrl}/${BlogId}`, config)
}

export default { getAll, create, update, remove, setToken }