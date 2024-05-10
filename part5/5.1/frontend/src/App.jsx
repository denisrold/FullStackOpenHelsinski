import './App.css'
import { useState,useEffect } from 'react';
import Notifications from '../components/Notifications';
import Login from '../components/Login';
import LogoutButton from '../components/LogoutButton';

function App() {
  const [user,setUser] = useState(null);
  const [errorMessage,setErrorMessage] = useState(null);
  const [loadState,setLoadState] = useState(false);

  return (
    <>
    <header className='containerHeader'>
      <h1>MyBlogs</h1>
    </header>
    <Login loginStates={{user,setUser,setErrorMessage,setLoadState,loadState}}/>
      {errorMessage&&<Notifications errorMessage={errorMessage}  setErrorMessage={setErrorMessage}/>}
      {user&&(
        <>
        <section className='bodyContainer'>
        </section>
        <LogoutButton logoutStates={{setUser,setLoadState}}/>
        </>
        )
      }
      </>
  )
}

export default App
