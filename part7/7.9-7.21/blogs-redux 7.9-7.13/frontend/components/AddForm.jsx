import Notification from './Notifications';
import { useSelector } from 'react-redux';
const AddForm = ({ setAuthor,author,setTitle,title, handleAddBlogs, setUrl, url }) => {
  const { notification } = useSelector(state=>state.notification);
  return(
    <form id="form" className='formAdd'>
      <div className='formContainer'>
        <label>Title </label>
        <input type="text" placeholder='the blogverse title' required name="title" onChange={({ target }) => setTitle(target.value)} value={ title }/>
        <label>Author </label>
        <input type="text" placeholder='Jhon Travis' required name="author" onChange={({ target }) => setAuthor(target.value)} value={ author }/>
        <label>Url </label>
        <input type="url" placeholder='https://exampleweb.com' required onChange={({ target }) => setUrl(target.value)} name="url" value={ url }/>
      </div>
      <button name='addFormButton' onClick={handleAddBlogs} style={{ display:notification&&'none', marginTop:'1.65rem' }} type="submit">Add</button>
      {notification&&<Notification />}
    </form>
  )
}
export default AddForm;