import { Link } from 'react-router-dom';
import './Navbar.css';
import LogoutButton from '../LogoutButton/LogoutButton'; 
import { useState } from 'react';

const Navbar = ({setUser, setLoadState,user}) => {
    const [viewNavList,setViewNavList] = useState(false);

    const onCloseNavbar = () => {
      setViewNavList(false);
    }
    return(
      <>
        <nav className="navbar_container">
          <div className='navFull'>
            <h1 className='Logo'>Blogguerse</h1>
            <ul className='ul_navbar'>
              <li><Link to={'/home'}>Home</Link></li>
              <li><Link to={'/myblogs'}>My blogs</Link></li>
              <li><Link to={'/users'}>Users</Link></li>
              {/* <li><Link to={'/info'}>My info</Link></li> */}
            </ul>
            <LogoutButton logoutStates={{setUser,setLoadState}}/>
            </div>
          <div className='media_cell'>
          <h1 className='LogoCell'>Blogguerse</h1>
          
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" onClick={()=>setViewNavList(!viewNavList)} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 burguerButton" >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
          </div>
          {viewNavList&&(
            <section className={`viewNavMobileContainer`}>
            <ul className='listNavbarMobile'>
              <li onClick={onCloseNavbar}><Link to={'/home'}>Home</Link></li>
              <li onClick={onCloseNavbar}><Link to={'/myblogs'}>My blogs</Link></li>
              <li onClick={onCloseNavbar}><Link to={'/users'}>Users</Link></li>
              <div className='LogoutView'>
                <LogoutButton logoutStates={{setUser,setLoadState}}/>
              </div> 
            </ul>
           </section>
          )}
        </nav>
      </>
    )
}

export default Navbar;