import Toggable from "./Toggable";
import Likes from './Likes';

const Blogs = ({blog})=>{
  const {title,author,userId,url} = blog;
       return(
        <section  className='blogContainer'>
             <h4>{title}</h4>
             <Likes blog={blog} />
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