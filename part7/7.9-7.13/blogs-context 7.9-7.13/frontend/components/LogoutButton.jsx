import sessionStorage from "../src/service/sessionStorage";
import { useUserDispatch } from '../context/userContext';

const LogoutButton = ({ logoutStates }) => {
  const dispatch = useUserDispatch();
  const { setUser,setLoadState }= logoutStates;
  const handleLogout = async (event) => {
    event.preventDefault();
    dispatch({type:'CLEAR_USER_ID', payload:''})
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