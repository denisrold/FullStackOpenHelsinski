import { useState } from "react";
import LoginForm from "./LoginForm";
const ButtonLanding = ({user,setUser,setErrorMessage})=>{
    const [buttonUser,setButtonUser] = useState(null);
    return(
        <>
        {!user&&buttonUser==null&&(<section className="buttonsLandingContainer">
            <button onClick={()=>setButtonUser('login')}>Login</button>
            <button onClick={()=>setButtonUser(null)}>Register</button>
        </section>)}
        {buttonUser&&<LoginForm setButtonUser={setButtonUser} loginHandle={{user,setUser,setErrorMessage} } />}
        </>
    )
}
export default ButtonLanding;