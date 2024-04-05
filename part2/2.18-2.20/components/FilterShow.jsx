import { useState } from "react";
import CountryList from './CountryList';	

const FilterShow = ({countries,API_KEY})=>{

  const [filteredCountries , setFilteredCountries]= useState([]);
  const [show,setShow] = useState(true);
  const [hide,setHide] = useState('show');
  const [indexCountry,setIndexCountry] = useState('');

  //Handler Filter
  const handleFilter = (event) => {
    const filterText = event.target.value.toLowerCase();
    const filtered = countries.filter(country =>
      country.name.common.toLowerCase().includes(filterText)
    );
    setFilteredCountries(filtered);
    setIndexCountry("");
    setShow(true);
    setHide('show');
    if(filterText === ""){
    setFilteredCountries([]);
    setHide('show');
    }
  }
  //HandleShow
  const handleShow = (event)=>{
    let id = event.target.id;
    event.target.value = "Hide"
    setShow(!show);
    !!show?setHide('hide'):setHide('show');
    setIndexCountry(id);
  }

return (
    <div>
      <input type="text" placeholder="Search countries..." onChange={handleFilter} />
      <ul>
      { filteredCountries && filteredCountries.length>=10?
      <h2 className="errorMessage">Too many matches, specify another filter</h2>
       :(
       <CountryList filteredCountries={filteredCountries} API_KEY={API_KEY} handleShow={handleShow} show={show} indexCountry={indexCountry} hide={hide}/>
      )}
      </ul>
      </div>
      )
}

export default FilterShow;