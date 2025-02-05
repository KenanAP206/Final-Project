import React from 'react'
import './Footer.css'
import { FaInstagram } from "react-icons/fa";
import { FiFacebook } from "react-icons/fi";
import { BsTwitterX } from "react-icons/bs";
import {NavLink} from 'react-router'
function index() {
  return (
    <footer>
      <div className="footer-up">
        <div className="foot1">
          <img alt="footlogo" srcset="./src/assets/Images/logo2.png" />
          <p>Stay connected with us and lets know
            more stories about new movies and
            More Explorer Us for get it</p>
            <div className="foot-icons">
            <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"><FaInstagram/></a>
            <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"><FiFacebook/></a>
            <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"><BsTwitterX/></a>
            </div>
        </div>
        <div className="foot2">
          <h3>Top Links</h3>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/allshows'>Movies</NavLink>
          <NavLink to='/blog'>Blog</NavLink>
        </div>
        <div className="foot2">
          <h3>Information</h3>
          <NavLink to='/register'>Register</NavLink>
          <NavLink to='/login'>Login</NavLink>
          <NavLink to='/contact'>About Us</NavLink>
        </div>
        <div className="foot2">
          <h3>Services</h3>
          <NavLink to='/allshows'>Movies</NavLink>
          <NavLink to='/blog'>Newsletter</NavLink>
          <NavLink to='/blog'>Blog</NavLink>
        </div>
        <div className="foot2">
          <h3>Security</h3>
          <NavLink to='/'>Terms and Condition</NavLink>
          <NavLink to='/'>Privacy Policy</NavLink>
          <NavLink to='/contact'>Contact us</NavLink>
        </div>
      </div>
      <div className="footer-low">
        All rights reserved by WatchMaker ©2025.
      </div>
    </footer>
  )
}

export default index
