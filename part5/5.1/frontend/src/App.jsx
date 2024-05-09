import './App.css'
import { useState,useEffect } from 'react';
import loginService from '../src/service/login';

function App() {
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [user,setUser] = useState(null);
  const [loadState,setLoadState] =useState(false);
  const [errorMessage,setErrorMessage] = useState(null);

  const handleForm = async (event)=>{
    event.preventDefault();
    const userLog = await loginService.login({username,password});
    setUsername('');
    setPassword('');
    window.localStorage.setItem('userLogged',JSON.stringify(userLog));
    setUser(userLog);
  }
  const handleLogout = async (event)=>{
    event.preventDefault();
    window.localStorage.removeItem('userLogged');
    setUser(null);
    setLoadState(false);
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

  return (
    <>
    <header className='containerHeader'>
      <h1>MyBlogs</h1>
    </header>
    {loadState ? <h1>Loading...</h1>: 
      !user && (<section className='formContainer'>
        <form className='form'>
          <div>
            <input type="text" value={username} onChange={({target})=>setUsername(target.value)} placeholder='username'></input>
          </div>
          <div>
            <input type="password" value={password} onChange={({target})=>setPassword(target.value)} placeholder='password'></input>
          </div>
          <button onClick={handleForm}>Login</button>
        </form>
      </section>)}
      {user&&(
        <>
        <section className='bodyContainer'>

        </section>
        <div className='logOutButton'>
          <button onClick={handleLogout}>Logout</button>
        </div>
        </>
        )
      }
      </>
  )
}

export default App
