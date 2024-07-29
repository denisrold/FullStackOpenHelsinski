import './Users.css';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { getAllUsers } from '../../redux/reducers/userReducer';

const Users = ()=>{
    const loggedUserID = useSelector(state => state.user.userId)
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getAllUsers());
    },[loggedUserID]);
    const  { users }  = useSelector(state => state.user)
    return(
        <section className="Users_container">
        <h3>Ranking Users:</h3>
        {!users && <div>Loading...</div>}
        {users&&users.map((user,i)=>(
        <ul className='usersList'  key={i}>
          <li className='userItem'>
            <Link to={`/user/${user.id}`} >{user.username}</Link> 
            <h3>{user.blogs.length} blogs</h3>
          </li>
        </ul>
          )
        )}
       </section>
    )
}

export default Users;