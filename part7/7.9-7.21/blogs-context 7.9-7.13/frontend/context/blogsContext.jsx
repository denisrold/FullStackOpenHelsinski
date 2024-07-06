import { createContext, useReducer, useContext } from "react";

//CREATE REDUCER
const blogsReducer = (state, action) => {
  switch (action.type) {
    case "ADD_BLOGS":
      return action.payload;
    case "CLEAR":
      return "";
    default:
      return state;
  }
};

//CREATE CONTEXT
const BlogsContext = createContext();

//CREATE PROVIDER
export const BlogsProvider = (props) => {
  //USEREDUCER
  const [blogs, blogsDispatch] = useReducer(
    blogsReducer,
    ""
  );
  return (
    <BlogsContext.Provider value={[blogs, blogsDispatch]}>
      {/* HERE GOES MAIN.JSX <APP> */}
      {props.children}
    </BlogsContext.Provider>
  );
};


export const useBlogsValue = () => {
  const context = useContext(BlogsContext);
  if (context === undefined) {
    throw new Error(
      "useNotificationValue must be used within a NotificationProvider"
    );
  }
  return context[0];
};
//DISPATCH
export const useBlogsDispatch = () => {
  const context = useContext(BlogsContext);
  if (context === undefined) {
    throw new Error(
      "useNotificationDispatch must be used within a NotificationProvider"
    );
  }
  return context[1];
};

export default BlogsContext;