import { useEffect } from "react";
const Notification = ({errorMessage,setErrorMessage}) => {
  useEffect(()=>{
    if(errorMessage ===null){return}
    setTimeout(()=>{
      setErrorMessage(null)
    },3000)
    },[errorMessage])
  return (
    <div className='notificationContainer'>
      <h4 className="title">{`* ${errorMessage}`}</h4>
    </div>
  
  );
};

export default Notification;
