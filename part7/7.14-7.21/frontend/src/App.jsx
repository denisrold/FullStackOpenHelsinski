import './App.css'
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../components/Headers';
import Login from '../components/Login';
import LogoutButton from '../components/LogoutButton';
import Blogs from '../components/Blog';
import AddBlogs from '../components/AddBlogs';
import { initializeBlogs } from '../redux/reducers/blogReducer';
import { setUserID } from "../redux/reducers/userReducer";
import Landing from '../components/Landing';
import { useNavigate } from 'react-router-dom';
import sessionStorage from './service/sessionStorage';
import userService from '../src/service/user';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const  { blogs }  = useSelector(state => state.blogs);
  const loggedUserID = useSelector(state => state.user.userId)
  const [user,setUser] = useState(null);
  const [loadState,setLoadState] = useState(false);

  const getBlogs = async () => {
    dispatch(initializeBlogs());
    if(user){
      if(!loggedUserID) dispatch(setUserID());
    }
  }
  
  const getUser = async () => {
    const token = await sessionStorage.getUserToken();
    if(token){
      userService.setToken(token);
      const user = await userService.getUser()
      setUser({name:user.name,token:token,username:user.username});
    }
    else navigate('/')
  }

  useEffect(() => {
    if(!user){   
      getUser()
    }
      getBlogs(); 
  },[user])
 
  return (
    <>
    <Routes>
      <Route path='/' element={<Landing/>}/>
      <Route path='/login' element={
        <>
          <Header/>
          {
          !user&&<Login
            user={user}
            setUser={setUser}
            setLoadState={setLoadState}
            loadState={loadState}/>
          }
        </>
      }/>
      <Route path='/home' element={(<>
        {user&&(
          <>
            <h3 name='userInfo'>{user.name} logged in</h3>
            <section className='bodyContainer'>
              {blogs&&(blogs.length?blogs.map((b,i) => (
                <Blogs user={user} blog={b} key={i}/>
              ))
                :<h3 data-testid="noBlogs">No Blogs</h3>)}
            </section>
            <AddBlogs />
            <LogoutButton logoutStates={ { setUser,setLoadState } }/>
          </>
        )
      }
        </>)}>
      </Route>
    </Routes>
    </>
  )
}

export default App
