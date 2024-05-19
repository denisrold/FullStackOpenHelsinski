import './App.css'
import { useState,useEffect } from 'react';
import Header from '../components/Headers';
import Notifications from '../components/Notifications';
import Login from '../components/Login';
import LogoutButton from '../components/LogoutButton';
import blogService from './service/blogs';
import Blogs from '../components/Blog';
import AddBlogs from '../components/AddBlogs';
import Toggable from '../components/Toggable';

function App() {
  const [user,setUser] = useState(null);
  const [blogs,setBlogs] = useState([]);
  const [errorMessage,setErrorMessage] = useState(null);
  const [loadState,setLoadState] = useState(false);
  const [newBlog,setNewBlog] = useState(false);

  const getBlogs= async ()=>{
    try{
    const response = await blogService.getBlogs();
    setBlogs(response.data);
  }    
    catch(err){
      console.error(err.response.data);
    }
  }

  useEffect( ()=>{    
      getBlogs();
      setNewBlog(false);
  },[newBlog==true?newBlog:null])

  return (
    <>
    <Header/>
    <Login loginStates={{user,setUser,setErrorMessage,setLoadState,loadState}}/>
      {errorMessage&&<Notifications errorMessage={errorMessage}  setErrorMessage={setErrorMessage}/>}
      {user&&(
        <>
      
        <section className='bodyContainer'> 
        {blogs.length?blogs.map((b,i)=>(
          <Blogs blog={b} setNewBlog={setNewBlog} key={i}/>
        ))
        :<h3>No Blogs</h3>}
        </section>
        <AddBlogs setNewBlog={setNewBlog}/>
        <LogoutButton logoutStates={{setUser,setLoadState}}/>
        </>
        )
      }
      </>
  )
}

export default App
