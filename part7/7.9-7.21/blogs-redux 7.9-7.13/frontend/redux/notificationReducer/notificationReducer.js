import { notificationState } from "../states";

const notificationReducer = (state = notificationState, action) => {
  switch (action.type) {
    case "ADD_NOTIFICATION":
      return [...action.payload];
    case "CLEAR_NOTIFICATION":
      return [...action.payload];
    default:
      return state;
  }
};

export default notificationReducer;
