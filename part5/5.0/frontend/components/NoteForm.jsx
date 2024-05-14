import { useState,useEffect } from "react";
import Note from "../components/Notes";
import Form from "../components/Form";
import Button from "../components/Button";
import noteService from '../src/services/notes.js'
import Notifications from "./Notifications.jsx";
import Toggable from "./Togglable.jsx";
const NoteForm = ({errorMessage,setErrorMessage,setUser})=>{
    const [newNote,setNewNote] = useState("");
    const [showAll, setShowAll] = useState(true);
    const [notesArray,setNotesArray] = useState([]);
    const handleLogout=()=>{
        //only user Login token removed
        window.localStorage.removeItem('loggedNoteAppUser');
        //All States Removes: 
        // window.localStorage.clear()
        setErrorMessage(null);
        setUser(null);
      }

      useEffect(()=>{
        !notesArray.length ? noteService.getAll()
       .then(initialNotes=>setNotesArray(initialNotes)).catch(err=>console.log(err)) : ""
     }
       ,[notesArray]);
 
       
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
      

  const handleNoteChange = (event)=>{
    setNewNote(event.target.value);
  }
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
        .catch(err=>{setErrorMessage(err.response.data.error.split('Path')[1].replace(/`/g, ''));
            setTimeout(()=>{setErrorMessage(null)},1500)
      });
        setNewNote('');
      }

      const notesToShow = showAll? notesArray : notesArray.filter(note => note.important === true)
    return(
    <>
        <div className="LogoutSesion">
            <button className="sesionclose"  onClick={handleLogout}>Logout</button>
        </div>
        <Toggable buttonLabel='Add new note'>
        <section className="addFormContainer">
            <Form addNote={addNote} handleNoteChange={handleNoteChange} value={newNote} /> 
            <Notifications message={errorMessage} />
        </section>
        </Toggable>
        <Button setShowAll={setShowAll} showAll={showAll}/>
        <ul>
            {notesToShow.map((note)=><Note key={note.id} id={note.id} content={note.content} important={note.important} toggleImportance={toggleImportanceOf}/>)} 
        </ul>
    </>
    )}

    export default NoteForm;