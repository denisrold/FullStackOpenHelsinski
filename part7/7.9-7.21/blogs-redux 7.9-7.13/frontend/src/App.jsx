import './App.css'
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../components/Headers';
import Login from '../components/Login';
import LogoutButton from '../components/LogoutButton';
import Blogs from '../components/Blog';
import AddBlogs from '../components/AddBlogs';
import { initializeBlogs } from '../redux/reducers/blogReducer';
import { setUserID } from "../redux/reducers/userReducer";

function App() {
  const dispatch = useDispatch();
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

  useEffect(() => {
      getBlogs(); 
  },[user])

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
              <Blogs user={user} blog={b} key={i}/>
            ))
              :<h3 data-testid="noBlogs">No Blogs</h3>}
          </section>
          <AddBlogs />
          <LogoutButton logoutStates={ { setUser,setLoadState } }/>
        </>
      )
      }
    </>
  )
}

export default App
