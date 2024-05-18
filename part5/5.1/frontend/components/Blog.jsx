import Toggable from "./Toggable";
import blogService from '../src/service/blogs';
import userService from "../src/service/user";
import { useEffect,useState } from "react";

const Blogs = ({blog})=>{
  const {title,author,likes,userId,url,id} = blog;
  const [like ,setLike] = useState(0);
  const [unlikes,setUnlike] =useState(false);
 
  const getUserLike = async ()=>{
    const userToken = window.localStorage.getItem('userLogged');
    const JSONPARSE = await JSON.parse(userToken);
    const res = await blogService.getBlogsByID(id);
    userService.setToken(JSONPARSE.token);
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
      const userToken = window.localStorage.getItem('userLogged');
      const JSONPARSE = await JSON.parse(userToken);
      blogService.setToken(JSONPARSE.token);
      //like or unlike user.
      setUnlike(!unlikes);
      const service = await blogService.updateLikes(blog,unlikes);
      setLike(service.likes);
    }catch(err){console.error(err)}

    }
     return(
        <section  className='blogContainer'>
             <h4>{title}</h4>
             <Toggable buttonLabel={"show"} buttonlabelCancel={"hide"}>
                <h5>
                Author: {author}
                </h5>
                <article className='likeContainer'>
                  <span>
                  Likes: <span className={`${unlikes&&'Liked'}`}style={{fontWeight:'bolder'}}>{like}</span>
                  </span>
                  <button onClick={handleLikes}>like</button>
                </article>
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