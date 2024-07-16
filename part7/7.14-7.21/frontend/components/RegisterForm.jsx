import { useEffect, useState } from "react"
import userService from '../src/service/user';
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { createNotification, clearNotification } from '../redux/reducers/notificationReducer';

const RegisterForm = ({username,password,setPassword,setUsername,setRegister}) => {

  const dispatch = useDispatch();
    const [name,setName] = useState('');
    useEffect(()=>{
      setPassword('');
      setUsername('');
      setName('');
    },[])
    const handleRegister = async  (e)=>{
      e.preventDefault()
      dispatch(clearNotification());
       const newUSer = {
            username:username,
            name:name,
            password:password
        }
        try{
        await userService.createUser(newUSer)  
        window.alert('you can login now.')
        setPassword('');
        setRegister(false)
        }catch(err){
          console.log('este error',err.response.data.error);
          let errorMessage = ''
          if(err.response.data.error === "expected `username` to be unique"){
          errorMessage = err.response.data.error.replace(err.response.data.error,'username already exist.')}
          else{
          errorMessage = err.response.data.error.replace(err.response.data.error[0],err.response.data.error[0].toUpperCase()) + '.' 
          }
          dispatch(createNotification(errorMessage))
        }
    }
    return(
        <form name="LoginForm" className='form' onSubmit={handleRegister}>
          <div>
            <input data-testid='username' required type="text" value={username} onChange={({ target }) => setUsername(target.value)} placeholder='user'></input>
          </div>
          <div>
            <input data-testid='name' required type="text" value={name} onChange={({ target }) => setName(target.value)} placeholder='your name'></input>
          </div>
          <div>
            <input data-testid='password' required type="password" value={password} onChange={({ target }) => setPassword(target.value)} placeholder='password'></input>
          </div> 
        {/* <div>
          <input required type="password" value={password} onChange={({ target }) => setPassword(target.value)} placeholder='repeat password'></input>
        </div> */}
          <button  type='submit' name="Register">Register</button>
          <p className="loginToRegister">do you have an account?<a onClick={()=>{setRegister(false)}}> Login.</a></p>
        </form>
    )
}

export default RegisterForm;