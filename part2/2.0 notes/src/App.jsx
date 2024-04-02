import { useEffect, useState } from "react";
import Note from "../components/Notes";
import Form from "../components/Form";
import Button from "../components/Button";
import axios from 'axios';

const App = ({ notes }) => {
  const [notesArray,setNotesArray] = useState([]);
  const [newNote,setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);

  useEffect(()=>{
   !notesArray.length ? axios.get("http://localhost:3001/notes")
  .then(response=>setNotesArray([...response.data])) : ""}
  ,[]);

  const addNote = (event) => {
    event.preventDefault();
    let newID= (notesArray.length +1).toString();
    const newObject = {
      id:newID,
      content: newNote,
      important: Math.random() > 0.5
    }
    setNotesArray([...notesArray,newObject]);

    axios
    .post('http://localhost:3001/notes', newObject)
    .then(response => {
      console.log(response)
    })
    setNewNote('');
  }

  const handleNoteChange = (event)=>{
    setNewNote(event.target.value);
  }

  const notesToShow = showAll? notesArray : notesArray.filter(note => note.important === true)


  //Importance Change
  const toggleImportanceOf = (id) => {
    const url = `http://localhost:3001/notes/${id}`
    const note = notesArray.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
    axios.put(url, changedNote).then(response => {
      setNotesArray(notesArray.map(note => note.id !== id ? note : response.data))
    })
  }

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
