import {useState} from 'react';
import LoginForm from './LoginForm';

const Toggable = (props)=>{
    const {Login,Register} = props.buttonLabel;
    const {setUser}  = props.loginHandle;
    const {setErrorMessage} = props.loginHandle; 
    const user = props.user;
    const [visible,setVisible] = useState(false);
    const hideWhitVisible = {display:visible?'none':''};
    const showHideVisible = {display:visible?'':'none'};
    const toggleVisibility =()=>{
        setVisible(!visible);
    }
    return(
        <>  
        <div style={hideWhitVisible}>
        <section className="landingContainer">Landing...</section>
            <section className="buttonsLandingContainer">
                <button onClick={toggleVisibility}>{Login}</button>
                <button onClick={toggleVisibility}>{Register}</button>
            </section>
        </div>

        <div style={showHideVisible}>
            <LoginForm setErrorMessage={setErrorMessage} setButtonUser={props.setButtonUser} visible={visible} setVisible={setVisible} user={user} loginHandle={{setErrorMessage,setUser}} />
        </div>
        </>
    )
}
export default Toggable;