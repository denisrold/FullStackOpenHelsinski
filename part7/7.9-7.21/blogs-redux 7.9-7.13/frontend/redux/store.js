import notificationReducer from "./reducers/notificationReducer";
import blogReducer from "./reducers/blogReducer";
import statusReducer from "./reducers/statusReducer";
import userReducer from "./reducers/userReducer";
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
