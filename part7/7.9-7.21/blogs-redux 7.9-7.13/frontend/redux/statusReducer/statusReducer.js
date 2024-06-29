import { statusState } from "../states";
import { createSlice } from "@reduxjs/toolkit";

const statusSlice = createSlice({
  name: "status",
  initialState: statusState,
  reducers: {
    createdStatus(state, action) {
      state.states.created = true;
    },
    updatedStatus(state, action) {
      state.states.updated = true;
    },
    clearStatus(state) {
      state.states.updated = false;
    },
  },
});

export const { createdStatus, clearStatus, updatedStatus } =
  statusSlice.actions;
export default statusSlice.reducer;
