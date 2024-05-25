import Toggable from "./Toggable";
import Likes from './Likes';
import DeleteBlog from "./DeleteBlog";

const Blogs = ({ blog,setNewBlog }) => {
  const { title,author,userId,url } = blog;
  return(
    <section  className='blogContainer'>
      <h4>{ title }</h4>
      <Toggable buttonLabel={ "show" } buttonlabelCancel={ "hide" }>
        <article className="flexRow">
          <h5>Author: { author }</h5>
          <h5>User: { userId.name }</h5>
        </article>
        <Likes blog={ blog } />
        <h5>
          url: { url }
        </h5>
      <DeleteBlog setNewBlog={ setNewBlog } blog={ blog }/>
      </Toggable>
    </section>
  )
}
export default Blogs;