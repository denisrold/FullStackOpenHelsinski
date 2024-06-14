import { useDispatch } from "react-redux";
import { createAnecdotes } from'../reducers/anecdoteReducer' 
import { setNotification } from "../reducers/notificationsReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const handleCreate = async (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value
    dispatch(createAnecdotes(content));
    dispatch(setNotification(content+' has been created',5))
  }
return(
    <>
      <h2>create new</h2>
      <form onSubmit={handleCreate}>
        <input name="anecdote"/>
        <button type='submit'>create</button>
      </form>
    </>
)
}; 
export default AnecdoteForm;