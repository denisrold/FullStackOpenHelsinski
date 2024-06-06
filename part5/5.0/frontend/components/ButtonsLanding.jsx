
import ToggableLogin from "./ToggableLogin";
import noteslanding from "../src/assets/noteslanding.jpg"
const ButtonLanding = ({ setChangesNotes,user,setUser,setErrorMessage }) => {

  return(
    <>
      <ToggableLogin setChangesNotes={setChangesNotes} login={true} buttonLabel={"Login" } buttonLabelRegister={"Register"} user={user} loginHandle={{ setUser,setErrorMessage }}>
        <section className="landingContainer">
          <img className="imageLanding" src={noteslanding}></img>
          <article className="landingTextContainer">
            <h2>Revolutionize Your Note-Taking Experience with NoteApp!</h2>
            <p>Say goodbye to scattered thoughts and disorganized notes. With NoteApp!, you can seamlessly capture, organize, and access your ideas anytime, anywhere. Our user-friendly interface and powerful features make it easy to stay on top of your tasks, whether you're a student, professional, or creative. Join thousands of satisfied users and elevate your productivity today. Try NoteApp! now and transform the way you take notes!</p>
          </article>
        </section>
      </ToggableLogin>
    </>
  )
}
export default ButtonLanding;