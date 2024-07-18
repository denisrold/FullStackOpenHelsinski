import './LogoutButton.css';
import sessionStorage from "../../src/service/sessionStorage";
import { useNavigate } from "react-router-dom";
import { useDispatch , useSelector } from 'react-redux';
import { logoutUserId } from "../../redux/reducers/userReducer";

const LogoutButton = ({ logoutStates }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setUser,setLoadState }= logoutStates;
  const handleLogout = async (event) => {
    event.preventDefault();
    //sesions storage
    sessionStorage.removeStorageData('tokenExpires');
    sessionStorage.removeStorageData('userLogged');
    // window.localStorage.removeItem('userLogged');
    setUser(null);
    setLoadState(false);
    dispatch(logoutUserId());
    navigate('/')
  }
  return(
    <div className='logOutButton'>
      <button data-testid="LogoutButton" onClick={ handleLogout }>Logout</button>
    </div>
  )
}
export default LogoutButton;