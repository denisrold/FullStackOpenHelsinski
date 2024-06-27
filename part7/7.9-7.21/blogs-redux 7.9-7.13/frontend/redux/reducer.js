import { createStore } from "redux";
const initialState = [];

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_NOTIFICATION":
      return [...action.payload];
    case "CLEAR_NOTIFICATION":
      return [...action.payload];
    default:
      return state;
  }
};
/*
{type:'ADD',payload:{
notification:'i am a notification.'}}
*/
const store = createStore(notificationReducer);

export default store;
