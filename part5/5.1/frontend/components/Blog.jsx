import Toggable from "./Toggable";
const Blogs = ({blog})=>{
    const {title,author,likes,userId,url} = blog
    return(
        <section  className='blogContainer'>
             <h4>{title}</h4>
             <Toggable buttonLabel={"show"} buttonlabelCancel={"hide"}>
                <h5>
                Author: {author}
                </h5>
                <article className='likeContainer'>
                  <span>
                  Likes: <span style={{fontWeight:'bolder'}}>{likes}</span>
                  </span>
                  <button>like</button>
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