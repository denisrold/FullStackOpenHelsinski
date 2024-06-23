
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
import { Container,Alert } from '@mui/material'
import styled from 'styled-components'


const App = () => {
  const Page = styled.div`
  padding: 1em;
  background: papayawhip;
`

const Navigation = styled.div`
  background: BurlyWood;
  padding: 1em;
`

const Footer = styled.div`
  background: Chocolate;
  padding: 1em;
  margin-top: 1em;
`

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
    <Page>
    <Navigation>

    <Menu user={user}/>
    </Navigation>
    {(message &&
   <Alert severity="success">
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
    <Footer>
    <footer>
      <i>Note app, Department of Computer Science 2024</i>
    </footer>
    </Footer>
    </Page>
    </Container>
  )
}

export default App