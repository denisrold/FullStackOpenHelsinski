const LogoutButton = ({ logoutStates }) => {
  const { setUser,setLoadState }= logoutStates;
  const handleLogout = async (event) => {
    event.preventDefault();
    window.localStorage.removeItem('userLogged');
    setUser(null);
    setLoadState(false);
  }
  return(
    <div className='logOutButton'>
      <button onClick={ handleLogout }>Logout</button>
    </div>
  )
}
export default LogoutButton;