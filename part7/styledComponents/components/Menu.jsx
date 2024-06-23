import { Link } from "react-router-dom"
import styled from 'styled-components'

const Menu = ({ user }) => {
  const colorWhite = {
    padding:'1rem',
    color:'white',

    textDecoration:'none',
 
  }
  const Em = styled.em`
  font-size: 1em;
  margin: 1em;
  color:white
`
    return (
      <>
          <Link style={colorWhite} to="/">home</Link>
          <Link  style={colorWhite} to="/notes">notes</Link>
          <Link style={colorWhite} to="/persons">persons</Link>
          {user
            ? <Em>{user} logged in</Em>
            : <Link style={colorWhite} to="/login">login</Link>
          }
        </>


    )
}


export default Menu;