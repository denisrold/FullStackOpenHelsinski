import { createSlice } from "@reduxjs/toolkit";
const initialState = "";

const filterSlice = createSlice({
  name: "anecdotes",
  initialState,
  reducers: {
    filters(state, action) {
      return action.payload;
    },
  },
});

export const { filters } = filterSlice.actions;
export default filterSlice.reducer;
