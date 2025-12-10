import { useState, useEffect } from "react"
import { getAll } from "./services/restcountries"
import { getWeather } from "./services/weather"
import CountryList from "./components/CountryList"
import CountryDetails from "./components/CountryDetails"
import Weather from "./components/Weather"

function App() {
  const [country, setCountry] = useState('')
  const [allCountries, setAllCountries] = useState([])
  const [showCountry, setShowCountry] = useState([])
  const [weatherInfo, setWeatherInfo] = useState({})

  // console.log(getWeather('London'))

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
      // console.log('country Details: ', countryName)
      setAllCountries(countryName)
    })
  }, [])


  const handleInput = (event) => {
    setCountry(event.target.value)
  }

  
  useEffect(() => {
    if (!country || allCountries.length === 0) return
    
    const matchCountry = allCountries?.filter(c => c.commonName.toLowerCase().includes(country.toLowerCase()))
    
    // console.log('Matched countries array', matchCountry)
    setShowCountry(matchCountry)

    if (matchCountry.length === 1) {
      getWeather(matchCountry[0].capitalName[0])
        .then(data => setWeatherInfo(data))
    }
    
  }, [country])

  // console.log('Show country', showCountry)
  // console.log('Weather Info variable ', weatherInfo)

  const handleShow = (countryName) => {
    setCountry(countryName)
  }

  return (
    <>
      <div>
        find countries <input onChange={handleInput} autoFocus/>
        <div>
          {showCountry.length > 10 && (
            <p>Too many matches, specify another filter</p>
          )}
          {showCountry.length < 11 && showCountry.length > 1 && (
            <div>
              <CountryList arr={showCountry} handleShow={handleShow}/>
            </div>
          )}
          {showCountry.length === 1 && (
            <div>
              <CountryDetails arr={showCountry} />
              <Weather arr={showCountry} weatherInfo={weatherInfo}/>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default App
