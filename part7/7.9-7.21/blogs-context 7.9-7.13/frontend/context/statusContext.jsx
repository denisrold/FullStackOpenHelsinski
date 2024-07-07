import { createContext, useReducer, useContext } from "react";

//CREATE REDUCER
const statusReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return action.payload;
    case "CLEAR":
      return "";
    default:
      return state;
  }
};

//CREATE CONTEXT
const StatusContext = createContext();

//CREATE PROVIDER
export const StatusProvider = (props) => {
  //USEREDUCER
  const [status, statusDispatch] = useReducer(
    statusReducer,
    ""
  );
  return (
    <StatusContext.Provider value={[status, statusDispatch]}>
      {/* HERE GOES MAIN.JSX <APP> */}
      {props.children}
    </StatusContext.Provider>
  );
};

//separando el counterFunction dispatch y counter
//COUNTER

export const useStatusValue = () => {
  const context = useContext(StatusContext);
  if (context === undefined) {
    throw new Error(
      "useNotificationValue must be used within a NotificationProvider"
    );
  }
  return context[0];
};
//DISPATCH
export const useStatusDispatch = () => {
  const context = useContext(StatusContext);
  if (context === undefined) {
    throw new Error(
      "useNotificationDispatch must be used within a NotificationProvider"
    );
  }
  return context[1];
};

export default StatusContext;