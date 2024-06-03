import Toggable from "./Toggable";
import Likes from './Likes';
import DeleteBlog from "./DeleteBlog";
import EditBlog from "./EditBlog";
import { useEffect, useState } from "react";
import UpdateBlogView from "./UpdateBlogView";
import userService from '../src/service/user';

const Blogs = ({user, blog,setNewBlog }) => {
  const [updateBlog,setUpdateBlog] = useState({id:'',editState:false});
  const [userLoggedId,setUserLoggedId] = useState('');
  const { title,author,userId,url } = blog;
  
  const getLoggedUserId = async () => {
    const getUserToken = window.localStorage.getItem('userLogged');
    const { token } = await JSON.parse(getUserToken);
    userService.setToken(token);
    const ID = await userService.userId(); 
    setUserLoggedId(ID);
  }

  useEffect(()=>{
    getLoggedUserId()
  },[])

  return(
    <section  className='blogContainer'>
        {updateBlog.id==blog.id && updateBlog.editState?(
          (<>
            <UpdateBlogView setNewBlog={setNewBlog} blog={blog} setUpdateBlog={setUpdateBlog}/>
          </>)
        ):
        (<>
        <article className="flexRow">
          <h4>
            { title }
          </h4>
          <h4 id='testAuthor'>
            by: { author }
          </h4>
        </article>
        <Toggable buttonLabel={ "show" } buttonlabelCancel={ "hide" }>
          <h5>
            User: { userId.name }
          </h5>
          <h5>
            url: { url }
          </h5>
         {!!user.token && ( <>
          <Likes blog={ blog } />
         {userLoggedId == userId.id&& ( 
            <section className="blogButtons">
              <EditBlog setUpdateBlog={setUpdateBlog} blog={blog}/>
              <DeleteBlog setNewBlog={ setNewBlog } blog={ blog }/>
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