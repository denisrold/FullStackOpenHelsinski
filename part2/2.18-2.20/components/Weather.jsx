import { useState } from "react"
import service from '../src/services/services.js';

const Weather = ({API_KEY,lat,long})=>{
    const [weather, setWeather] = useState([]);

  const handleWeather = async ()=>{
    if(weather.length)return;
    const weatherResponse = await service.getWeather(lat,long,API_KEY)
    .catch(err=>console.log(err))
    setWeather([weatherResponse]);
  }

return(
    <div className="weather-container">
          <button onClick={()=>{handleWeather(lat,long)}}>See Weather</button>
          <button onClick={()=>setWeather('')}>Close Weather</button>
          {weather?.length? weather.map((w,i)=>(
            <div className="weather-card" key={i}>
                <header >
                    <h2>Weather in {w.name}: {w.weather[0]?.main}</h2>
                </header>
            <ul className="weather_list">
                <li>{w.weather[0].description}</li>
                <li>Temp {w.main?.temp} °F</li>
                <li>Wind speed {w.wind?.speed} m/s</li>
                <li>Humidity {w.main?.humidity} %</li>
            </ul>
            </div>
          )):<p></p>}
    </div>
)
}

export default Weather;