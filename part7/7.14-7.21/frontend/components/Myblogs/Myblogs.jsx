import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Myblogs.css';
import Blogs from '../Blog/Blog';


const Myblogs = ({ user })=>{
    const navigate = useNavigate();
    const loggedUserID = useSelector(state => state.user.userId)
    useEffect(()=>{
        if(!loggedUserID)navigate('/');
    },[loggedUserID]);
    const  { blogs }  = useSelector(state => state.blogs);
    const [myBlogs,setMyBlogs] = useState([]);
    console.log('este blogs',blogs);
    const filterCreatedBlogs = ()=>{
        if(blogs){
            console.log('blogues3',blogs)
            const myBlogues = blogs.filter(b => b.userId.id === loggedUserID)
            console.log('myBlogues',myBlogues);
            setMyBlogs(myBlogues);
        }
    } 

    useEffect(()=>{
        console.log('blogues2',blogs)
        filterCreatedBlogs()
    },[blogs])

    return(loggedUserID&&(
      <>
        <h3 className='myBlogsTitle'>
            You've created {myBlogs.length} blogs.
        </h3>
        <section className="bodyContainer myblogs">
            
         {myBlogs.length&&(myBlogs.length?myBlogs.map((b,i) => (
           <Blogs user={user} blog={b} key={i}/>
         ))
          :<h3 data-testid="noBlogs">You don't have any blogs yet</h3>)}
        </section>
      </>
      )
    )
}
export default Myblogs;