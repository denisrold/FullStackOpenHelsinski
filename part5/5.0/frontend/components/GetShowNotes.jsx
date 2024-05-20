import Note from "./Notes";
import { useState } from "react";
import ButtonImportance from "./ButtonImportance";
import noteService from "../src/services/notes";

const GetShowNotes = ({setChangesNotes, notesArray,setNotesArray})=>{
    const [showAll, setShowAll] = useState(true);
    const notesToShow = showAll? notesArray : notesArray.filter(note => note.important === true)
   
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
    return(
    <>
     <ButtonImportance setShowAll={setShowAll} showAll={showAll}/>
        <ul>
            {notesToShow.map((note)=><Note setChangesNotes={setChangesNotes} setNotesArray={setNotesArray} key={note.id} id={note.id} content={note.content} important={note.important} toggleImportance={toggleImportanceOf}/>)} 
        </ul>
    </>
    )
}

export default GetShowNotes;