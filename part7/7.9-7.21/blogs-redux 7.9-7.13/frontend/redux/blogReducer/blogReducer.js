import { blogState } from "../states";
import { createSlice } from "@reduxjs/toolkit";
import blogService from "../../src/service/blogs";
import { createNotification } from "../notificationReducer/notificationReducer";
import { changeStatus } from "../statusReducer/statusReducer";

const blogSlice = createSlice({
  name: "blog",
  initialState: blogState,
  reducers: {
    deleteBlog(state, action) {
      const content = action.payload;
      return state;
    },
    updateBlog(state, action) {
      const content = action.payload;
      return state;
    },
    appendBlog(state, action) {
      state.blogs.push(action.payload);
    },
    setBlogs(state, action) {
      return { blogs: action.payload, states: false };
    },
  },
});

export const { deleteBlog, updateBlog, appendBlog, setBlogs } =
  blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getBlogs();
    dispatch(setBlogs(blogs.data));
  };
};

export const createBlog = (content) => {
  return async (dispatch) => {
    const userToken = window.localStorage.getItem("userLogged");
    const JSONPARSE = await JSON.parse(userToken);
    blogService.setToken(JSONPARSE.token);
    try {
      const newBlog = await blogService.createBlogs(content);
      await dispatch(changeStatus(true));
      await dispatch(appendBlog(newBlog));
      return newBlog;
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

export default blogSlice.reducer;
