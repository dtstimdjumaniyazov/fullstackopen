import axios from "axios";
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    console.log(request.then(r => r.data))
    return request.then(r => r.data)
}

const create = (newNote) => {
    const request = axios.post(baseUrl, newNote)
    return request.then(r => r.data)
}

const update = (id, newNote) => {
    const request = axios.put(`${baseUrl}/${id}`, newNote)
    return request.then(r => r.data)
}

const del = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

export { getAll, create, update, del }