import { useState, useEffect } from "react"
import { getAll } from "./services/restcountries"
import { getWeather } from "./services/weather"
import ShowCountryComponent from "./components/showCountryComponent"

function App() {
  const [country, setCountry] = useState('')
  const [allCountries, setAllCountries] = useState([])
  const [showCountry, setShowCountry] = useState([])
  const [weatherInfo, setWeatherInfo] = useState({})

  useEffect(() => {
    getAll().then(values => {
      // console.log('Values: ', values)
      const countryName = values.map(v => (
        {
          commonName: v.name.common,
          capitalName: v.capital,
          areaInfo: v.area,
          languagesInfo: v.languages,
          flagsImage: v.flags.png,
          flagsAlt: v.flags.alt
        }
      ))
      console.log('country Details: ', countryName)
      setAllCountries(countryName)
    })
  }, [])


  const handleInput = (event) => {
    setCountry(event.target.value)
  }

  
  useEffect(() => {
    if (!country || allCountries.length === 0) return
    
    const matchCountry = allCountries?.filter(c => c.commonName.toLowerCase().includes(country.toLowerCase()))
    
    console.log('Matched countries array', matchCountry)
    setShowCountry(matchCountry)

    if (matchCountry.length === 1) {
      getWeather(matchCountry[0].capitalName[0])
        .then(data => setWeatherInfo(data))
    }
    
  }, [country])

  console.log('Show country', showCountry)
  console.log('Weather Info variable ', weatherInfo)

  const handleShow = (countryName) => {
    setCountry(countryName)
  }

  return (
    <>
      <div>
        find countries <input onChange={handleInput}/>
        <div>
          {showCountry.length > 10 && (
            <p>Too many matches, specify another filter</p>
          )}
          {showCountry.length < 11 && showCountry.length > 1 && (
            <div>
              {showCountry.map(c => (
                <p key={c.commonName}>
                  {c.commonName} 
                  <button onClick={() => handleShow(c.commonName)}>
                    Show
                  </button>
                </p>
              ))}
            </div>
          )}
          {showCountry.length === 1 && (
            <div>
              {showCountry.map(c => (
                <div key={c?.commonName}>
                  <h1>{c?.commonName}</h1>
                  <p>Capital: {c?.capitalName}</p>
                  <p>Area: {c?.areaInfo}</p>
                  <h2>Languages</h2>
                  {Object.values(c.languagesInfo)?.map(lang => (
                    <ul key={lang}>
                      <li>{lang}</li>
                    </ul>
                  ))}
                  <img src={c?.flagsImage} alt={c?.flagsAlt} />
                <h1>Weather in {c.capitalName}</h1>
                <p>Temperature {weatherInfo.main.temp} Celsius</p>
                {weatherInfo?.weather && (
                  <img 
                    src={`https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`}
                    alt="weather icon"
                  />
                )}
                <p>Wind {weatherInfo.wind.speed} m/s</p>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* <ShowCountryComponent showCountry={showCountry}/> */}
      </div>
    </>
  )
}

export default App
