import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Myblogs.css';
import Blogs from '../Blog/Blog';
import AddBlogs from '../AddBlogs/AddBlogs';


const Myblogs = ({ user })=>{
    const loggedUserID = useSelector(state => state.user.userId)
    const  { blogs }  = useSelector(state => state.blogs);
    const [myBlogs,setMyBlogs] = useState([]);
    const filterCreatedBlogs = ()=>{
        if(blogs){
            const myBlogues = blogs.filter(b => b.userId.id === loggedUserID)
            setMyBlogs(myBlogues);
        }
    } 

    useEffect(()=>{
        filterCreatedBlogs()
    },[blogs])

    return(user&&(
      <>
        <section className='myBlogsTitle'>
          <h3 >
            You've created {myBlogs.length} blogs.
          </h3>
          <h4>
            <a href='#createBlog'>
              Create a new Blog?
            </a>
          </h4>
        </section>
        <section className="bodyContainer myblogs">
         {myBlogs&&(myBlogs.length?myBlogs.map((b,i) => (
          <section key={i} className='myBlogsViews'>
            <Blogs user={user} blog={b} key={i}>
              <div >likes: {b.likes}</div>
            </Blogs>
          </section>
         ))
          :<h3 data-testid="noBlogs">You don't have any blogs yet</h3>)}
        </section>
        <AddBlogs/>
      </>
      )
    )
}
export default Myblogs;