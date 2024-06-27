import notificationReducer from "./notificationReducer/notificationReducer";
import blogReducer from "./blogReducer/blogReducer";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
  },
});

console.log(store.getState());
export default store;
