const Message = ({message,errorMessage}) =>{
  //Not message
  if (message === null) {
    return null
  }
  //Array of errors.
  if(Array.isArray(message)){
    return(
      <>
        {
      message.map((m,i)=>(
      <div key={i} className={`${errorMessage?"errorMessage":"message"} errorList`}>
      <p>{m}</p>
      </div>
      ))
      }
      </>
    )
  }

return (
          <div className={errorMessage?"errorMessage":"message"}>
            {message}
          </div>
        )
      }
    
    //Message Configuration
    const messageNotification = (setMessage,setErrorMessage,name,state,errors)=>{
        if(errors)setMessage(errors);
        else {
          setErrorMessage(false);
          setMessage(name+"'s information has been "+ state)}
          
        setTimeout(()=>{
          setMessage(null);
        },4000)
      } 
export { Message, messageNotification};