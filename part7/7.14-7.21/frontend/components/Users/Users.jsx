import './Users.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Users = ()=>{
    const navigate = useNavigate();
    const loggedUserID = useSelector(state => state.user.userId)
    useEffect(()=>{
        if(!loggedUserID)navigate('/');
    },[loggedUserID]);
    return(
        <>
        <div className="Users_container">
        Users
        </div>
        </>
    )
}
export default Users;