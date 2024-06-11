import { useSelector } from 'react-redux'
import Vote from './Vote'

const AnecdoteList = ()=>{
  const anecdotes = useSelector(state => state).sort((a,b) => b.votes - a.votes );
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