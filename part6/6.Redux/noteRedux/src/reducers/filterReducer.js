import { createSlice } from "@reduxjs/toolkit";

const initialState = "ALL";
const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    filterChange(state, action) {
      const content = action.payload;
      return content;
    },
  },
});
// export const filterChange = (filter) => {
//   return {
//     type: "SET_FILTER",
//     payload: filter,
//   };
// // };
// const filterReducer = (state = "ALL", action) => {
//   switch (action.type) {
//     case "SET_FILTER":
//       return action.payload;
//     default:
//       return state;
//   }
// };

export const { filterChange } = filterSlice.actions;
export default filterSlice.reducer;
