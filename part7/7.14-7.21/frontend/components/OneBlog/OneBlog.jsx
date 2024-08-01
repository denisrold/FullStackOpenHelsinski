import { Link, useParams } from 'react-router-dom';
import './OneBlog.css';
import { useSelector } from 'react-redux';
import Comments from './Comments';

const OneBlog = () => {
    const  { blogs }  = useSelector(state => state.blogs);
    const { id } = useParams();
    const blog = blogs.find(blog => blog.id === id);
    return(
        <div className='Oneblog_Container '>
        <section className='oneblog_info'>
          <span className='capitalizeText'>{ blog.title }</span><span>likes: {blog.likes} </span><span>url: <a to='#'>{blog.url}</a></span>
          <span className='capitalizeText'>
              {blog.author}
          </span>
          <span className='capitalizeText'>
          User:
          <Link to={`/user/${blog.userId.id}`} > {blog.userId.username}</Link>
          </span>
        </section>
        <Comments blog={blog}/>
        </div>
    )
 }
export default OneBlog;