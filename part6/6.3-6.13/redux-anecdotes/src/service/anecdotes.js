import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};
const getById = async (id) => {
  try {
    const response = await axios.get(baseUrl + `/${id}`);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};
const vote = async (id) => {
  try {
    const data = await getById(id);
    const newObject = { ...data, votes: data.votes + 1 };
    const response = await axios.put(baseUrl + `/${id}`, newObject);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export default { getAll, vote };
