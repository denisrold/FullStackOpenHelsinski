import axios from "axios";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
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
const updateBlogs = async (content) => {
  const { id, updatedBlogs } = content;
  const config = { headers: { Authorization: token } };
  const uploaded = await axios.put(`${baseUrl}/${id}`, updatedBlogs, config);
  const response = await getBlogsByID(uploaded.data.id);
  return response;
};
const updateLikes = async (content) => {
  const config = { headers: { Authorization: token } };
  const { blog, unlikes } = content;
  const updatedBlog = { blogs: blog, unlike: unlikes };
  // blogs.unlike = unlike;
  const response = await axios.put(
    `${baseUrl}/likes/${blog.id}`,
    updatedBlog,
    config
  );
  return response.data;
};

// const useCreateBlog = () => {
//   const queryClient = useQueryClient();

//   return useMutation(axios.post(baseUrl, newBlog, config), {
//     onSuccess: () => {
//       queryClient.invalidateQueries(["blogs"]);
//     },
//   });
// };

export default {
  getBlogs,
  createBlogs,
  setToken,
  updateLikes,
  getBlogsByID,
  deleteBlogs,
  updateBlogs,
  // useCreateBlog,
};
