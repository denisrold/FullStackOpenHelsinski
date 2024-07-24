import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Myblogs.css';
import Blogs from '../Blog/Blog';
import AddBlogs from '../AddBlogs';
import Likes from '../Likes';


const Myblogs = ({ user })=>{
    const navigate = useNavigate();
    const loggedUserID = useSelector(state => state.user.userId)
    useEffect(()=>{
        if(!loggedUserID)navigate('/');
    },[loggedUserID]);
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
        <h3 className='myBlogsTitle'>
            You've created {myBlogs.length} blogs.
        </h3>
        <section className="bodyContainer myblogs">
            
         {myBlogs&&(myBlogs.length?myBlogs.map((b,i) => (
          <>
            <Blogs user={user} blog={b} key={i}>
              <span>likes: {b.likes}</span>
            </Blogs>
          </>
         ))
          :<h3 data-testid="noBlogs">You don't have any blogs yet</h3>)}
        </section>
        <AddBlogs />
      </>
      )
    )
}
export default Myblogs;