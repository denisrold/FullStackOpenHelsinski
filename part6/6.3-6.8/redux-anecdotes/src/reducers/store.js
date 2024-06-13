import noteSlice from "./anecdoteReducer";
import filterSlice from "./filterReducer";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    anecdoteReducer: noteSlice,
    filterReducer: filterSlice,
  },
});

export default store;
