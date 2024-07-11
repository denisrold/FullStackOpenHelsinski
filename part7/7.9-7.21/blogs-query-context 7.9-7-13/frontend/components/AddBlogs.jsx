import { useState,useRef, useEffect } from 'react';
import { useStatusDispatch,useStatusValue } from '../context/statusContext';
import AddedMessage from './AddedMessage';
import Toggable from './Toggable';
import AddForm from './AddForm';

const AddBlogs = ({setRefreshBlog}) => {
  const statusDispatch = useStatusDispatch()
  const { created } = useStatusValue()
  const [newBlog, setNewBlog] = useState({title:'',author:'',url:''})
  const blogFormRef = useRef();
  
   useEffect(()=>{
    if(created){
      blogFormRef.current.toggleVisibility();
     const timedOut = setTimeout(() => {
      setNewBlog({title:'',author:'',url:''})
      statusDispatch({type:'CLEAR',payload:''})
    },2000)
    return ()=> clearTimeout(timedOut);
    }
   },[created])

  return(
    <div className='containerAbsolute'>
      {created && <AddedMessage newBlog={ newBlog }/>}
      <section >
        <div className='ToggableAddBlogs'>
          <Toggable buttonLabel={'Add Blog'} ref={blogFormRef}>
            <AddForm newBlog={newBlog} setNewBlog={setNewBlog}/>
          </Toggable>
        </div>
      </section>
    </div>
  )
}
export default AddBlogs;