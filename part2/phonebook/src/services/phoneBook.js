import axios from "axios";
const baseUrl = '/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    console.log(request.then(r => r.data))
    return request.then(r => r.data)
}

const create = (newPerson) => {
    const request = axios.post(baseUrl, newPerson)
    return request.then(r => r.data)
}

const update = (id, newPerson) => {
    const request = axios.put(`${baseUrl}/${id}`, newPerson)
    return request.then(r => r.data)
}

const del = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

export { getAll, create, update, del }