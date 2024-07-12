import { notificationState } from "../states";
import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: notificationState,
  reducers: {
    createNotification(state, action) {
      const content = action.payload;
      state.notification = content;
    },
    clearNotification(state) {
      state.notification = false;
    },
  },
});

export const { createNotification, clearNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
