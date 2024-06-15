import { useDispatch } from 'react-redux';
import { newVote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationsReducer';
import anecdoteService from '../service/anecdotes';

const Vote = ({ id ,votes,anecdote }) => {
    const dispatch = useDispatch()
    const vote = (id) => {
        const addedVote = anecdoteService.vote(id);
        dispatch(newVote(id));
        dispatch(setNotification('you voted: '+anecdote,5))
      }  
    return(
      <div>
        has {votes}
        <button onClick={() => vote(id)}>vote</button>
      </div>
    )
}

export default Vote;