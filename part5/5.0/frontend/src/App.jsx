import { useEffect, useState } from "react";
import noteService from './services/notes'
import Notifications from '../components/Notifications'
import Footer from '../components/Footer';
import ButtonLanding from "../components/ButtonsLanding";
import NoteForm from "../components/NoteForm";

const App = () => {
  const [notesArray,setNotesArray] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading,setLoading] = useState(false);
  const [user,setUser] = useState(null);

  useEffect(()=>{
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
    if(loggedUserJSON){
      setLoading(true)
        const userLog = JSON.parse(loggedUserJSON);
        setTimeout(()=>{
          setLoading(false);
          setUser(userLog);
           noteService.setToken(userLog.token);
        },1000)
      }
},[])

   useEffect(()=>{
   !notesArray.length ? noteService.getAll()
  .then(initialNotes=>setNotesArray(initialNotes)).catch(err=>console.log(err)) : ""
}
  ,[notesArray]);
 
  return (
    <div>
      <h1 id="NOTES">Notes</h1>
      {loading ? <h1 className="LoadingState">Loading...</h1>:!user&&(
        <>
        <ButtonLanding user={user} setUser={setUser} setErrorMessage={setErrorMessage} />
        <Notifications message={errorMessage} />
        </>
      )
    }     
      {user &&(
        <NoteForm  notesArray={notesArray} setNotesArray={setNotesArray} errorMessage={errorMessage} setErrorMessage={setErrorMessage} setUser={setUser}/>
      )
    }
          <Footer user={user}/>
    </div>
  )
}

export default App
