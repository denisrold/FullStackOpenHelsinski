import { createContext, useReducer, useContext } from "react";

//CREATE REDUCER
const statusReducer = (state, action) => {
  switch (action.type) {
    case "ADD_CREATED":
      return {...state, created:action.payload };
    case "ADD_UPDATED":
      return {...state, updated:action.payload };
    case "CLEAR":
      return   { updated:'',created:'' };
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
    {updated:'',created:''}
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