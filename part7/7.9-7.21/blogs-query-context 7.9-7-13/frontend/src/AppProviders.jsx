import { BlogsProvider } from "../context/blogsContext";
import { NotificationProvider } from "../context/notificationContext";
import { StatusProvider } from "../context/statusContext";
import { UserProvider } from "../context/userContext";

const AppProviders = ({children})=>{
return (
<>  
    <UserProvider>
      <StatusProvider>
        <BlogsProvider>
          <NotificationProvider>
            {children}
          </NotificationProvider>
        </BlogsProvider>
      </StatusProvider>
    </UserProvider>
</>
  )
}

export default AppProviders;