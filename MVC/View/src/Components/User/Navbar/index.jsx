import React from 'react'
import { NavLink } from "react-router"
import './Navbar.css'
import { FaSearch } from "react-icons/fa";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";

function index() {
  return (
    <header>
      <nav className='navbarim'>
        <div className="logo"> <NavLink to='/'><img alt="logo" srcset="/src/assets/Images/logo2.png" />  </NavLink></div>
        <div className="nav-mid">
          <NavLink to='/' style={({ isActive }) => ({ color: isActive ? '#AC01FB' : 'white' })}>Home</NavLink>
          <NavLink to='/allshows' style={({ isActive }) => ({ color: isActive ? '#AC01FB' : 'white' })}>Shows</NavLink>
          <NavLink to='/blog' style={({ isActive }) => ({ color: isActive ? '#AC01FB' : 'white' })}>Blog</NavLink>
          <NavLink to='/contact' style={({ isActive }) => ({ color: isActive ? '#AC01FB' : 'white' })}>Contact</NavLink>
        </div>
        <div className="nav-r">
          
          <div className="searcher">
            <button>
              <FaSearch />
              </button>

            <input placeholder='Search...' type="text" />
          </div>

          <MdOutlineNotificationsActive className='notific border-white border-1' />

          <FaUser className='bg-white user-btn' />
          <GiHamburgerMenu className='bg-white menu-btn' />
        </div>
      </nav>
    </header>
  )
}

export default index
