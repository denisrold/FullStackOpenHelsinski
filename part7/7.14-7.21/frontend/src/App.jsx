import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../components/Headers';
import Login from '../components/Login';
import { initializeBlogs } from '../redux/reducers/blogReducer';
import { setUserID } from "../redux/reducers/userReducer";
import Landing from '../components/Landing';
import { useNavigate } from 'react-router-dom';
import sessionStorage from './service/sessionStorage';
import userService from '../src/service/user';
import Navbar from '../components/Navbar/Navbar';
import Myblogs from '../components/Myblogs/Myblogs';
import Users from '../components/Users/Users';
import Info from '../components/Info/Info';
import Home from '../components/Home/Home';
import OneUser from '../components/OneUser/OneUser';
import OneBlog from '../components/OneBlog/OneBlog';
import Footer from '../components/Footer/Footer';


function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    {user&&window.location.pathname !=='/'&&<Navbar user={user} setUser={setUser} setLoadState={setLoadState} />}
    <Routes>
      <Route path='/' element={<Landing/>}/>
      <Route path='/login' element={
        <>
 
          <Login
            user={user}
            setUser={setUser}
            setLoadState={setLoadState}
            loadState={loadState}/>
        </>
      }/>
      <Route path='/home' element={ user?<Home user={user}/>: <Navigate replace to='/login'/>  }/>
      <Route path='/myblogs' element={ loggedUserID?<Myblogs user={user}/>: <Navigate replace to='/login'/> }/>
      <Route path='/user/:id' element={ loggedUserID?<OneUser/>: <Navigate replace to='/login'/>  }/>
      <Route path='/users' element={ loggedUserID?<Users/>: <Navigate replace to='/login'/>  }/>
      <Route path='/blog/:id' element={ loggedUserID?<OneBlog />: <Navigate replace to='/login'/>  }/>
      <Route path='/info' element={ loggedUserID?<Info/>: <Navigate replace to='/login'/>  }/>
    </Routes>
   
    </>
  )
}

export default App
