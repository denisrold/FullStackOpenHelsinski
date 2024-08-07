import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Toggable = forwardRef((props,refs) => {
  const [visible, setVisible] = useState(false)
  const hideWhitVisible = { display:visible?'none':'' }
  const showHideVisible = { display:visible?'':'none' }
  
  const toggleVisibility = () => {
    if(props.dispatch){
      props.dispatch({type:'CLEAR',payload:''});
    }
    setVisible(!visible)
  }
  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }})

  return(
    <section >
      <div style={showHideVisible}>
        {props.children}
        <button data-testid="backButtonContainer" className='backButtonContainer' onClick={toggleVisibility}>
          {props.buttonlabelCancel?props.buttonlabelCancel:
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="backButton">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
            </svg>}
        </button>
      </div>
      <div style={hideWhitVisible}>
        <section className="">
          <button name={props.buttonLabel} onClick={toggleVisibility}>{props.buttonLabel}</button>
        </section>
      </div>
    </section>
  )
})

Toggable.propTypes = {
  buttonLabel : PropTypes.string.isRequired
}
//displayname in components
Toggable.displayName = 'Togglable'
export default Toggable;