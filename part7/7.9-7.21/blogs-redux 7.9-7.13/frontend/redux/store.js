import { createStore } from "redux";
import notificationReducer from "./notificationReducer/notificationReducer";

const store = createStore(notificationReducer);

export default store;
