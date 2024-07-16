import { useState } from "react"
import userService from '../src/service/user';
import { useNavigate } from "react-router-dom";
const RegisterForm = ({username,password,setPassword,setUsername,setRegister}) => {
    const navigate = useNavigate();
    const [repeatPassword,setRepeatPassword] = useState(false);
    const [isRegister,setIsRegister] = useState(false);
    const [name,setName] = useState('');
    const handleRegister = ()=>{
       const newUSer = {
            username:username,
            name:name,
            password:password
        }
        try{
            userService.createUser(newUSer)
            setIsRegister(true);
        }catch(err){
            console.log('este error',err);
        }
    }
    // if(isRegister){navigate('/home')}
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