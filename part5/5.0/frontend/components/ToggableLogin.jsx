
import LoginForm from "./LoginForm";
import { useState , forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types'

const ToggableLogin = forwardRef((props,refs) => {
  const [visible,setVisible] = useState(false);
  const showHideVisible = { display:visible?'none':'' };
  const hideWhitVisible = { display:visible?'':'none' };
  const toggleVisibility =() => {
    setVisible(!visible);
  }
  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })
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
    </>
)})

ToggableLogin.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
  }
  ToggableLogin.displayName = 'ToggableLogin'
export default ToggableLogin;