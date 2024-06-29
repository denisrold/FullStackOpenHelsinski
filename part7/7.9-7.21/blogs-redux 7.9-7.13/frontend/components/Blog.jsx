import { useState } from "react";
import Toggable from "./Toggable";
import Likes from './Likes';
import DeleteBlog from "./DeleteBlog";
import EditBlog from "./EditBlog";
import UpdateBlogView from "./UpdateBlogView";
import { useSelector } from "react-redux";

const Blogs = ({ user, blog,setNewBlog }) => {
  const loggedUserID = useSelector(state => state.user.userId)
  const [updateBlog,setUpdateBlog] = useState({ id:'',editState:false });
  const { title,author,userId,url } = blog;

  return(
    <section data-testid="blogContainer" className='blogContainer'>
      {updateBlog.id === blog.id && updateBlog.editState?(
        (<>
          <UpdateBlogView setNewBlog={setNewBlog} blog={blog} setUpdateBlog={setUpdateBlog}/>
        </>)
      ):
        (<>
          <article className="flexRow">
            <h4 id='testTitle'>
              { title }
            </h4>
            <h4 id='testAuthor'>
            by: { author }
            </h4>
          </article>
          <Toggable buttonLabel={ "show" } buttonlabelCancel={ "hide" } >
            <h5>
            User: { userId.name }
            </h5>
            <h5>
            url: { url }
            </h5>
            {!!user.token && ( <>
              <Likes blog={ blog } />
              {loggedUserID === userId.id&& (
                <section className="blogButtons">
                  <EditBlog setUpdateBlog={setUpdateBlog} blog={blog}/>
                  <DeleteBlog blog={ blog }/>
                </section>)}
            </>
            )}
          </Toggable>
        </>)
      }
    </section>
  )
}
export default Blogs;