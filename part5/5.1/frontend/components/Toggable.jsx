import { useState } from 'react';
const Toggable =(props)=>{
    const [visible, setVisible] = useState(false)
    const hideWhitVisible = {display:visible?'none':''}
    const showHideVisible = {display:visible?'':'none'}
    const toggleVisibility =()=>{
        if(props.setErrorMessage){
            props.setErrorMessage(null);
        }
        setVisible(!visible)
    }
    return(
        <section >
        <div style={showHideVisible}>
            {props.children}
            <button onClick={toggleVisibility}>Back</button>
        </div>
        <div style={hideWhitVisible}>
            <section className="">
                <button  onClick={toggleVisibility}>{props.buttonLabel}</button>
            </section>
        </div>
        </section>
    )
}
export default Toggable;