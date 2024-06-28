import notificationReducer from "./notificationReducer/notificationReducer";
import blogReducer from "./blogReducer/blogReducer";
import statusReducer from "./statusReducer/statusReducer";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    status: statusReducer,
  },
});

console.log(store.getState());
export default store;
