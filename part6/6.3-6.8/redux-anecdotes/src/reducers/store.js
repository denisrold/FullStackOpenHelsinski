import noteSlice from "./anecdoteReducer";
import filterReducer from "./filterReducer";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    anecdoteReducer: noteSlice,
    filterReducer,
  },
});

export default store;
