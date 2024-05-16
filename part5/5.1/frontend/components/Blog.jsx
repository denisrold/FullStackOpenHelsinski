import Toggable from "./Toggable";
import blogService from '../src/service/blogs';
import { useEffect,useState } from "react";

const Blogs = ({blog})=>{
  const [like ,setLike] = useState();
    useEffect(()=>{
      setLike(blog.likes);
    },[setLike])
    const {title,author,likes,userId,url} = blog;
    const handleLikes= async()=>{
    try{
      await blogService.updateLikes(blog);
      const response = await blogService.getBlogsByID(blog.id);
      setLike(response.likes);
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
                  Likes: <span style={{fontWeight:'bolder'}}>{like}</span>
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