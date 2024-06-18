import { useQuery , useQueryClient, useMutation  } from '@tanstack/react-query'
import {createAnecdote} from'../service/services';
import { useNotificationDispatch } from '../NotificationContext';

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const newAnecdoteMutation =  useMutation({ 
        mutationFn: createAnecdote,
        onSuccess: (response) => {
          queryClient.invalidateQueries({ queryKey: ['anecdotes'] }),
          dispatch({ type:'ADD', payload: `Created ${response.content}` })
        },
        onError: (error) => {
          dispatch({ type: 'ADD', payload: error.message });
        }
    })
  const dispatch = useNotificationDispatch();
  const onCreate =  (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    newAnecdoteMutation.mutate({content,votes:0});
    event.target.anecdote.value = ''
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
