import { Link } from 'react-router-dom';
import './Navbar.css';
import LogoutButton from '../LogoutButton/LogoutButton'; 
const Navbar = ({setUser, setLoadState}) => {
  
    return(
      <>
        <nav className="navbar_container">
          <div className='navFull'>
            <h1 className='Logo'>Blogguerse</h1>
            <ul className='ul_navbar'>
              <li><Link to={'/home'}>Home</Link></li>
              <li><Link to={'/myblogs'}>My blogs</Link></li>
              <li><Link to={'/users'}>Users</Link></li>
              <li><Link to={'/info'}>My info</Link></li>
            </ul>
            <LogoutButton logoutStates={{setUser,setLoadState}}/>
            </div>
          <div className='media_cell'>
          <h1 className='LogoCell'>Blogguerse</h1>
          
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 burguerButton" >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
          </div>
          <ul className='Cell_view'>
          <li><a>Home</a></li>
            <li><a>My blogs</a></li>
            <li><a>Users</a></li>
            <li> <a>My info</a></li>
            <LogoutButton logoutStates={{setUser,setLoadState}}/>
          </ul>
        </nav>
      </>
    )
}

export default Navbar;