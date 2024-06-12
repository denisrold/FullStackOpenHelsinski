import { useSelector } from 'react-redux'
import Vote from './Vote'

const AnecdoteList = ()=>{
  const anecdotes = useSelector(state => {
    const anecdotes = state.anecdoteReducer;
    const filter = state.filterReducer;
    const filterAnecdotes = anecdotes.filter( a => a.content.toLowerCase().includes(filter.toLowerCase()));
    return filterAnecdotes.sort((a,b) => b.votes - a.votes );
  })
return(
  <>
    {anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
        {anecdote.content}
        </div>
        <Vote id={anecdote.id} votes={anecdote.votes}/>
      </div>
    )}
  </>
)
}

export default AnecdoteList;