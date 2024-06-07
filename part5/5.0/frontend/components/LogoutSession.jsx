import sessionService from '../src/services/sessionStorage';
const LogoutSession = ({ setErrorMessage,setUser }) => {
  const handleLogout=() => {
    sessionService.removeStorageData('loggedNoteAppUser');
    sessionService.removeStorageData('tokenExpires');
    //All States Removes:
    // window.localStorage.clear()
    setErrorMessage(null);
    setUser(null);
  }
  return(
    <div className="LogoutSesion">
      <button className="sesionclose"  onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default LogoutSession;