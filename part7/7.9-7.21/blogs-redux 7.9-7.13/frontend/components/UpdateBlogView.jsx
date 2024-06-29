import { useEffect, useState } from 'react';
import Notification from './Notifications';
import { useDispatch, useSelector } from 'react-redux';
import { updateBlog } from '../redux/blogReducer/blogReducer';
import { clearStatus } from '../redux/statusReducer/statusReducer';

const UpdateBlogView = ({ setNewBlog,blog,setUpdateBlog }) => {
  const dispatch = useDispatch();
  const {notification} = useSelector(state=>state.notification);
  const { updated } = useSelector(state => state.status.states);
  const { title,author,url,userId,id } = blog;
  const [updateTitle,setUpdateTitle] = useState(title)
  const [updateAuthor,setUpdateAuthor] = useState(author)
  const [updateUrl,setUpdateUrl] = useState(url);

  const handleEdit = async (e) => {
    e.preventDefault();
    const updatedBlog = {
      title:updateTitle,
      author:updateAuthor,
      url:updateUrl
    }
    await dispatch(updateBlog({id,updatedBlog}))
  };

  useEffect(()=>{
    if(updated) {
      setNewBlog(true);
      dispatch(clearStatus());
      setUpdateBlog({ id:'',editState:false });
    }
  },[updated])

  const handleCancel = (e) => {
    e.preventDefault();
    setUpdateBlog({ id:'',editState:false });
  }
  
  return (
    <>
      <article className="flexRow">
        <form>
          <input data-testid='updateTitle' onChange={(e) => setUpdateTitle(e.target.value)} value={ updateTitle }/>
          <span>by </span>
          <input data-testid='updateAuthor' onChange={(e) => setUpdateAuthor(e.target.value)} value={ updateAuthor }/>
          <h5>
                  User: { userId.name }
          </h5>
          <h5>
                  url: <input data-testid='updateUrl' onChange={(e) => setUpdateUrl(e.target.value)} value={ updateUrl }/>
          </h5>
          {notification&&<Notification />}
          {!notification&&(<>
            <button data-testid='editBlog' type='submit' onClick={handleEdit}>edit</button>
            <button onClick={handleCancel}>cancel</button>
          </>)}
        </form>
      </article>
    </>
  )
}
export default UpdateBlogView;