import './App.css'
import { useState } from 'react'
import { useQuery } from '@apollo/client';
import Persons from '../components/Persons/Persons';
import PersonForm from '../../frontend/components/PersonForm/PersonForm';
import { ALL_PERSONS } from '../queries';
import Notify from '../components/Notify/Notify';

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)

  const result = useQuery(ALL_PERSONS) 

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }
 

  if (result.loading)  {
    return <div>loading...</div>
  }

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <Persons persons={result.data.allPersons} />
      <PersonForm  setError={notify}/>
    </div>
  )
}



export default App
