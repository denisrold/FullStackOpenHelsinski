import axios from "axios";

const getAllCountries = async () => {
  const allcountries = await axios
    .get("https://studies.cs.helsinki.fi/restcountries/api/all")
    .then((response) => {
      return response.data;
    });
  return allcountries;
};

export default getAllCountries;
