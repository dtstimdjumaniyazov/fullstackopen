import { useState, useEffect } from "react"
import { getAll } from "./services/restcountries"

function App() {
  const [country, setCountry] = useState('')
  const [allCountries, setAllCountries] = useState([])
  const [showCountry, setShowCountry] = useState([])


  
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
    
  }, [country])

  console.log('Show country', showCountry)

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
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default App
