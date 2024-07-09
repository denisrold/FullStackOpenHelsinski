import { useEffect, useState } from 'react';
import Notification from './Notifications';
import { useNotificationDispatch , useNotificationValue } from '../context/notificationContext';
import { useStatusDispatch,useStatusValue } from '../context/statusContext';
import { useBlogsDispatch } from '../context/blogsContext';
import sessionService from '../src/service/sessionStorage';
import blogService from '../src/service/blogs';

const UpdateBlogView = ({ blog,setUpdateBlog }) => {
  const notificationDispatch = useNotificationDispatch();
  const statusDistpach = useStatusDispatch();
  const notification = useNotificationValue();
  const blogDispatch = useBlogsDispatch();
  const { updated } = useStatusValue();
  const { id,userId } = blog;
  
  const [updatedBlogs,setUpdateBlogs] = useState({
    title: blog.title,
    author: blog.author,
    url: blog.url,
  })

  const handleEdit = async (e) => {
    e.preventDefault();
    const token = await sessionService.getUserToken();
    blogService.setToken(token);
    try {
      const response = await blogService.updateBlogs(id, updatedBlogs);
      await statusDistpach({ type:'ADD_UPDATED', payload:true });
      await blogDispatch({ type:"UPDATE_BLOG", payload:{ id, response } });
    } catch (err) {
      if (err.response) {
        if (err.response.data.error.includes("Validation failed")) {
          let errorMessage = err.response.data.error
            .split(".")[0]
            .split(":")[2]
            .replace("Path", "")
            .split("`")
            .join("")
            .replace(/\(([^)]+)\)/g, '"$1"');
            notificationDispatch({type:'ADD',payload:errorMessage});
        } else {
          console.log(err.response.data);
        }
      }
    }
  };

  useEffect(()=>{
    if(updated) {
      statusDistpach({type:'CLEAR',payload:''})
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