import axios from "axios";

const getAllCountries = async () => {
  const allcountries = await axios
    .get("https://studies.cs.helsinki.fi/restcountries/api/all")
    .then((response) => {
      return response.data;
    });
  return allcountries;
};

const getWeather = async (lat, long, API_KEY) => {
  const Weather =
    API_KEY != "" &&
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}`
      )
      .then((res) => res.data);
  return Weather;
};

export default { getAllCountries, getWeather };
