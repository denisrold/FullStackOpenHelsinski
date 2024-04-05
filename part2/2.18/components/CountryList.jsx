const CountryList = ({filteredCountries,handleShow,show,indexCountry,hide})=>{
 return(
<>{
filteredCountries.map(country => (
        <li key={country.cca3}>
          <h1>
            {country.name.common}
            {show && <button id={country.cca3} className={'hideButton'} onClick={handleShow}>{'show'}</button>}
            {!show && indexCountry==country.cca3 && <button id={country.cca3} className={'showButton'} onClick={handleShow}>{hide}</button>}
          </h1>

           {!show && indexCountry==country.cca3 ?<div className='showCountry'>
            {country.capital[0] && <h3>Capital: {country.capital[0]}</h3>}
            {country.area && <h3>Area: {country.area}</h3>}
            <img src={country?.flags?.png} alt="flag" />
            <ul>
              <h2>
                Language:
              </h2>
              {Object.keys(country.languages).map(languageCode => (
              <li key={languageCode}>
              {country.languages[languageCode]}
              </li>
          ))}
          </ul>
          </div>:null }
          </li>
        ))}
</>
 )   
}

export default CountryList;