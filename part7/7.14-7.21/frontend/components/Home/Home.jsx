import './Home.css';
import Blogs from "../Blog/Blog";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Likes from '../Likes';
import DisplayBlogs from '../Blog/DisplayBlogs';

const Home = ({ user })=>{
    const navigate = useNavigate();
    useEffect(()=>{
        if(!user)navigate('/');
    },[user]);
    const  { blogs }  = useSelector(state => state.blogs);
    
   return ( user&&(
      <>
       <div name='userInfo' className='userInfo'>Hello {user.name}!</div>
       {blogs&&<DisplayBlogs blogs={blogs}/>}
       <section className='bodyContainer'>
         {blogs&&(blogs.length?blogs.map((b,i) => (
            <Blogs user={user} blog={b} key={i}>
            <Likes blog={b} key={i}/>
            </Blogs>
         
         ))
          :<h3 data-testid="noBlogs">No Blogs</h3>)}
        </section>
    
      </>
     )
    )}

export default Home;