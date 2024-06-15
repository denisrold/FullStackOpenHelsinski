import { useSelector } from 'react-redux'
import Vote from './Vote'

const AnecdoteList = ()=>{
  const anecdotes = useSelector(state => state.anecdoteReducer);
  const filters = useSelector(state => state.filterReducer.toLowerCase());
return(
  <>
    {anecdotes.filter(a => a.content.toLowerCase().includes(filters)).map(anecdote =>
      <div key={anecdote.id}>
        <div>
        {anecdote.content}
        </div>
        <Vote id={anecdote.id} votes={anecdote.votes} anecdote={anecdote.content}/>
      </div>
    )}
  </>
)
}

export default AnecdoteList;