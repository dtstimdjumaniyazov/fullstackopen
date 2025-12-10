function CountryDetails({ arr }) {
    // console.log('Object', Object.values(arr[0].languagesInfo))
    return (
        <>
            <div>
                <h1>{arr[0]?.commonName}</h1>
                <p>Capital: {arr[0]?.capitalName}</p>
                <p>Area: {arr[0]?.areaInfo}</p>
                <h2>Languages</h2>
                {Object.values(arr[0].languagesInfo)?.map(lang => (
                    <ul key={lang}>
                        <li>{lang}</li>
                    </ul>
                ))}
                <img
                    src={arr[0]?.flagsImage}
                    alt={arr[0]?.flagsAlt}
                />
            </div>
        </>
    )
}

export default CountryDetails