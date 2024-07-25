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
    getAll(state, action) {
      state.users = action.payload;
    },
  },
});

export const { loggedUserId, logoutUserId, getAll } = userSlice.actions;

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

export const getAllUsers = () => {
  return async (dispatch) => {
    try {
      const users = await userService.getAllUsers();
      const sortUsers = users.sort((a, b) => b.blogs.length - a.blogs.length);
      await dispatch(getAll(sortUsers));
    } catch (err) {
      console.log(err);
    }
  };
};

export default userSlice.reducer;
