import { Link, useParams } from 'react-router-dom';
import './OneBlog.css';
import { useSelector } from 'react-redux';
import Comments from './Comments';

const OneBlog = () => {
    const  { blogs }  = useSelector(state => state.blogs);
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
        <Comments/>
        </div>
    )
 }
export default OneBlog;