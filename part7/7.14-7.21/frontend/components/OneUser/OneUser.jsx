import { useParams,useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import './OneUser.css';
import { useEffect, useState } from "react";

const OneUser = () => {

  const { id } = useParams()

  const { users } = useSelector(state=>state.user);

  const user = users.find(user=>user.id===id);
return (
  <>
  <section className="oneUser">
    <h3>
     { user.username }
    </h3>
    <ul className="userBlogsList">
    {user.blogs && user.blogs.map((b,i) => (

      <li key={i} className="list_blogs_user">
        <Link to={`/blog/${b.id}`}>{ b.title }</Link><span>likes: {b.likes} </span><span>url: <a to='#'>{b.url}</a></span><span>comments: {b.comments.length} </span>
      </li>

    )
   )}
   </ul>
   {!user.blogs.length && <h4>hasn't created blogs yet</h4>}
  </section>
  <div className="buttonsBack">
  Back to: 
  <Link to='/home'>home</Link>
  <Link to='/users'>users</Link>
  </div>
  </>
  )
}
export default OneUser;