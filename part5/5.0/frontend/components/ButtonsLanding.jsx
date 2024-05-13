
import Toggable from "./Togglable";

const ButtonLanding = ({user,setUser,setErrorMessage})=>{
    
    return(
        <>
        <Toggable login={true} buttonLabel={{Login:"Login",Register:"Register"} }  user={user} loginHandle={{setUser,setErrorMessage}}>
            <section className="landingContainer">Landing...</section>
        </Toggable>
        </>
    )
}
export default ButtonLanding;