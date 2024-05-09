import loginService from '../src/services/login'
import {useState} from 'react';
const LoginForm = ({loginHandle})=>{
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const {setUser,setErrorMessage}=loginHandle;
    //LOGIN
    const handleLoggin = async  (event)=>{
        event.preventDefault();
        try{
        const userLog = await loginService.login({username,password});
        setUser(userLog);
        setUsername('');
        setPassword('');
  
    } catch(err){
        setErrorMessage(err.response.data.error.replace(err.response.data.error[0],err.response.data.error[0].toUpperCase()) + '.')
        setTimeout(() => {
             setErrorMessage(null)
        }, 3000)
  }
};
    return(
        <div className='userFormContainer'>
    <form className="userForm">
        <div>
            <input name="Username" type="text" value={username} onChange={({target})=>setUsername(target.value)} placeholder="Username" />
        </div>
        <div>
            <input name="Password" type="password" value={password} onChange={({target})=>setPassword(target.value)} placeholder="Password" />
        </div>
        <button type="submit" onClick={handleLoggin}>Login</button>
    </form>
        </div>)
};

export default LoginForm;