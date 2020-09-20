import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CountryList = ({ countries }) => {
    if (countries.length > 10) {
        return (
            <div>Too many matches, specify another filter</div>
        )
    } else if (countries.length === 1) {
        return (
            <div>
                <Country country={countries[0]} />
            </div>
        )
    } else {
        return(
            <div>
                {countries.map(country => <div>{country.name} <CountryButton country={country} /></div>)}
            </div>
        )
    }
}

const Country = ({ country }) => {
    return (
        <div>
            <h1>{country.name}</h1>
            <div>
                capital: {country.capital}
            </div>
            <div>
                population: {country.population}
            </div>
            <div>
                <h2>languages</h2>
                <div>
                    {country.languages.map(l => <li>{l.name}</li>)}
                </div>
            </div>
            <img src={country.flag} width="300" height = "200" />
        </div>
    )
}

const CountryButton = ({ country }) => {
    const handleCountryButtonClick = () => {
    }

    return (
        <button onClick={handleCountryButtonClick} >show</button>
    )
}

const App = () => {
    const [ countries, setCountries ] = useState([])
    const [ showCountries, setShowCountries ] = useState([])
    const [ filter, setFilter ] = useState('')

    useEffect(() => {
        axios
        .get('https://restcountries.eu/rest/v2/all')
        .then(response => {
            console.log('Fetch country data')
            setCountries(response.data)
        })
    }, [])

    useEffect(() => {
        setShowCountries(countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase())))
    }, [filter])

    const handleFilterChange = (e) => {
        setFilter(e.target.value)
        console.log(showCountries.length)
    }

    return (
        <div>
            <div>
                find countries<input onChange={handleFilterChange} />
            </div>
            <div>
                <CountryList countries={showCountries} />
            </div>
        </div>
    )
}

export default App