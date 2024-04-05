import { useEffect, useState } from 'react';
import FilterShow from '../components/FilterShow';
import getAllCountries from './services/countries';

function App({API_KEY}) {
  const [countries,setCountries] = useState([]);
  const getCountry = async ()=>{
    setCountries([...await getAllCountries().catch((err)=>{console.log(err)})]);
  }

  useEffect(()=>{
    getCountry();
  },[]);

  return (
    <div  className='container'>
      <h1>Filter Countries!!</h1>
{!countries.length?<h1>Loading App...</h1>:(
      <FilterShow  countries={countries} setCountries={setCountries}   API_KEY={API_KEY}/>
      )}
    </div>
  );
}

export default App
