import { useEffect, useState } from "react";
import Note from "../components/Notes";
import Form from "../components/Form";
import Button from "../components/Button";
import noteService from './services/notes'
import Notifications from '../components/Notifications'
import Footer from '../components/Footer';
import LoginForm from "../components/LoginForm";
import ButtonLanding from "../components/ButtonsLanding";

const App = () => {
  const [notesArray,setNotesArray] = useState([]);
  const [newNote,setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);
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
  
// };
//handle logout
const handleLogout=()=>{
  //only user Login token removed
  window.localStorage.removeItem('loggedNoteAppUser');
  //All States Removes: 
  // window.localStorage.clear()
  setUser(null);
}
  //SERVER COMMUNICATION
  const addNote = (event) => {
    event.preventDefault();
    
    // let newID = (notesArray.length +1).toString();
    const newObject = {
      content: newNote,
      important: Math.random() > 0.5
    }
    document.querySelector("#inputNote").value = "";
    noteService.create(newObject)
    .then(createdNote => {
      setNotesArray([...notesArray,createdNote]);
        })
    .catch(err=>console.log(err));
    setNewNote('');
  }

  const handleNoteChange = (event)=>{
    setNewNote(event.target.value);
  }

//Importance Change && SET ERRORS
    const toggleImportanceOf = (id) => {
      const note = notesArray.find(n => n.id === id)
      const changedNote = { ...note, important: !note.important }
     //update and errors.
      noteService.update(id, changedNote).then(updatedNote => {
        setNotesArray(notesArray.map(note => note.id !== id ? note : updatedNote))
      }).catch(error => {
        setErrorMessage(`Note '${note.content}' NotFound`);
        setTimeout(() =>{ 
          setErrorMessage(null) 
        }, 1000);
       setNotesArray(notesArray.filter(n => n.id !== id));}
      );
    }

  //FILTER NOTES
  const notesToShow = showAll? notesArray : notesArray.filter(note => note.important === true)
  
  //NoteForm
  const NoteForm = ()=>(<>
    <div className="LogoutSesion">
     <button className="sesionclose"  onClick={handleLogout}>Logout</button>
    </div>
    <Form addNote={addNote} handleNoteChange={handleNoteChange} value={newNote} /> 
    <Button setShowAll={setShowAll} showAll={showAll}/>
    <ul>
    {notesToShow.map((note)=><Note key={note.id} id={note.id} content={note.content} important={note.important} toggleImportance={toggleImportanceOf}/>)} 
    </ul>

    </>)

  return (
    <div>
      <h1 id="NOTES">Notes</h1>
      {loading ? <h1 className="LoadingState">Loading...</h1>:!user&&(
        <ButtonLanding user={user} setUser={setUser} setErrorMessage={setErrorMessage}/>
      )
    }     
      {user &&(
        NoteForm()
      )
    }
          <Notifications message={errorMessage} />
          <Footer user={user}/>
    </div>
  )
}

export default App
