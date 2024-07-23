import './Home.css';
import AddBlogs from "../AddBlogs";
import Blogs from "../Blog/Blog";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Home = ({ user })=>{
    const navigate = useNavigate();
    useEffect(()=>{
        if(!user)navigate('/');
    },[user]);
    const  { blogs }  = useSelector(state => state.blogs);
   return ( user&&(
      <>
       <div name='userInfo' className='userInfo'>Hello {user.name}!</div>
       <section className='bodyContainer'>
         {blogs&&(blogs.length?blogs.map((b,i) => (
           <Blogs user={user} blog={b} key={i}/>
         ))
          :<h3 data-testid="noBlogs">No Blogs</h3>)}
        </section>
        <AddBlogs />
      </>
     )
    )}

export default Home;