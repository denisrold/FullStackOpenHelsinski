import { useDispatch, useSelector } from "react-redux"
import { toggleImportanceById } from "../src/reducers/noteReducer";

const Notes = () =>{
    const dispatch = useDispatch();

    const notes = useSelector(({filter , notes}) => {
      if(filter === 'ALL'){ return notes}
      return filter === 'IMPORTANT'?
      notes.filter(note => note.important):
      notes.filter(note => !note.important);
    })

    const toggleImportance = (id) => {
      dispatch(toggleImportanceById(id))
    }

  return(
    <ul>
    {notes.map(note => (
      <li key={note.id}
      onClick={() => toggleImportance(note.id)}
      >
        {note.content}
        <strong>
          {note.important ? 'important' : ''}
        </strong>
      </li>
    )
    )}
  </ul>
  )
}

export default Notes;