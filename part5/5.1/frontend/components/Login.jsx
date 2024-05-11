import {useEffect,useState} from'react'
import loginService from '../src/service/login';
const Login =({loginStates})=>{
    const {user,setUser,setErrorMessage,setLoadState,loadState} = loginStates;
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');

    const handleForm = async (event)=>{
        event.preventDefault();
        try{
          const userLog = await loginService.login({username,password});
          setErrorMessage(false);
          setUsername('');
          setPassword('');
          window.localStorage.setItem('userLogged',JSON.stringify(userLog));
          setUser(userLog);
        }
        catch(err){
          setErrorMessage(err.response.data.error.replace(err.response.data.error[0],err.response.data.error[0].toUpperCase()) + '.');
          setUsername('');
          setPassword('');
        }
      }
      
useEffect(()=>{
    const loggedUser = window.localStorage.getItem('userLogged');
    if(loggedUser){
      setLoadState(true)
     const userLog = JSON.parse(loggedUser);
     setTimeout(()=>{
       setLoadState(false);
       setUser(userLog);
     },1000)
    }
  },[])
    return(
        <>
        {loadState ? (<div className='loadStateContainer'><h3>Loading...</h3></div>): 
        !user && (<section className='formContainer'>
            <form className='form'>
                <div>
                    <input required type="text" value={username} onChange={({target})=>setUsername(target.value)} placeholder='username'></input>
                </div>
                <div>
                    <input required type="password" value={password} onChange={({target})=>setPassword(target.value)} placeholder='password'></input>
                </div>
                <button onClick={handleForm}>Login</button>
            </form>
        </section>)
        }
        </>
    )
}

export default Login;