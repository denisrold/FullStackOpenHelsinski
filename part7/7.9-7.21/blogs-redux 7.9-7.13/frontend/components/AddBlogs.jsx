import { useState,useRef } from 'react';
import blogs from '../src/service/blogs';
import AddedMessage from './AddedMessage';
import Toggable from './Toggable';
import AddForm from './AddForm';
import { useDispatch } from 'react-redux';
import { createNotification } from '../redux/notificationReducer/notificationAction';

const AddBlogs = ({ setNewBlog }) => {
  const dispatch = useDispatch();
  const [addState,setAddState] = useState(false);
  const [addedState,setAddedState] = useState(false);
  const [title,setTitle] =useState("");
  const [url,setUrl] =useState("");
  const [author,setAuthor] =useState("");
  const blogFormRef = useRef();

  const handleAddBlogs = async (event) => {
    event.preventDefault();
    const userToken = window.localStorage.getItem('userLogged');
    const JSONPARSE = await JSON.parse(userToken)
    blogs.setToken(JSONPARSE.token);
    const newBlog = { url,title,author };
    try {
      await blogs.createBlogs(newBlog);
      setNewBlog(true);
      setAddState(false);
      setAddedState(true);
      blogFormRef.current.toggleVisibility();
      setTimeout(() => {
        setAddedState(false);
        setTitle('');
        setUrl('');
        setAuthor('');
      },2000)
    }
    catch(err){
      if(err.response.data.error.includes('Blog validation failed')){
        let errorMessage = err.response.data.error.split('.')[0].split(':')[2].replace("Path","").split('`').join("").replace(/\(([^)]+)\)/g, '"$1"');
        dispatch(createNotification(errorMessage));
      }else{
        console.log(err.response.data)
      }
    }
  }
  return(
    <div className='containerAbsolute'>
      {addedState&&<AddedMessage newBlog={ { title,author } }/>}
      <section className={addState?'createContainer':null}>
        <div className='ToggableAddBlogs'>
          <Toggable buttonLabel={'Add Blog'} ref={blogFormRef}>
            <AddForm  author={author} setAuthor={setAuthor} setTitle={setTitle} title={title} handleAddBlogs={handleAddBlogs} setUrl={setUrl} url={url}/>
          </Toggable>
        </div>
      </section>
    </div>
  )
}
export default AddBlogs;