import './App.css'
import { useState } from 'react'
import { useApolloClient, useQuery } from '@apollo/client';
import Persons from '../components/Persons/Persons';
import PersonForm from '../../frontend/components/PersonForm/PersonForm';
import { ALL_PERSONS } from '../queries';
import Notify from '../components/Notify/Notify';
import PhoneForm from '../components/PhoneForm/PhoneForm';
import LoginForm from '../components/LoginForm/LoginForm';



const App = () => {
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
 
  const client = useApolloClient()

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }
  
  
  const result = useQuery(ALL_PERSONS) 
  if (!token) {
    return (
      <div>
        <h2>Login</h2>
        <LoginForm
          setToken={setToken}
          setError={notify}
        />
        <Notify errorMessage={errorMessage} />
      </div>
    )
  } 

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }
  
  if (result.loading)  {
    return <div>loading...</div>
  }

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <button onClick={logout}>logout</button>
      <Persons persons={result.data.allPersons} />
      <PersonForm  setError={notify}/>
      <PhoneForm  setError={notify}/>
    </div>
  )
}



export default App
