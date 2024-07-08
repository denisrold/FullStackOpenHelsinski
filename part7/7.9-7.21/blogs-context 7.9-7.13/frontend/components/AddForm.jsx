import Notification from './Notifications';
import { useNotificationValue,useNotificationDispatch } from '../context/notificationContext';
import { useBlogsDispatch } from '../context/blogsContext';
import sessionService from '../src/service/sessionStorage';
import blogService from '../src/service/blogs';
import { useStatusDispatch } from '../context/statusContext';

  const AddForm = ({ setNewBlog,newBlog }) => {
  const blogDispatch = useBlogsDispatch();
  const statusDispatch = useStatusDispatch()
  const notificationDispatch = useNotificationDispatch();
  const notification = useNotificationValue()
  const handleAddBlogs = async (e) => {
    e.preventDefault();
      const token = await sessionService.getUserToken();
      blogService.setToken(token);
      try {
        const blog = await blogService.createBlogs(newBlog);
        blogDispatch({ type:'APPEND_BLOG',payload:blog })
        statusDispatch({type:'ADD_CREATED', payload:true});
      } catch (err) {
        if (err.response) {
          if (err.response.data.error.includes("Blog validation failed")) {
            let errorMessage = err.response.data.error
              .split(".")[0]
              .split(":")[2]
              .replace("Path", "")
              .split("`")
              .join("")
              .replace(/\(([^)]+)\)/g, '"$1"');
              notificationDispatch({ type:'ADD', payload:errorMessage });
          } else {
            console.log(err.response.data);
          }
        }
        console.error(err);
      }
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