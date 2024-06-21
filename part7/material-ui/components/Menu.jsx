import { Link } from "react-router-dom"
import { AppBar,Toolbar,IconButton,Button } from '@mui/material'

const Menu = ({ user }) => {
  console.log(user);
  const colorWhite = {

    color:'white',

    textDecoration:'none',
 
  }
    return (
      <AppBar position="static" >
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
        </IconButton>
        <Button  component={Link} to="/" color="inherit">
          <Link style={colorWhite} to="/">home</Link>
        </Button>
        <Button component={Link} to="/notes" color="inherit">
          <Link  style={colorWhite} to="/notes">notes</Link>
        </Button>
        <Button  component={Link} to="/persons" color="inherit">
          <Link style={colorWhite} to="/persons">persons</Link>
        </Button>  
        <Button color="inherit">
          {user
            ? <em>{user} logged in</em>
            : <Link style={colorWhite} to="/login">login</Link>
          }
        </Button>                
      </Toolbar>
    </AppBar>
    )
}


export default Menu;