import { useEffect,useState } from 'react'
import { useDispatch , useSelector } from 'react-redux';
import { createNotification, clearNotification } from '../redux/notificationReducer/notificationAction';
import Notifications from './Notifications';
import sessionStorage from '../src/service/sessionStorage';
import loginService from "../src/service/login"
import Toggable from './Toggable';
import PropTypes from 'prop-types'

const Login =({ user,setUser,setLoadState,loadState }) => {
  const dispatch = useDispatch();
  const { notification } = useSelector(state => state.notification);
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const handleForm = async (event) => {
    event.preventDefault();
    try{
      const userLog = await loginService.login({ username,password });
      dispatch(clearNotification());
      setUsername('');
      setPassword('');
      //newsession
      sessionStorage.saveUserSession('userLogged',userLog);
      sessionStorage.saveData('tokenExpires','userLogged')
      // window.localStorage.setItem('userLogged',JSON.stringify(userLog));
      setUser(userLog);
    }
    catch(err){
      let errorMessage = err.response.data.error.replace(err.response.data.error[0],err.response.data.error[0].toUpperCase()) + '.' 
      dispatch(createNotification(errorMessage))
      setUsername('');
      setPassword('');
    }
  }
  useEffect(() => {
    //newSesiontoken
    sessionStorage.getData("tokenExpires", 0, 1, "userLogged");
    const loggedUser = window.localStorage.getItem('userLogged');
    if(loggedUser){
      setLoadState(true)
      const userLog = JSON.parse(loggedUser);
      setTimeout(() => {
        setLoadState(false);
        setUser(userLog);
      },1000)
    }
  },[])
  const handleDemo =(e)=>{
    e.preventDefault()
    setUsername('rooter');
    setPassword('Password123*');
  }
  return(
    <>
      {loadState ? (<div className='loadStateContainer'><h3>Loading...</h3></div>):
        !user && (
          <Toggable buttonLabel={"Login"} dispatch={dispatch}>
            <section className='formContainer'>
              <form name="LoginForm" className='form'>
                <div>
                  <input data-testid='username' required type="text" value={username} onChange={({ target }) => setUsername(target.value)} placeholder='user'></input>
                </div>
                <div>
                  <input data-testid='password' required type="password" value={password} onChange={({ target }) => setPassword(target.value)} placeholder='password'></input>
                </div>
                <button name="Login" onClick={handleForm}>Login</button>
                <button onClick={handleDemo}>userDemo</button>
                <p className="loginToRegister">Don&apos;t have an account yet?<a onClick={() => { console.log("go to Register")}}>Register.</a></p>
              </form>
            </section>
          </Toggable>
        )
      }
      {notification&&<Notifications/>}
    </>
  )
}

Login.propTypes={
  setUser:PropTypes.func.isRequired,
  setLoadState:PropTypes.func.isRequired,
  loadState:PropTypes.bool.isRequired
}
export default Login;