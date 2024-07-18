import './Navbar.css';
import LogoutButton from '../LogoutButton/LogoutButton'; 
const Navbar = ({setUser, setLoadState}) => {
  
    return(
      <>
        <nav className="navbar_container">
          <h1 className='Logo'>Blogguerse</h1>
          <ul className='ul_navbar'>
            <li><a>Home</a></li>
            <li><a>My blogs</a></li>
            <li><a>Users</a></li>
            <li> <a>My info</a></li>
          </ul>
          <LogoutButton logoutStates={{setUser,setLoadState}}/>
        </nav>
      </>
    )
}

export default Navbar;