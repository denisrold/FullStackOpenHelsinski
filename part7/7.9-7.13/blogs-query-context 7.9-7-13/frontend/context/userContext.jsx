import { createContext, useReducer, useContext } from "react";

//CREATE REDUCER
const userReducer = (state, action) => {
  switch (action.type) {
    case "ADD_USER_ID":
      return action.payload;
    case "CLEAR_USER_ID":
      return "";
    default:
      return state;
  }
};

//CREATE CONTEXT
const UserContext = createContext();

//CREATE PROVIDER
export const UserProvider = (props) => {
  //USEREDUCER
  const [user, userDispatch] = useReducer(
    userReducer,
    ""
  );
  return (
    <UserContext.Provider value={[user, userDispatch]}>
      {/* HERE GOES MAIN.JSX <APP> */}
      {props.children}
    </UserContext.Provider>
  );
};


export const useUserValue = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(
      "useNotificationValue must be used within a NotificationProvider"
    );
  }
  return context[0];
};
//DISPATCH
export const useUserDispatch = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(
      "useNotificationDispatch must be used within a NotificationProvider"
    );
  }
  return context[1];
};

export default UserContext;