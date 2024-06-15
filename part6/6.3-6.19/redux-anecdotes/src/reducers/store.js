import noteSlice from "./anecdoteReducer";
import filterSlice from "./filterReducer";
import notificationSlice from "./notificationsReducer";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    anecdoteReducer: noteSlice,
    filterReducer: filterSlice,
    notificationReducer: notificationSlice,
  },
});

export default store;
