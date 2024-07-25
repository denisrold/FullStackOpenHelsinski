import { useParams,useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import './OneUser.css';

const OneUser = () => {
    const navigate = useNavigate();
    const loggedUserID = useSelector(state => state.user.userId)
    useEffect(()=>{
        if(!loggedUserID)navigate('/');
    },[loggedUserID]);
  const { id } = useParams()
  const { users } = useSelector(state=>state.user);
  if(!users){return navigate('/')}
  const user = users.find(user=>user.id===id);
return (
  <section className="oneUser">
    <h3>
      { user.name }
    </h3>
    <ul className="userBlogsList">
    {user.blogs && user.blogs.map((b,i) => (
      <li key={i}>
        { b.title }
      </li>
    )
   )}
   </ul>
  </section>
  )
}

export default OneUser;