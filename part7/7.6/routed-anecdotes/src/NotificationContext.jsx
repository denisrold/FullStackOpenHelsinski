
import { createContext, useReducer, useContext } from 'react'

//CREATE REDUCER
const notificationReducer = (state, action) => {
    switch (action.type) {
      case "ADD":
          return action.payload;
      case 'VOTE':
          return action.payload;
      case "CLEAR":
          return '';
      default:
          return state
    }
  }

  //CREATE CONTEXT
  const NotificationContext = createContext()

  //CREATE PROVIDER
  export const NotificationProvider  = (props) => {
    //USEREDUCER
    const [notification, notificationDispatch] = useReducer(notificationReducer, '')
    return (
        <NotificationContext.Provider value={[notification, notificationDispatch] }>
          {/* HERE GOES MAIN.JSX <APP> */}
          {props.children}
        </NotificationContext.Provider>
      )
  }

  //separando el counterFunction dispatch y counter
  
  //COUNTER
  export const useNotificationValue = () => {
    const context = useContext(NotificationContext);
    if (context === undefined) {
      throw new Error('useNotificationValue must be used within a NotificationProvider');
    }
    return context[0]
  }
  //DISPATCH
  export const useNotificationDispatch = () => {
    const context = useContext(NotificationContext);
    if (context === undefined) {
      throw new Error('useNotificationDispatch must be used within a NotificationProvider');
    }
    return context[1]
  }
  
  export default NotificationContext; 