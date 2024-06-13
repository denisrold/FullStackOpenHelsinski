import { useDispatch } from "react-redux";
import { createAnecdote } from'../reducers/anecdoteReducer'
import { deleteNotification, notification } from "../reducers/notificationsReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const handleCreate = (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value
    dispatch(createAnecdote(content))
    dispatch(notification(content + ' has been created'))
    setTimeout(()=>{dispatch(deleteNotification())},5000)
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