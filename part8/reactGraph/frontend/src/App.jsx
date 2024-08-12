import './App.css'
import React from 'react'
import { useQuery } from '@apollo/client';
import Persons from '../components/Persons/Persons';
import { ALL_PERSONS } from '../queries';

const App = () => {
  const result = useQuery(ALL_PERSONS)

  if (result.loading)  {
    return <div>loading...</div>
  }

  return (
    <div>
      <Persons persons={result.data.allPersons} />
    </div>
  )
}


export default App
