import sessionStorage from "../src/service/sessionStorage";

const LogoutButton = ({ logoutStates }) => {
  const { setUser,setLoadState }= logoutStates;
  const handleLogout = async (event) => {
    event.preventDefault();
    //sesions storage
    sessionStorage.removeStorageData('tokenExpires');
    sessionStorage.removeStorageData('userLogged');
    // window.localStorage.removeItem('userLogged');
    setUser(null);
    setLoadState(false);
  }
  return(
    <div className='logOutButton'>
      <button data-testid="LogoutButton" onClick={ handleLogout }>Logout</button>
    </div>
  )
}
export default LogoutButton;