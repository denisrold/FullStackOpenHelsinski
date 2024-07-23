import './Info.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Info = ()=>{
    const navigate = useNavigate();
    const loggedUserID = useSelector(state => state.user.userId)
    useEffect(()=>{
        if(!loggedUserID)navigate('/');
    },[loggedUserID]);
    return(
        <>
        <div className="Info_container">
        Info
        </div>
        </>
    )
}
export default Info;