
import LoginForm from "./LoginForm";
import {useState} from 'react';
const Toggable = (props)=>{
    const [visible,setVisible] = useState(false);
    const {Login,Register} = props?.buttonLabel;
    const hideWhitVisible = {display:visible?'none':''};
    const showHideVisible = {display:visible?'':'none'};
    const user = props?.user;
    const {setErrorMessage,setUser} = props?.loginHandle; 
    const toggleVisibility =()=>{
        setVisible(!visible);
    }
    return(
        <>  
        <div style={hideWhitVisible}>
            {props.children}
            <section className="buttonsLandingContainer">
                <button onClick={toggleVisibility}>{Login}</button>
                <button onClick={toggleVisibility}>{Register}</button>
            </section>
        </div>
        <div style={showHideVisible}>
            <LoginForm setErrorMessage={setErrorMessage} visible={visible} setVisible={setVisible} user={user} loginHandle={{setErrorMessage,setUser}} />
        </div>
        </>
    )
}
export default Toggable;