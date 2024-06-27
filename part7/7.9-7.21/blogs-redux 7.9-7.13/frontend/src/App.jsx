import './App.css'
import { useState,useEffect } from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/Headers';
import Notifications from '../components/Notifications';
import Login from '../components/Login';
import LogoutButton from '../components/LogoutButton';
import blogService from './service/blogs';
import Blogs from '../components/Blog';
import AddBlogs from '../components/AddBlogs';

function App() {
  const [user,setUser] = useState(null);
  const [blogs,setBlogs] = useState([]);
  const [errorMessage,setErrorMessage] = useState(null);
  const [loadState,setLoadState] = useState(false);
  const [newBlog,setNewBlog] = useState(true);
  
  const notification = useSelector(state=>state.notification)

  const getBlogs = async () => {
    try{
      const response = await blogService.getBlogs();
      setBlogs(response.data);
    }
    catch(err){
      console.error(err.response.data);
    }
  }

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
      <Login
        user={user}
        setUser={setUser}
        setLoadState={setLoadState}
        loadState={loadState}/>
      {notification&&<Notifications errorMessage={errorMessage}  setErrorMessage={setErrorMessage}/>}
      {user&&(
        <>
          <h3 name='userInfo'>{user.name} logged in</h3>
          <section className='bodyContainer'>
            {blogs.length?blogs.map((b,i) => (
              <Blogs errorMessage={errorMessage} setErrorMessage={setErrorMessage} user={user} blog={b} setNewBlog={setNewBlog} key={i}/>
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
