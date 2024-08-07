import { useEffect, useState } from 'react';
import Notification from './Notifications';
import { useDispatch, useSelector } from 'react-redux';
import { updateBlog } from '../redux/reducers/blogReducer';
import { clearStatus } from '../redux/reducers/statusReducer';

const UpdateBlogView = ({ blog,setUpdateBlog }) => {
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
          <input maxLength={25} data-testid='updateTitle' type='text' name='title' onChange={handleInput} value={ updatedBlogs.title }/>
          <span>by </span>
          <input maxLength={16} data-testid='updateAuthor' type='text' name='author' onChange={handleInput} value={ updatedBlogs.author }/>
          <h5>
                  User: { userId.name }
          </h5>
          <h5>
                  url: <input max={20} data-testid='updateUrl' type='url' name='url' onChange={handleInput} value={ updatedBlogs.url }/>
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