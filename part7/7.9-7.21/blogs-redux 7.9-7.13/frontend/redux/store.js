import notificationReducer from "./notificationReducer/notificationReducer";
import blogReducer from "./blogReducer/blogReducer";
import statusReducer from "./statusReducer/statusReducer";
import userReducer from "./userReducer/userReducer";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    status: statusReducer,
    user: userReducer,
  },
});

console.log(store.getState());
export default store;
