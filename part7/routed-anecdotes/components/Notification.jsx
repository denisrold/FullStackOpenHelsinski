
import { useNotificationDispatch, useNotificationValue } from "../src/NotificationContext"
import { useEffect } from "react";
const Notification = () => {   
    const dispatch = useNotificationDispatch();
    const notificationState = useNotificationValue()

    useEffect(() => {
        if (notificationState.length) {
          const timer = setTimeout(() => {
            dispatch({ type: 'CLEAR' });
          }, 5000);
    
          return () => clearTimeout(timer);
        }
      }, [notificationState, dispatch]);

      if (!notificationState.length) return null

    return(
        <>
         <h3>{notificationState}</h3>
        </>
    )
}
export default Notification