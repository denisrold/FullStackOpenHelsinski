import { useDispatch } from "react-redux";
import { createAnecdote } from'../reducers/actions'
const FormAnecdote = () => {
  const dispatch = useDispatch();
  const handleCreate = (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value
    dispatch(createAnecdote(content))
  }
return(
    <form onSubmit={handleCreate}>
      <input name="anecdote"/>
      <button type='submit'>create</button>
    </form>
)
}; 
export default FormAnecdote;