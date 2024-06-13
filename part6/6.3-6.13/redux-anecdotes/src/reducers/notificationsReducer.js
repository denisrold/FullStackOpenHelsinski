import { createSlice } from "@reduxjs/toolkit";
const initialState = "";

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    notification(state, action) {
      return action.payload;
    },
    deleteNotification(state, action) {
      return "";
    },
  },
});

export const { notification, deleteNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
