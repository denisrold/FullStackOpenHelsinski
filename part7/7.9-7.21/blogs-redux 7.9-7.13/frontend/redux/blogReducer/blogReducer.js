import { blogState } from "../states";

const blogReducer = (state = blogState, action) => {
  switch (action.type) {
    case "ADD_BLOG":
      return { ...state, blogs: [...state.blogs, action.payload] };
    case "DELETE_BLOG":
      return { ...state, blogs: [...state.blogs, action.payload] };
    case "UPDATE_BLOG":
      return { ...state, blogs: [...state.blogs, action.payload] };
    case "GET_BLOG":
      return { ...state, blogs: [...action.payload] };
    default:
      return state;
  }
};

export default blogReducer;
