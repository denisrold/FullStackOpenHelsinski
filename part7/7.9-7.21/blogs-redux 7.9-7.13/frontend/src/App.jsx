import './App.css'
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../components/Headers';
import Login from '../components/Login';
import LogoutButton from '../components/LogoutButton';
import blogService from './service/blogs';
import Blogs from '../components/Blog';
import AddBlogs from '../components/AddBlogs';
import { setBloges } from '../redux/blogReducer/blogReducer';

function App() {
  const dispatch = useDispatch();
  const bloges = useSelector(state => state.blogs);
  const [user,setUser] = useState(null);
  const [blogs,setBlogs] = useState([]);
  const [loadState,setLoadState] = useState(false);
  const [newBlog,setNewBlog] = useState(true);


  const getBlogs = async () => {
    try{
      const response = await blogService.getBlogs();
      dispatch(setBloges(response.data))
      console.log('estos bloges',bloges)
      setBlogs(bloges);
    }
    catch(err){
      console.error(err.response.data);
    }
  }
  //redux
  // const getBlogs = async () => {
  //   try{
  //     const response = await blogService.getBlogs();
  //    setBlogs(response.data);
  //   }
  //   catch(err){
  //     console.error(err.response.data);
  //   }
  // }
  
  useEffect(() => {getBlogs();},[])
  useEffect(() => {
    if(newBlog){
      if(user){
        getBlogs();
        setNewBlog(false);
      }
    }
  },[newBlog,user])

  return (
    <>
      <Header/>
      {!user&&<Login
        user={user}
        setUser={setUser}
        setLoadState={setLoadState}
        loadState={loadState}/>
      }
      {user&&(
        <>
          <h3 name='userInfo'>{user.name} logged in</h3>
          <section className='bodyContainer'>
            {blogs.length?blogs.map((b,i) => (
              <Blogs user={user} blog={b} setNewBlog={setNewBlog} key={i}/>
            ))
              :<h3 data-testid="noBlogs">No Blogs</h3>}
          </section>
          <AddBlogs setNewBlog={setNewBlog}/>
          <LogoutButton logoutStates={ { setUser,setLoadState } }/>
        </>
      )
      }
    </>
  )
}

export default App
