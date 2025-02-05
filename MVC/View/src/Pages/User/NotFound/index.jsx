import React from 'react'
import {NavLink} from 'react-router'
import './NotFound.css'
function index() {
  return (
    <main>
      <section id='notfound'> 
        <h2>404</h2>
        <h3>PAGE NOT FOUND</h3>
        <NavLink to ='/'>Go Back</NavLink>
      </section>
      </main>
  )
}

export default index
