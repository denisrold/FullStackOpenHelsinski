import { createStore, combineReducers } from "redux";
import notificationReducer from "./notificationReducer/notificationReducer";
import blogReducer from "./blogReducer/blogReducer";

const reducer = combineReducers({
  notification: notificationReducer,
  blogs: blogReducer,
});

const store = createStore(reducer);
console.log(store.getState());
export default store;
