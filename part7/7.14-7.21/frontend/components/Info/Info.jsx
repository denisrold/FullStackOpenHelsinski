import './Info.css';
import { useSelector } from 'react-redux';
const Info = ()=>{
    const loggedUserID = useSelector(state => state.user.userId)
    return(
        <>
        <div className="Info_container">
        Info
        </div>
        </>
    )
}
export default Info;