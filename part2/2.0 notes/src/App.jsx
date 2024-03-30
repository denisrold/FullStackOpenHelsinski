import { useState } from "react";
import Note from "../components/Notes";
import Form from "../components/Form";
import Button from "../components/Button";

const App = ({ notes }) => {
  const [notesArray,setNotesArray] = useState(notes);
  const [newNote,setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);

  const addNote = (event) => {
    event.preventDefault();
    const newObject = {
      id: notesArray.length +1 ,
      content: newNote,
      important: Math.random() > 0.5
    }
    setNotesArray([...notesArray,newObject]);
    setNewNote('');
  }

  const handleNoteChange = (event)=>{
    setNewNote(event.target.value);
  }

  const notesToShow = showAll? notesArray : notesArray.filter(note => note.important === true)

  return (
    <div>
      <h1>Notes</h1>
      <Button setShowAll={setShowAll} showAll={showAll}/>
      <ul>
      {notesToShow.map((note)=><Note key={note.id} content={note.content}/>)} 
      </ul>
      <Form addNote={addNote} handleNoteChange={handleNoteChange} value={newNote} /> 
    </div>
  )
}

export default App
