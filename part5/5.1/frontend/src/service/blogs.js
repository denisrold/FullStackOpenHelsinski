import axios from "axios";
const baseUrl = "/api/blogs";
let token = "";
const setToken = (tokenConfig) => {
  token = `Bearer ${tokenConfig}`;
};
const getBlogs = async () => {
  const response = await axios.get(baseUrl);
  return response;
};

const createBlogs = async (newBlog) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};
export default { getBlogs, createBlogs, setToken };
