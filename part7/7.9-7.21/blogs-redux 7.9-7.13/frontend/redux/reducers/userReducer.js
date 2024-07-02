import { userState } from "../states";
import { createSlice } from "@reduxjs/toolkit";
import userService from "../../src/service/user";

const userSlice = createSlice({
  name: "user",
  initialState: userState,
  reducers: {
    loggedUserId(state, action) {
      state.userId = action.payload;
    },
    logoutUserId(state) {
      state.userId = "";
    },
  },
});

export const { loggedUserId, logoutUserId } = userSlice.actions;

export const setUserID = (content) => {
  return async (dispatch) => {
    try {
      const getUserToken = window.localStorage.getItem("userLogged");
      let token = "";
      if (getUserToken) token = await JSON.parse(getUserToken).token;
      userService.setToken(token);
      const ID = await userService.userId();
      await dispatch(loggedUserId(ID));
    } catch (err) {
      console.log(err);
    }
  };
};

export default userSlice.reducer;
