import noteSlice from "./noteReducer";
import filterSlice from "./filterReducer";
import { configureStore } from "@reduxjs/toolkit";

// const reducer = combineReducers({
//   note: noteReducer,
//   filter: filterReducer,
// });

const store = configureStore({
  reducer: {
    notes: noteSlice,
    filter: filterSlice,
  },
});

export default store;
