import { blogState } from "../states";
import { createSlice } from "@reduxjs/toolkit";
import blogService from "../../src/service/blogs";

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
    createBlog(state, action) {
      state.push(action.payload);
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
    setBloges(state, action) {
      return action.payload;
    },
  },
});

export const { createBlog, deleteBlog, updateBlog, appendBlog, setBloges } =
  blogSlice.actions;
export default blogSlice.reducer;
