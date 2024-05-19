import axios from "axios";

const baseUrl = "http://localhost:3001/api/notes";
let token = null;
const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((res) => res.data);
};

const create = (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = axios.post(baseUrl, newObject, config);
  return request.then((res) => res.data);
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((res) => res.data);
};

const deleteNote = (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};
export default {
  getAll,
  create,
  update,
  setToken,
  deleteNote,
};
