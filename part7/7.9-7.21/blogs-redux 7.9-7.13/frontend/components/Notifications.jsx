import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearNotification } from "../redux/notificationReducer/notificationAction"; 
const Notification = ({ errorMessage,setErrorMessage }) => {
  const dispatch = useDispatch();
  const notification = useSelector(state=>state.notification);
  console.log('Notification',notification);
  useEffect(() => {
    if(errorMessage ===null){ return }
    setTimeout(() => {
      dispatch(clearNotification())
      setErrorMessage(null)
    },3000)
  },[errorMessage])
  return (
    <div className='notificationContainer'>
      <h4 className="title">{ `* ${ notification }` }</h4>
      <h4 className="title">{ `* ${ errorMessage }` }</h4>
    </div>
  );
};

export default Notification;
