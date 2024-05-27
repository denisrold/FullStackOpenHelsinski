import Toggable from "./Toggable";
import Likes from './Likes';
import DeleteBlog from "./DeleteBlog";

const Blogs = ({user, blog,setNewBlog }) => {
  const { title,author,userId,url } = blog;

  return(
    <section  className='blogContainer'>
        <article className="flexRow">
          <h4>
            { title }
          </h4>
          <h4 id='testAuthor'>
            by: { author }
          </h4>
        </article>
      <Toggable buttonLabel={ "show" } buttonlabelCancel={ "hide" }>
        <h5>
          User: { userId.name }
        </h5>
        <h5>
          url: { url }
        </h5>
       {!!user.token && ( <>
        <Likes blog={ blog } />
        <DeleteBlog setNewBlog={ setNewBlog } blog={ blog }/>
        </>)}
      </Toggable>
    </section>
  )
}
export default Blogs;