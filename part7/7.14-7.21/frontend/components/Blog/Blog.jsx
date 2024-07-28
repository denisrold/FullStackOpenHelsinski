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
            title:<Link>
              <h4 id='testTitle'>
                { title }
             </h4>
            </Link>
            by:<Link to={`/user/${userId.id}`}>
              <h4 id='testAuthor'>
                { author }
              </h4>
            </Link>
          </article>
            <a href='#'> 
           { url }
            </a>
            <h5>
              Creator: { userId.name }
            </h5>
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