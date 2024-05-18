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
const getBlogsByID = async (blogID) => {
  const response = await axios.get(`${baseUrl}/${blogID}`);
  return response.data;
};

const createBlogs = async (newBlog) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};
const deleteBlogs = async (id) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};
const updateLikes = async (blogs, unlike) => {
  const config = { headers: { Authorization: token } };
  const updatedBlog = blogs;
  blogs.unlike = unlike;
  const response = await axios.put(
    `${baseUrl}/likes/${blogs.id}`,
    updatedBlog,
    config
  );
  return response.data;
};
export default {
  getBlogs,
  createBlogs,
  setToken,
  updateLikes,
  getBlogsByID,
  deleteBlogs,
};
