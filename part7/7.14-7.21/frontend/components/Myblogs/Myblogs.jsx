import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Myblogs.css';
const Myblogs = ()=>{
    const navigate = useNavigate();
    const loggedUserID = useSelector(state => state.user.userId)
    useEffect(()=>{
        if(!loggedUserID)navigate('/home');
    },[loggedUserID]);
    const  { blogs }  = useSelector(state => state.blogs);
    return(loggedUserID&&(
        <div className="myblogs_container">
        MyBlogs
        </div>
      )
    )
}
export default Myblogs;