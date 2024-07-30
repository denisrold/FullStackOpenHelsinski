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
  const created = await axios.post(baseUrl, newBlog, config);
  const response = await getBlogsByID(created.data.id);
  return response;
};
const deleteBlogs = async (id) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};
const updateBlogs = async (id, updateBlog) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.put(`${baseUrl}/${id}`, updateBlog, config);
  return response.data;
};
const updateLikes = async (blogs, unlike) => {
  const config = { headers: { Authorization: token } };
  const updatedBlog = { blogs: blogs, unlike: unlike };
  const response = await axios.put(
    `${baseUrl}/likes/${blogs.id}`,
    updatedBlog,
    config
  );
  return response.data;
};

const updateComments = async (comment, blog) => {
  const newComment = { comment: comment };
  const response = await axios.put(`${baseUrl}/comments/${blog.id}`, {
    comment,
  });
  return response.data;
};

export default {
  getBlogs,
  createBlogs,
  setToken,
  updateLikes,
  getBlogsByID,
  deleteBlogs,
  updateBlogs,
  updateComments,
};
