import Notification from './Notifications';
import { useSelector,useDispatch } from 'react-redux';
import { createBlog } from '../redux/reducers/blogReducer';

const AddForm = ({ setNewBlog,newBlog }) => {
  const dispatch = useDispatch();
  const { notification } = useSelector(state=>state.notification);

  const handleAddBlogs = (e) => {
    e.preventDefault();
     dispatch(createBlog(newBlog))
  }

  const handleInput = (e) =>{
    setNewBlog({...newBlog, [e.target.name]: e.target.value});
  }
  
  return(
    <form id="form" onSubmit={handleAddBlogs} className='formAdd' >
      <div className='formContainer'>
        <label>Title </label>
        <input type="text" placeholder='the blogverse title' required name="title" onChange={handleInput} value={ newBlog.title }/>
        <label>Author </label>
        <input type="text" placeholder='Jhon Travis' required name="author" onChange={handleInput} value={ newBlog.author }/>
        <label>Url </label>
        <input type="url" placeholder='https://exampleweb.com' required onChange={handleInput} name="url" value={ newBlog.url }/>
      </div>
      <button  type='submit' name='addFormButton' style={{ display:notification&&'none', marginTop:'1.65rem' }}>Add</button>
      {notification&&<Notification />}
    </form>
  )
}
export default AddForm;