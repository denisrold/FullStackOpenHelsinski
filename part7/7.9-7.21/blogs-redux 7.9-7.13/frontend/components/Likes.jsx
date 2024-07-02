import blogService from '../src/service/blogs';
import userService from "../src/service/user";
import { useDispatch,useSelector } from 'react-redux';
import { useEffect,useState } from "react";
import { updateLike } from '../redux/reducers/blogReducer';
import sessionService from '../src/service/sessionStorage';

const Likes =({ blog }) => {
  const dispatch = useDispatch();
  const { id } = blog;
  const likesRedux = useSelector(state=>state.blogs.blogs.filter(b=>b.id===blog.id)[0].likes)
  const [unlikes,setUnlike] = useState(false);

  const getUserLike = async () => {
    try{
      //gettoken with userdata
      const token = await sessionService.getUserToken()
      //get this blog by id
      const res = await blogService.getBlogsByID(id);
      //get UserId
      userService.setToken(token);
      const userId = await userService.userId();
      const arrayUser = res.likesUserId.find(u => u === userId);
      if(!arrayUser) setUnlike(false)
      else setUnlike(true);
    }
    catch(err){
      console.error(err);
    }
  }

  useEffect(() => {
    getUserLike();
  },[]);

  //Likes or Unlikes.
  const handleLikes = async() => {
    setUnlike(!unlikes);
    dispatch(updateLike({unlikes:unlikes,blog:blog}))
  }
  
  return(
    <section className='likeContainer'>
      <span>
          Likes:
        <span data-testid='likecount' className={ 'Liked' }style={{ fontWeight:'bolder' }}> { likesRedux }</span>
      </span>
      <button data-testid='likeButton' onClick={handleLikes}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`heart ${unlikes?"heartLike":''}`}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
        </svg>
      </button>
    </section>
  )
}

export default Likes;