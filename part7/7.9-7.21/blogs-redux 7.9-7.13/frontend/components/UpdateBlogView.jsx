import { useEffect, useState } from 'react';
import Notification from './Notifications';
import { useDispatch, useSelector } from 'react-redux';
import { updateBlog } from '../redux/blogReducer/blogReducer';
import { clearStatus } from '../redux/statusReducer/statusReducer';

const UpdateBlogView = ({ setNewBlog,blog,setUpdateBlog }) => {
  const dispatch = useDispatch();
  const {notification} = useSelector(state=>state.notification);
  const { updated } = useSelector(state => state.status.states);
  const { id,userId } = blog;
  
  const [updatedBlogs,setUpdateBlogs] = useState({
    title: blog.title,
    author: blog.author,
    url: blog.url,
  })

  const handleEdit = async (e) => {
    e.preventDefault();
    await dispatch(updateBlog({id,updatedBlogs}))
  };

  useEffect(()=>{
    if(updated) {
      setNewBlog(true);
      dispatch(clearStatus());
      setUpdateBlog({ id:'',editState:false });
    }
  },[updated])
  const handleInput = (e) => {
    setUpdateBlogs({...updatedBlogs, [e.target.name] : e.target.value})
  }
  const handleCancel = (e) => {
    e.preventDefault();
    setUpdateBlog({ id:'',editState:false });
  }
  
  return (
    <>
      <article className="flexRow">
        <form onSubmit={handleEdit}>
          <input data-testid='updateTitle' type='text' name='title' onChange={handleInput} value={ updatedBlogs.title }/>
          <span>by </span>
          <input data-testid='updateAuthor' type='text' name='author' onChange={handleInput} value={ updatedBlogs.author }/>
          <h5>
                  User: { userId.name }
          </h5>
          <h5>
                  url: <input data-testid='updateUrl' type='url' name='url' onChange={handleInput} value={ updatedBlogs.url }/>
          </h5>
          {notification&&<Notification />}
          {
            !notification&&(
            <>
              <button data-testid='editBlog' type='submit' >edit</button>
              <button onClick={handleCancel}>cancel</button>
            </>
          )}
        </form>
      </article>
    </>
  )
}
export default UpdateBlogView;