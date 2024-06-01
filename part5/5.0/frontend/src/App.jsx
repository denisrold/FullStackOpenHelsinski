import { useEffect, useState } from "react";
import noteService from './services/notes'
import Notifications from '../components/Notifications'
import Footer from '../components/Footer';
import ButtonLanding from "../components/ButtonsLanding";
import NoteForm from "../components/NoteForm";
import GetShowNotes from '../components/GetShowNotes'
import LogoutSession from "../components/LogoutSession";

const App = () => {
  const [notesArray,setNotesArray] = useState([]);
  const [changesNotes,setChangesNotes]= useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading,setLoading] = useState(false);
  const [user,setUser] = useState(null);
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
    if(!user){
      if(loggedUserJSON){
        setLoading(true)
        const userLog = JSON.parse(loggedUserJSON);
        setTimeout(() => {
          setLoading(false);
          setUser(userLog);
          noteService.setToken(userLog.token);
        },1000)
      }
    }
  },[user])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
    if(loggedUserJSON){
      noteService.getAll()
        .then(initialNotes => setNotesArray(initialNotes)).then(changed => setChangesNotes(false)).catch(err => console.log(err))
    }
  }
  ,[changesNotes]);
  return (
    <div>
      <h1 id="NOTES">Notes</h1>
      {loading ? <h1 className="LoadingState">Loading...</h1>:!user&&(
        <>
          <ButtonLanding user={user} setChangesNotes={ setChangesNotes } setUser={ setUser } setErrorMessage={ setErrorMessage } />
          <Notifications message={ errorMessage } />
        </>
      )
      }
      {user &&(<>
        <section className="showuserContainer">
          <h3>{user.name} logged in</h3>
          <LogoutSession setErrorMessage={ setErrorMessage } setUser={ setUser }/>
        </section>
        <NoteForm setChangesNotes={ setChangesNotes } setNotesArray={ setNotesArray } notesArray={ notesArray } errorMessage={ errorMessage } setErrorMessage={ setErrorMessage }/>
        <GetShowNotes setChangesNotes={ setChangesNotes } notesArray={ notesArray } setNotesArray={ setNotesArray }/>
      </>
      )
      }
      <Footer user={ user }/>
    </div>
  )
}

export default App
