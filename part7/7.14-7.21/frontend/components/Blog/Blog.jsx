import { useState } from "react";
import Toggable from "../Toggable";
// import Likes from '../Likes';
import DeleteBlog from "../DeleteBlog";
import EditBlog from "../EditBlog";
import UpdateBlogView from "../UpdateBlogView";
import { useSelector } from "react-redux";
import './Blog.css';
import { Link } from "react-router-dom";

const Blogs = ({ user, blog, children }) => {
  const loggedUserID = useSelector(state => state.user.userId)
  const [updateBlog,setUpdateBlog] = useState({ id:'',editState:false });
  const { title,author,userId,url } = blog;

  return(
    <section data-testid="blogContainer" className='blogContainer'>
      {updateBlog.id === blog.id && updateBlog.editState?(
        (<>
          <UpdateBlogView blog={blog} setUpdateBlog={setUpdateBlog}/>
        </>)
      ):
        (<>
          <article className="flexRow">
            <Link to={`/blog/${blog.id}`}>
              <h4 className="capitalizeText" id='testTitle'>
                { title }
             </h4>
            </Link>
            by:
              <h4 className="capitalizeText" id='testAuthor'>
                { author }
              </h4>
          </article>
            <a href='#'> 
           { url }
            </a>
         
            <h5 className="capitalizeText">
              Creator: { userId.name }
            </h5>
   
            <h5 className="comments">Comments: {blog.comments.length?blog.comments.length:0}</h5>
            {!!user.token && ( <div className="userOptions">
             {children}
              {loggedUserID === userId.id&& (
                <section className="blogButtons">
                  <EditBlog setUpdateBlog={setUpdateBlog} blog={blog}/>
                  <DeleteBlog blog={ blog }/>
                </section>)}
            </div>
            )}
        </>)
      }
    </section>
  )
}
export default Blogs;