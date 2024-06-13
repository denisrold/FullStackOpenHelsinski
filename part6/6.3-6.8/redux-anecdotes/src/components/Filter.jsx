import { useDispatch } from 'react-redux';
import { filters } from '../reducers/filterReducer';
const Filter = () => {
    const dispatch = useDispatch();
    const handleChange = (e) => {
      const payload = e.target.value
      dispatch(filters(payload));
    }
    return (
      <div >
        filter:
        <input name='filter' type='text' onChange={handleChange}/>
      </div>
    )
}

export default Filter;