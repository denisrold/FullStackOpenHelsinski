import './App.css'
import { useState } from 'react'
import { useApolloClient, useQuery, useMutation, useSubscription } from '@apollo/client';
import Persons from '../components/Persons/Persons';
import PersonForm from '../../frontend/components/PersonForm/PersonForm';
import { ALL_PERSONS, PERSON_ADDED } from '../queries';
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

  //Updating Cache
  const updateCacheWith = (addedPerson) => {
    const includedIn = (set, object) => 
      set.map(p => p.id).includes(object.id)  

    const dataInStore = client.readQuery({ query: ALL_PERSONS })
    if (!includedIn(dataInStore.allPersons, addedPerson)) {
      client.writeQuery({
        query: ALL_PERSONS,
        data: { allPersons : dataInStore.allPersons.concat(addedPerson) }
      })
    }   
  }


  const result = useQuery(ALL_PERSONS)
  useSubscription(PERSON_ADDED, {
    onData: ({ data }) => {
      const addedPerson = data.data.personAdded
      notify(`${addedPerson.name} added`)
      updateCacheWith(addedPerson)
    }
  }) 

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
      <PersonForm  setError={notify} updateCacheWith={updateCacheWith}/>
      <PhoneForm  setError={notify}/>
    </div>
  )
}



export default App
