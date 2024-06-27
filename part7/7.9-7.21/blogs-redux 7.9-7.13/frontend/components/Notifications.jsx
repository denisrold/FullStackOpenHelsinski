import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearNotification } from "../redux/notificationReducer/notificationAction"; 
const Notification = () => {
  const dispatch = useDispatch();
  const notification = useSelector(state=>state.notification);
  useEffect(() => {
    setTimeout(() => {
      dispatch(clearNotification())
    },3000)
  },[notification])
  return (
    <div className='notificationContainer'>
      <h4 className="title">{ `* ${ notification }` }</h4>
    </div>
  );
};

export default Notification;
