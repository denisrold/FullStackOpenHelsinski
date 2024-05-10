import { useEffect } from "react";
const Notification = ({errorMessage,setErrorMessage}) => {
  useEffect(()=>{
    if(errorMessage ===null){return}
    setTimeout(()=>{
      setErrorMessage(null)
    },8000)
    },[errorMessage])
  return (
    <div className="errorContainer">
      <h4 className="title">{`* ${errorMessage}`}</h4>
    </div>
  
  );
};

export default Notification;
