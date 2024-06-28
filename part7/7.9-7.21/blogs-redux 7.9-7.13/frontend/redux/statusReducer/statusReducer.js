import { statusState } from "../states";
import { createSlice } from "@reduxjs/toolkit";

const statusSlice = createSlice({
  name: "status",
  initialState: statusState,
  reducers: {
    changeStatus(state, action) {
      console.log("entre", action.payload);
      state.states.updated = true;
    },
    clearStatus(state) {
      state.states.updated = false;
    },
  },
});

export const { changeStatus, clearStatus } = statusSlice.actions;
export default statusSlice.reducer;
