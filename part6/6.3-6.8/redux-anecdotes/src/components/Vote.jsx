import newVote from '../reducers/actions';
import { useDispatch } from 'react-redux';

const Vote = ({ id ,votes }) => {
    const dispatch = useDispatch()

    const vote = (id) => {
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