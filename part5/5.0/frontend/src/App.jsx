import { useEffect, useState } from "react";
import Note from "../components/Notes";
import Form from "../components/Form";
import Button from "../components/Button";
import noteService from './services/notes'
import Notifications from '../components/Notifications'
import Footer from '../components/Footer';
import login from "./services/login";

const App = () => {
  const [notesArray,setNotesArray] = useState([]);
  const [newNote,setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [user,setUser] = useState(null);

   useEffect(()=>{
   !notesArray.length ? noteService.getAll()
  .then(initialNotes=>setNotesArray(initialNotes)).catch(err=>console.log(err)) : ""
}
  ,[notesArray]);


  //LOGIN
  const handleLoggin =async  (event)=>{
    event.preventDefault();
    try{
    const userLog = await login({username,password});
    setUser(userLog);
    setUsername('');
    setPassword('');
    console.log(user);
  } catch(err){
    setErrorMessage(err.response.data.error.replace(err.response.data.error[0],err.response.data.error[0].toUpperCase()) + '.')
    setTimeout(() => {
      setErrorMessage(null)
    }, 3000)
  }
  
};
//handle logout
const handleLogout=()=>{
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

  return (
    <div>
      <h1 id="NOTES">Notes</h1>
      {user&&
      <div className="LogoutSesion">
      <button className="sesionclose"  onClick={handleLogout}>Logout</button>
      </div>}
      {!user&&
      <form className="userForm">
        <div>
          <input name="Username" type="text" value={username} onChange={(target)=>setUsername(target.target.value)} placeholder="Username" />
        </div>
        <div>
          <input name="Password" type="password" value={password} onChange={(target)=>setPassword(target.target.value)} placeholder="Password" />
        </div>
        <button type="submit" onClick={handleLoggin}>Login</button>
      </form>}
      <Notifications message={errorMessage} />
      
      {user &&
      <>
      <Form addNote={addNote} handleNoteChange={handleNoteChange} value={newNote} /> 
      <Button setShowAll={setShowAll} showAll={showAll}/>
      <ul>
      {notesToShow.map((note)=><Note key={note.id} id={note.id} content={note.content} important={note.important} toggleImportance={toggleImportanceOf}/>)} 
      </ul>
      <Footer />
      </>
      }
    </div>
  )
}

export default App
