import { useEffect } from "react";
import NewNote from "../components/NewNote";
import Notes from "../components/Notes";
import VisibilityFilter from "../components/VisibilityFilter";
import noteService from "../services/notes";
import { useDispatch } from "react-redux";
import { setNotes } from "./reducers/noteReducer";


const App = () => {
  const dispatch = useDispatch();  

  useEffect(()=>{
    noteService.getAll().then((notes) => {
      notes.forEach((note) => {
        dispatch(setNotes(note));
      });
    });
  },[])
  return (
    <div>
      <NewNote />
      <VisibilityFilter/>
      <Notes />
    </div>
  )
}

export default App;