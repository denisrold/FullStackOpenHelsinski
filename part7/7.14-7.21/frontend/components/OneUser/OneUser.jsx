import { useParams,useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import './OneUser.css';

const OneUser = () => {
    const navigate = useNavigate();
    const loggedUserID = useSelector(state => state.user.userId)
    useEffect(()=>{
        if(!loggedUserID)navigate('/');
    },[loggedUserID]);
    const { users } = useSelector(state=>state.user);
    const { id } = useParams()
    if(!users){return navigate('/')}
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
        <span>{ b.title }</span><span>likes: {b.likes} </span><span>url: <a to='#'>{b.url}</a></span>
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