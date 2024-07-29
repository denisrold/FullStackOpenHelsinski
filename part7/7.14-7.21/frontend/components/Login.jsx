import { useEffect,useState } from 'react'
import { useDispatch , useSelector } from 'react-redux';
import { createNotification, clearNotification } from '../redux/reducers/notificationReducer';
import Notifications from './Notifications';
import sessionStorage from '../src/service/sessionStorage';
import loginService from "../src/service/login"
import Toggable from './Toggable';
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom';
import RegisterForm from './RegisterForm';

const Login =({ user,setUser,setLoadState,loadState }) => {
  const [ register,setRegister ]= useState(false);
  const navigate=useNavigate();
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
      navigate('/home')
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
        navigate('/home')
      },500)
    }
  },[register])
  const handleDemo = (e) => {
    e.preventDefault()
    setUsername('rooter');
    setPassword('Password123*');
  }

  return(!user&&(
    <>
      {loadState ? (<div className='loadStateContainer'><h3>Loading...</h3></div>):(
          <Toggable buttonLabel={"Login"} dispatch={dispatch}>
            <section className='formContainer '>
              {!register&&(
             <form name="LoginForm" className='form'>
             <div>
               <input data-testid='username' required type="text" value={username} onChange={({ target }) => setUsername(target.value)} placeholder='user'></input>
             </div>
             <div>
               <input data-testid='password' required type="password" value={password} onChange={({ target }) => setPassword(target.value)} placeholder='password'></input>
             </div>
             <button name="Login" onClick={handleForm}>Login</button>
             <button onClick={handleDemo}>demo</button>
             <p className="loginToRegister">Don&apos;t have an account yet?<a onClick={()=>{setRegister(true)}}> Register.</a></p>
           </form>
             )
            }
            {register&&(
             <RegisterForm setRegister={setRegister} user={user} setUser={setUser} setUsername={setUsername} setPassword={setPassword} username={username} password={password} handleForm={handleForm}/>
            )}
            </section>
          </Toggable>
        )
      }
      {notification&&<Notifications/>}
    </>
   )
  )
}

Login.propTypes={
  setUser:PropTypes.func.isRequired,
  setLoadState:PropTypes.func.isRequired,
  loadState:PropTypes.bool.isRequired
}
export default Login;