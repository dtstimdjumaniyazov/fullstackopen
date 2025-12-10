function CountryList({ arr, handleShow }) {
    return (
        <>
            {arr.map(a => (
                <p key={a.commonName}>
                    {a.commonName} 
                    <button onClick={() => handleShow(a.commonName)}>
                        Show
                    </button>
                </p>
            ))}
        </>
    )
}

export default CountryList;