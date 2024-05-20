const LogoutSession = ({ setErrorMessage,setUser }) => {
  const handleLogout=() => {
    //only user Login token removed
    window.localStorage.removeItem('loggedNoteAppUser');
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