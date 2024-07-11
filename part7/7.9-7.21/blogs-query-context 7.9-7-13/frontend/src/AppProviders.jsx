import { NotificationProvider } from "../context/notificationContext";
import { StatusProvider } from "../context/statusContext";
import { UserProvider } from "../context/userContext";

const AppProviders = ({children})=>{
return (
<>  
    <UserProvider>
      <StatusProvider>
        <NotificationProvider>
          {children}
        </NotificationProvider>
      </StatusProvider>
    </UserProvider>
</>
  )
}

export default AppProviders;