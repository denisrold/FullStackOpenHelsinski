import Toggable from "./Toggable";
import blogService from '../src/service/blogs';
import userService from "../src/service/user";
import { useEffect,useState } from "react";

const Blogs = ({blog})=>{
  const {title,author,likes,userId,url,id} = blog;
  const [like ,setLike] = useState(0);
  const [unlikes,setUnlike] =useState(false);
 
  const getUserLike = async ()=>{
    const getUserToken = window.localStorage.getItem('userLogged');
    const {token} = await JSON.parse(getUserToken);
    const res = await blogService.getBlogsByID(id);
    userService.setToken(token);
    const userId =await userService.userId();
    const arrayUser = res.likesUserId.find(u=>u == userId);
    if(!arrayUser)setUnlike(false)
    else setUnlike(true);
    setLike(res.likes);
  }
    useEffect(()=>{
      getUserLike();
    },[]);

    //Likes or Unlikes.
    const handleLikes= async()=>{
    try{
      //USER AND LIKES INFO.
      const getUserToken = window.localStorage.getItem('userLogged');
      const {token} = await JSON.parse(getUserToken);
      blogService.setToken(token);
      //like or unlike user.
      setUnlike(!unlikes);
      const service = await blogService.updateLikes(blog,unlikes);
      setLike(service.likes);
    }catch(err){console.error(err)}

    }
     return(
        <section  className='blogContainer'>
             <h4>{title}</h4>
                <article className='likeContainer'>
                    <span>
                    Likes:
                    <span className={'Liked'}style={{fontWeight:'bolder'}}> {like}</span>
                  </span>
                  <button onClick={handleLikes}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className={`heart ${unlikes?"heartLike":''}`}>
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                  </svg>
                  </button>
                </article>
             <Toggable buttonLabel={"show"} buttonlabelCancel={"hide"}>
                <h5>
                Author: {author}
                </h5>
                <h5>
                  User: {userId.name}
                </h5>
                <h5>
                  url: {url}
                </h5>
             </Toggable>
          </section>
    )
}

export default Blogs;