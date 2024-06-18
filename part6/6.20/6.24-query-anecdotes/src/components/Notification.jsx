import { useNotificationValue,useNotificationDispatch } from '../NotificationContext';
import { useEffect } from 'react';
const Notification = () => {
  const dispatch = useNotificationDispatch()
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  const notification = useNotificationValue();
  useEffect(() => {
    if (notification.length) {
      const timer = setTimeout(() => {
        dispatch({ type: 'CLEAR' });
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [notification, dispatch]);
  if (!notification.length) return null
  
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
