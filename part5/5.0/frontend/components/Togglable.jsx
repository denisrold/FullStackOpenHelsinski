

import { useState , forwardRef, useImperativeHandle } from 'react';

import PropTypes from 'prop-types';

const Toggable = forwardRef((props,refs) => {
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
            <button id='testbutton' name={props.buttonLabel} onClick={ toggleVisibility }>{ props.buttonLabel }</button>
          </section>
        </div>
      </section>
    )
})

Toggable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}
Toggable.displayName = 'Toggable'
export default Toggable;