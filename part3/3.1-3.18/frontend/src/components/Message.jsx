const Message = ({message,errorMessage}) =>{

    if (message === null) {
        return null
      }
return (
          <div className={errorMessage?"errorMessage":"message"}>
            {message}
          </div>
        )
      }

    const messageNotification = (setMessage,name,state)=>{
        setMessage(name+"'s information has been "+ state)
        setTimeout(()=>{
          setMessage(null);
        },4000)
      }      
export { Message, messageNotification};