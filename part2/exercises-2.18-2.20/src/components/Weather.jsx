function Weather({ arr, weatherInfo }) {
    
    return (
        <>
            <h1>Weather in {arr[0]?.capitalName}</h1>
            <p>Temperature {weatherInfo?.main?.temp} Celsius</p>
            {weatherInfo?.weather && (
                <img 
                    src={`https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`}
                    alt="weather icon"
                  />
            )}
            <p>Wind {weatherInfo?.wind?.speed} m/s</p>
        </>
    )
}

export default Weather