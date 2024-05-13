import Toggable from "./Togglable";
const ButtonLanding = ({user,setUser,setErrorMessage})=>{
    return(
        <>
        <Toggable buttonLabel={{Login:"Login",Register:"Register"} } user={user}  loginHandle={{setUser,setErrorMessage}}>

        </Toggable>
        </>
    )
}
export default ButtonLanding;