import { useDispatch } from 'react-redux';
import { newVote } from '../reducers/anecdoteReducer';
import { deleteNotification, notification } from '../reducers/notificationsReducer';
import anecdoteService from '../service/anecdotes';

const Vote = ({ id ,votes,anecdote }) => {
    const dispatch = useDispatch()
    const vote = (id) => {
        anecdoteService.vote(id);
        dispatch(newVote(id));
        dispatch(notification('you voted ' + anecdote))
        setTimeout(()=>{dispatch(deleteNotification())},5000)
      }  
    return(
      <div>
        has {votes}
        <button onClick={() => vote(id)}>vote</button>
      </div>
    )
}

export default Vote;