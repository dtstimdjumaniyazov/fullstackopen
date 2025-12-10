import axios from 'axios'

const baseUrl = `https://studies.cs.helsinki.fi/restcountries/api/all`

const getAll = () => {
    const request = axios.get(baseUrl)
    // console.log(request.then(r => r.data))
    return request.then(r => r.data)
}

export { getAll }