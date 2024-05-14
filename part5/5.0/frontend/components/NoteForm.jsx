import { useState,useEffect } from "react";
import Form from "../components/Form";
import noteService from '../src/services/notes.js'
import Notifications from "./Notifications.jsx";
import Toggable from "./Togglable.jsx";

const NoteForm = ({errorMessage,setErrorMessage,notesArray,setNotesArray})=>{
    const [newNote,setNewNote] = useState("");

  useEffect(()=>{
        !notesArray.length ? noteService.getAll()
       .then(initialNotes=>setNotesArray(initialNotes)).catch(err=>console.log(err)) : ""
     }
       ,[notesArray]);

  const handleNoteChange = (event)=>{
    setNewNote(event.target.value);
  }
      const addNote = (event) => {
        event.preventDefault();
        const newObject = {
          content: newNote,
          important: true,
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

    return(
    <>
        <Toggable buttonLabel='Create Notes'>
          <section className="addFormContainer">
              <Form addNote={addNote} handleNoteChange={handleNoteChange} value={newNote} /> 
              <Notifications message={errorMessage} />
          </section>
        </Toggable>
    </>
    )}

    export default NoteForm;