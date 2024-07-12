import { useEffect } from "react";
import {useNotificationValue,useNotificationDispatch } from '../context/notificationContext';
const Notification = () => {
  // const dispatch = useDispatch();
  const notification = useNotificationValue()
  const dispatch = useNotificationDispatch();
  // const {notification} = useSelector(state=>state.notification);
  useEffect(() => {
    setTimeout(() => {
      dispatch({type:'CLEAR',payload:''})
    },3000)
  },[notification])
  return (
    <div className='notificationContainer'>
      <h4 className="title">{ `* ${ notification }` }</h4>
    </div>
  );
};

export default Notification;
