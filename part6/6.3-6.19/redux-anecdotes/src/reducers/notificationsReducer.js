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
export const setNotification = (content, time, state) => {
  return async (dispatch) => {
    dispatch(notification(content));
    setTimeout(() => {
      dispatch(deleteNotification());
    }, time * 1000);
  };
};
export default notificationSlice.reducer;
