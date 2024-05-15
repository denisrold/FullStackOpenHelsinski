
import LoginForm from "./LoginForm";
import {useState , forwardRef, useImperativeHandle} from 'react';
const Toggable = forwardRef((props,refs)=>{
    const [visible,setVisible] = useState(false);
    const hideWhitVisible = {display:visible?'none':''};
    const showHideVisible = {display:visible?'':'none'};

    const toggleVisibility =()=>{
        setVisible(!visible);
    }
    useImperativeHandle(refs, () => {
        return {
        toggleVisibility
    }
})
        
    if(props.login){
       const {Login,Register} = props?.buttonLabel;
       const user = props?.user;
       const {setErrorMessage,setUser} = props?.loginHandle; 
       return(<>
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
       </>)
   }
else{
    return(
        <section >
        <div style={showHideVisible}>
            {props.children}
            <section className="toggleable toggleableClose ">
                    <button  onClick={toggleVisibility}>cancel</button>
            </section>
        </div>
        <div style={hideWhitVisible}>
        <section className="toggleable">
            <button  onClick={toggleVisibility}>{props.buttonLabel}</button>
        </section>
        </div>
        </section>
    )
}
})
export default Toggable;