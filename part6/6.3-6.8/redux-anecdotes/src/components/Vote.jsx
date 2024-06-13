import { useDispatch } from 'react-redux';
import  { newVote } from '../reducers/anecdoteReducer';

const Vote = ({ id ,votes }) => {
    const dispatch = useDispatch()
    const vote = (id) => {
      console.log(newVote(id))
        dispatch(newVote(id))
      }  
    return(
      <div>
        has {votes}
        <button onClick={() => vote(id)}>vote</button>
      </div>
    )
}

export default Vote;