import { useDispatch } from 'react-redux';
import { newVote } from '../reducers/anecdoteReducer';
import { deleteNotification, notification } from '../reducers/notificationsReducer';

const Vote = ({ id ,votes,anecdote }) => {
    const dispatch = useDispatch()
    const vote = (id) => {
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