import { Link, useNavigate, useParams } from 'react-router-dom';
import './OneBlog.css';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
const OneBlog = () => {
    const navigate = useNavigate();
    const loggedUserID = useSelector(state => state.user.userId)
    const  { blogs }  = useSelector(state => state.blogs);
    useEffect(()=>{
        if(!loggedUserID)navigate('/');
    },[loggedUserID]);
    const { id } = useParams();
    const blog = blogs.find(blog => blog.id === id);
    return(

        <div className='Oneblog_Container'>
        <section className='oneblog_info'>
          <span>{ blog.title }</span><span>likes: {blog.likes} </span><span>url: <a to='#'>{blog.url}</a></span>
          <span>
              {blog.author}
          </span>
          <span>
          <Link to={`/user/${blog.userId.id}`} >{blog.userId.username}</Link>
          </span>
        </section>
        <section className='comments_container'>
            Comments:
            <p>
        Aca van los comments
            </p>
        </section>
        </div>
    )
 }
export default OneBlog;