import axios from "axios";
const apiKey = import.meta.env.VITE_WEATHER_API_KEY


const weatherUrl = (capitalName) => `http://api.openweathermap.org/data/2.5/weather?q=${capitalName}&appid=${apiKey}&units=metric`

const getWeather = (capitalName) => {
    const request = axios.get(weatherUrl(capitalName))
    return request.then(r => r.data)
}

export { getWeather }