import { useState,useRef, useEffect } from 'react';
import AddedMessage from '../AddedMessage';
import Toggable from '../Toggable';
import AddForm from '../AddForm';
import { useDispatch,useSelector } from 'react-redux';
import { clearStatus } from '../../redux/reducers/statusReducer';
import './AddBlogs.css';
const AddBlogs = () => {
  const dispatch = useDispatch();
  const statusCreate = useSelector(state=>state.status.states.created)
  const [newBlog, setNewBlog] = useState({title:'',author:'',url:''})
  const blogFormRef = useRef();
  
   useEffect(()=>{
    if(statusCreate){
      blogFormRef.current.toggleVisibility();
     const timedOut = setTimeout(() => {
      setNewBlog({title:'',author:'',url:''})
      dispatch(clearStatus())
    },2000)
    return ()=> clearTimeout(timedOut);
    }
   },[statusCreate])


  return(
    <div id='newBlogButton'  className='addformContainer'>
      {statusCreate && <AddedMessage newBlog={ newBlog }/>}
      <section >
        <div className='ToggableAddBlogs'>
          <Toggable buttonLabel={'Create Blog'} ref={blogFormRef}>
            <AddForm newBlog={newBlog} setNewBlog={setNewBlog}/>
          </Toggable>
          <div id='idspaceform' className='whiteSpace'></div>
        </div>
      </section>
    </div>
  )
}
export default AddBlogs;