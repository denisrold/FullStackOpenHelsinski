import AddBlogs from "../AddBlogs";
import Blogs from "../Blog/Blog";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Home = ({ blogs, user})=>{
    const navigate = useNavigate();
    const loggedUserID = useSelector(state => state.user.userId)
    useEffect(()=>{
        if(!user)navigate('/');
    },[user]);
   return ( 
   user&&(<>
     <span name='userInfo' className='userInfo'>Hello {user.name}!</span>
     <section className='bodyContainer'>
       {blogs&&(blogs.length?blogs.map((b,i) => (
         <Blogs user={user} blog={b} key={i}/>
       ))
        :<h3 data-testid="noBlogs">No Blogs</h3>)}
      </section>
      <AddBlogs />
      </>
   )
  )
}

export default Home;