import { initialState } from "../states";

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_NOTIFICATION": {
      const { content } = action.payload;
      return { ...state, notification: content };
    }
    case "CLEAR_NOTIFICATION":
      const { content } = action.payload;
      return { ...state, notification: content };
    default:
      return state;
  }
};

export default notificationReducer;
