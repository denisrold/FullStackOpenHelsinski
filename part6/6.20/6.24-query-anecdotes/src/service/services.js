import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

export const getAnecdotes = async () => {
  try {
    const response = await axios.get(baseUrl).then((res) => res.data);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createAnecdote = async (newAnec) => {
  try {
    const response = await axios.post(baseUrl, newAnec).then((res) => res.data);
    return response;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const updateVote = async (anecdote) => {
  try {
    const response = await axios
      .put(baseUrl + "/" + `${anecdote.id}`, anecdote)
      .then((res) => res.data);
    return response;
  } catch (e) {
    throw new Error(e.message);
  }
};
