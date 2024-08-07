import { useParams,useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import './OneUser.css';
import { useEffect, useState } from "react";
import { getAllUsers } from "../../redux/reducers/userReducer";

const OneUser = () => {
  const [user,setUser] = useState([]);
  const { id } = useParams()
  const loggedUserID = useSelector(state => state.user.userId)

    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getAllUsers());
    },[loggedUserID]);
    const  { users }  = useSelector(state => state.user)
  useEffect(()=>{
      if(users){
        const findUsers = users.find(user=>user.id===id);
        setUser([findUsers]);
      }
},[users]);

return (
  user.length&&(
  <>
  <section className="oneUser">
    <h3>
     { user.username }
    </h3>
    <ul className="userBlogsList">
    {user.blogs && user.blogs.map((b,i) => (

      <li key={i} className="list_blogs_user">
        <Link to={`/blog/${b.id}`}>{ b.title }</Link><span>likes: {b.likes} </span><span>url: <a to='#'>{b.url}</a></span>
      </li>

    )
   )}
   </ul>
   {!user.blogs && <h4>hasn't created blogs yet</h4>}
  </section>
  <div className="buttonsBack">
  Back to: 
  <Link to='/home'>home</Link>
  <Link to='/users'>users</Link>
  </div>
  </>)
  )
}
export default OneUser;