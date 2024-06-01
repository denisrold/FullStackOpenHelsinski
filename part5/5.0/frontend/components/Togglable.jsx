
import LoginForm from "./LoginForm";
import { useState , forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types'

const Toggable = forwardRef((props,refs) => {
  const [visible,setVisible] = useState(false);
  const  showHideVisible = { display:visible?'none':'' };
  const hideWhitVisible = { display:visible?'':'none' };
  const toggleVisibility =() => {
    setVisible(!visible);
  }
  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })
  //TOGGLABLE LOGIN
  if(props.login){
    const Login = props.buttonLabel;
    const Register = props.buttonLabelRegister
    const user = props?.user;
    const { setErrorMessage,setUser } = props.loginHandle;
    return(
    <>
      <div id="togglableContent" style={ showHideVisible }>
        { props.children }
        <section className="buttonsLandingContainer">
          <button  name="Login" onClick={ toggleVisibility }>{ Login }</button>
          <button onClick={ toggleVisibility }>{ Register }</button>
        </section>
      </div>
      <div style={ hideWhitVisible }>
        <LoginForm setErrorMessage={ setErrorMessage } setChangesNotes={ props.setChangesNotes } visible={ visible } setVisible={ setVisible } user={ user } loginHandle={ { setErrorMessage,setUser } } />
      </div>
    </>)
  }
  else{
    //TOGGLABLE NORMAL
    return(
      <section >
        <div style={  hideWhitVisible }>
          { props.children }
          <section className="toggleable toggleableClose ">
            <button id='testCancelbutton' onClick={ toggleVisibility }>cancel</button>
          </section>
        </div>
        <div style={ showHideVisible  }>
          <section className="toggleable">
            <button id='testbutton' onClick={ toggleVisibility }>{ props.buttonLabel }</button>
          </section>
        </div>
      </section>
    )
  }
})
Toggable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}
Toggable.displayName = 'Toggable'
export default Toggable;