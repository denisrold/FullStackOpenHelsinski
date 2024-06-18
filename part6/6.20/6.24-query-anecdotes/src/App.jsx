import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery , useQueryClient, useMutation  } from '@tanstack/react-query'
import { getAnecdotes,updateVote } from './service/services';
import { useNotificationDispatch } from './NotificationContext';

const App = () => {
  const dispatch = useNotificationDispatch();
  const queryClient = useQueryClient()
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry:2
  })

  const updateVoteMutation =  useMutation({ 
    mutationFn: updateVote,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] }),
      dispatch( {type:'VOTE',payload:`you voted: ${response.content}`} )
    }
})
  if(result.isLoading){
    return <div>Loading...</div>
  }
  if (result.isError){
    return (<div>anecdote service no available due to problems in server</div>)
  }
  

  const handleVote = (anecdote) => {
    updateVoteMutation.mutate({...anecdote , votes: anecdote.votes+1 });
   
  }

  const anecdotes = result?result.data:[
    {
      "content": "If it hurts, do it more often",
      "id": "47145",
      "votes": 0
    },
  ]

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
