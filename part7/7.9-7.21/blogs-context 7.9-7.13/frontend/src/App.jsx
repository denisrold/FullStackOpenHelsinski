import './App.css'
import { useState, useEffect } from 'react';
import Header from '../components/Headers';
import Login from '../components/Login';
import LogoutButton from '../components/LogoutButton';
import Blogs from '../components/Blog';
import AddBlogs from '../components/AddBlogs';
import userService from './service/user';
import { useQuery } from '@tanstack/react-query'
import { useBlogsDispatch,useBlogsValue } from '../context/blogsContext';
import { useUserDispatch,useUserValue } from '../context/userContext';
import axios from 'axios';

function App() {
  const blogsDispatch = useBlogsDispatch();
  const userDispatch = useUserDispatch();
  const loggedUserContext = useUserValue()
  const blogs = useBlogsValue()
  const [user,setUser] = useState(null);
  const [loadState,setLoadState] = useState(false);
  // const result = useQuery({
  //   queryKey: ['blogs'],
  //   queryFn: () => axios.get('http://localhost:3003/api/blogs').then(res =>res.data )
  // })

  const getBlogs = async () => {
    if(user){
      const result = await axios.get('http://localhost:3003/api/blogs');
      blogsDispatch({type:'ADD_BLOGS',payload:result.data});
        if(!loggedUserContext)  try {
          const getUserToken = window.localStorage.getItem("userLogged");
          let token = "";
          if (getUserToken) token = await JSON.parse(getUserToken).token;
          userService.setToken(token);
          const ID = await userService.userId();
          await userDispatch({type:'ADD_USER_ID',payload:ID});
        } catch (err) {
          console.log(err);
        };
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
