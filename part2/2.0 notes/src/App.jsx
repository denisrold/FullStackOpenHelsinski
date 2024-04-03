import { useEffect, useState } from "react";
import Note from "../components/Notes";
import Form from "../components/Form";
import Button from "../components/Button";
import noteService from './services/notes'


const App = () => {
  const [notesArray,setNotesArray] = useState([]);
  const [newNote,setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);

  useEffect(()=>{
   !notesArray.length ? noteService.getAll()
  .then(initialNotes=>setNotesArray(initialNotes)).catch(err=>console.log(err)) : ""}
  ,[]);

  //SERVER COMMUNICATION
  const addNote = (event) => {
    event.preventDefault();

    let newID= (notesArray.length +1).toString();
    const newObject = {
      id:newID,
      content: newNote,
      important: Math.random() > 0.5
    }
    setNotesArray([...notesArray,newObject]);

    noteService.create(newObject)
    .then(createdNote => {
      console.log(createdNote)
    })
    .catch(err=>console.log(err));
    setNewNote('')
  }


  const handleNoteChange = (event)=>{
    setNewNote(event.target.value);
  }

//Importance Change
    const toggleImportanceOf = (id) => {
      const note = notesArray.find(n => n.id === id)
      const changedNote = { ...note, important: !note.important }
      noteService.update(id, changedNote).then(updatedNote => {
        setNotesArray(notesArray.map(note => note.id !== id ? note : updatedNote))
      }).catch(err=>console.log(err));
    }

  //FILTER NOTES
  const notesToShow = showAll? notesArray : notesArray.filter(note => note.important === true)

  return (
    <div>
      <h1>Notes</h1>
      <Button setShowAll={setShowAll} showAll={showAll}/>
      <ul>
      {notesToShow.map((note)=><Note key={note.id} id={note.id} content={note.content} important={note.important} toggleImportance={toggleImportanceOf}/>)} 
      </ul>
      <Form addNote={addNote} handleNoteChange={handleNoteChange} value={newNote} /> 
    </div>
  )
}

export default App
