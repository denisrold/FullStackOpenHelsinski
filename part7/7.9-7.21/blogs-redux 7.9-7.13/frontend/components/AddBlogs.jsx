import { useState,useRef, useEffect } from 'react';
import AddedMessage from './AddedMessage';
import Toggable from './Toggable';
import AddForm from './AddForm';
import { useDispatch,useSelector } from 'react-redux';
import { createBlog } from '../redux/blogReducer/blogReducer';
import { clearStatus } from '../redux/statusReducer/statusReducer';

const AddBlogs = () => {
  const dispatch = useDispatch();
  const statusCreate = useSelector(state=>state.status.states.updated)
  const [newBlog,setNewBlog] = useState({})
  const [title,setTitle] = useState("");
  const [url,setUrl] = useState("");
  const [author,setAuthor] = useState("");
  const blogFormRef = useRef();

  const handleAddBlogs = (event) => {
    event.preventDefault();
    const newBlog = { url,title,author };
     dispatch(createBlog(newBlog))
  }

 useEffect(()=>{
  if(statusCreate){
    blogFormRef.current.toggleVisibility();
   const timedOut = setTimeout(() => {
    setAddedState(false);
    setTitle('');
    setUrl('');
    setAuthor('');
    dispatch(clearStatus())
  },2000)
  return ()=> clearTimeout(timedOut);
  }
 
 },[statusCreate])

  return(
    <div className='containerAbsolute'>
      {statusCreate && <AddedMessage newBlog={ { title,author } }/>}
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