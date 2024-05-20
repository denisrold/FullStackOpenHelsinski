
import Toggable from "./Togglable";

const ButtonLanding = ({setChangesNotes,user,setUser,setErrorMessage})=>{
    
    return(
        <>
        <Toggable setChangesNotes={setChangesNotes} login={true} buttonLabel={"Login" } buttonLabelRegister={"Register"} user={user} loginHandle={{setUser,setErrorMessage}}>
            <section className="landingContainer">Landing...</section>
        </Toggable>
        </>
    )
}
export default ButtonLanding;