import { createContext, useReducer, useContext } from "react";

//CREATE REDUCER
const blogsReducer = (state, action) => {
  switch (action.type) {
    case "ADD_BLOGS":
      return action.payload;
    case "APPEND_BLOG":
      return state = [...state, action.payload];
      case "DELETE_BLOG":{
        const id = action.payload;
        return state.filter( b=>b.id !== id );
      };
      case "UPDATE_BLOG":{
        const { id } = action.payload;
        const { response } = action.payload;
        return state.map(b=> b.id!==id? b : response )
      }
      case "UPDATE_LIKES":{
        const { id, likes } = action.payload;
      return state.map(b=>b.id !== id?b:{ ...b,likes:likes });
      }
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