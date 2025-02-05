import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../../Components/User/Navbar'
import Footer from '../../Components/User/Footer'
function UserRoot() {
  return (
    <div>
    <Navbar/>
     <Outlet/>
    <Footer/>
    </div>
  )
}

export default UserRoot
