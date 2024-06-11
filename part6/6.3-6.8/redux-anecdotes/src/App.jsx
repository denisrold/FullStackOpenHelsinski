import { useSelector, useDispatch } from 'react-redux'
import FormAnecdote from './components/FormAnecdote';
import Vote from './components/Vote'

const App = () => {
  const anecdotes = useSelector(state => state).sort((a,b) => b.votes - a.votes );

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <Vote id={anecdote.id} votes={anecdote.votes}/>
        </div>
      )}
      <h2>create new</h2>
      <FormAnecdote />
    </div>
  )
}

export default App