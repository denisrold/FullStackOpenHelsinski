import { useDispatch } from 'react-redux';
import { createNote } from "../src/reducers/noteReducer"
import noteService from '../services/notes';

  const NewNote = () => {
      const dispatch = useDispatch()
      const addNote = async (event) => {
        event.preventDefault()
        const content = event.target.note.value
        const newNote = await noteService.createNew(content);
        event.target.note.value = ''
        dispatch(createNote(newNote))
      }
      return(
      <form onSubmit={addNote}>
      <input name="note" /> 
      <button type="submit">add</button>
      </form>
      )
  }

  export default NewNote;