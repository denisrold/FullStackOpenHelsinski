
import FormNotes from '../components/FormNotes'
import Notes from '../components/Notes'
import Persons from '../components/Persons'
import FormPersons from '../components/FormPersons'
import { useResource } from './hooks'
import { Route, Routes, useMatch } from 'react-router-dom'
import Menu from '../components/Menu'
import Home from '../components/Home'
import NotesById from '../components/NotesById'
import Login from '../components/Login'
import { useState,useEffect } from 'react'
import { Alert } from 'react-bootstrap'
import { Container } from '@mui/material'


const App = () => {
  const [user, setUser] = useState(null);
  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')
  const [message, setMessage] = useState(null)
        useEffect(() => {
          if (user) {
            setMessage(`Welcome ${user}`)
            const timer = setTimeout(() => setMessage(null), 5000)
            return () => clearTimeout(timer)
          }
        }, [user])
  //match
  const match = useMatch('/notes/:id')
  const note = match
    ? notes.find(note => note.id === match.params.id)
    : null
  return (
    <Container >
    <Menu user={user}/>
    {(message &&
   <Alert variant="success">
     {message}
   </Alert>
     )}
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path="/notes/:id" element={(
        <>
          <NotesById note={note}/>
        </> 
    )}/>
      <Route path='/login' element={<Login setMessage={setMessage} setUser={setUser}  user={user}/>}/>
      <Route path="/notes" element={(
        <>
          <h2>notes</h2>
          <FormNotes noteService={noteService}/>
          <Notes notes={notes}/>
        </> 
    )}/>
      <Route  path="/persons" element={(
        <>
         <h2>persons</h2>
        <FormPersons personService={personService}/>  
        <Persons persons={persons}/>
        </> 
    )}/>      
    </Routes>
    <footer>
      <i>Note app, Department of Computer Science 2024</i>
    </footer>
    </Container>
  )
}

export default App