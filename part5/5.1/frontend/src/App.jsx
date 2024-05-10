import './App.css'
import { useState,useEffect } from 'react';
import Header from '../components/Headers';
import Notifications from '../components/Notifications';
import Login from '../components/Login';
import LogoutButton from '../components/LogoutButton';

function App() {
  const [user,setUser] = useState(null);
  const [errorMessage,setErrorMessage] = useState(null);
  const [loadState,setLoadState] = useState(false);

  return (
    <>
    <Header/>
    <Login loginStates={{user,setUser,setErrorMessage,setLoadState,loadState}}/>
      {errorMessage&&<Notifications errorMessage={errorMessage}  setErrorMessage={setErrorMessage}/>}
      {user&&(
        <>
        <section className='bodyContainer'> 
        <h3>Esto es un body</h3>
        </section>
        <LogoutButton logoutStates={{setUser,setLoadState}}/>
        </>
        )
      }
      </>
  )
}

export default App
