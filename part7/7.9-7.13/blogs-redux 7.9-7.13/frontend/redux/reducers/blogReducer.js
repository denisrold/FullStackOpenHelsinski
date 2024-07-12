import { blogState } from "../states";
import { createSlice } from "@reduxjs/toolkit";
import blogService from "../../src/service/blogs";
import { createNotification } from "./notificationReducer";
import { createdStatus, updatedStatus } from "./statusReducer";
import sessionService from "../../src/service/sessionStorage";

const blogSlice = createSlice({
  name: "blog",
  initialState: blogState,
  reducers: {
    deleteBlogs(state, action) {
      const filteredBlogs = state.blogs.filter((b) => b.id !== action.payload);
      state.blogs = filteredBlogs;
    },
    updateLikes(state, action) {
      const { id, likes } = action.payload;
      const indexBlog = state.blogs.findIndex((b) => b.id === id);
      if (blog !== -1) {
        state.blogs[indexBlog].likes = likes;
      }
    },
    updateBlogs(state, action) {
      const { id, response } = action.payload;
      const index = state.blogs.findIndex((b) => b.id === id);
      if (index !== -1) {
        state.blogs[index] = response;
      }
    },
    appendBlog(state, action) {
      state.blogs.push(action.payload);
    },
    setBlogs(state, action) {
      return { blogs: action.payload };
    },
  },
});

export const { deleteBlogs, updateBlogs, appendBlog, setBlogs, updateLikes } =
  blogSlice.actions;

//GET ALL BLOGS
export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getBlogs();
    dispatch(setBlogs(blogs.data));
  };
};

//CREATE A NEW BLOGS
export const createBlog = (content) => {
  return async (dispatch) => {
    const token = await sessionService.getUserToken();
    blogService.setToken(token);
    try {
      const newBlog = await blogService.createBlogs(content);
      await dispatch(createdStatus(true));
      await dispatch(appendBlog(newBlog));
    } catch (err) {
      if (err.response) {
        if (err.response.data.error.includes("Blog validation failed")) {
          let errorMessage = err.response.data.error
            .split(".")[0]
            .split(":")[2]
            .replace("Path", "")
            .split("`")
            .join("")
            .replace(/\(([^)]+)\)/g, '"$1"');
          dispatch(createNotification(errorMessage));
        } else {
          console.log(err.response.data);
        }
      }
      console.error(err);
    }
  };
};

//UPDATE BLOG:
export const updateBlog = (content) => {
  const { id, updatedBlogs } = content;
  return async (dispatch) => {
    const token = await sessionService.getUserToken();
    blogService.setToken(token);
    try {
      const response = await blogService.updateBlogs(id, updatedBlogs);
      await dispatch(updatedStatus(true));
      await dispatch(updateBlogs({ id, response }));
    } catch (err) {
      if (err.response) {
        if (err.response.data.error.includes("Validation failed")) {
          let errorMessage = err.response.data.error
            .split(".")[0]
            .split(":")[2]
            .replace("Path", "")
            .split("`")
            .join("")
            .replace(/\(([^)]+)\)/g, '"$1"');
          dispatch(createNotification(errorMessage));
        } else {
          console.log(err.response.data);
        }
      }
      console.error(err);
    }
  };
};

//UPDATELIKE BLOG:
export const updateLike = (content) => {
  const unlikes = content.unlikes;
  const blog = content.blog;
  return async (dispatch) => {
    try {
      //USER AND LIKES INFO.
      const token = await sessionService.getUserToken();
      blogService.setToken(token);
      //update likes on database
      const service = await blogService.updateLikes(blog, unlikes);
      dispatch(updateLikes({ id: service.id, likes: service.likes }));
    } catch (err) {
      console.error(err);
    }
  };
};

//DELETE BLOG
export const deleteBlog = (id) => {
  return async (dispatch) => {
    try {
      if (window.confirm("Do you really want to delete this blog?")) {
        //get token with userdata
        const token = await sessionService.getUserToken();
        blogService.setToken(token);
        await blogService.deleteBlogs(id);
        await dispatch(deleteBlogs(id));
      } else {
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export default blogSlice.reducer;
