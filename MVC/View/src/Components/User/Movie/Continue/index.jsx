import React from 'react'
import './Continue.css'
import {NavLink} from 'react-router-dom'
import { FaChevronRight } from "react-icons/fa6";
import Card from '../../Card2/index'
function index() {
  return (
    <section id='continue'>
     <div className="cont-head">
     <div className="hadmer">Continue Watching</div>
    <NavLink to='/allshows'>View All <FaChevronRight /></NavLink>
     </div>
      <div className="cont-cards">
        <Card image='https://uiparadox.co.uk/templates/vivid/v3/assets/media/anime-card/img-7.png' name="Hell's Paradise" season='02' eps ='02'/>
        <Card image='https://uiparadox.co.uk/templates/vivid/v3/assets/media/anime-card/img-8.png' name="Fate Stay Night" season='02' eps ='02'/>
        <Card image='https://uiparadox.co.uk/templates/vivid/v3/assets/media/anime-card/img-9.png' name="Steins Gate" season='02' eps ='02'/>
        <Card image='https://uiparadox.co.uk/templates/vivid/v3/assets/media/anime-card/img-10.png' name="Black Bullet" season='02' eps ='02'/>
        <Card image='https://uiparadox.co.uk/templates/vivid/v3/assets/media/anime-card/img-11.png' name="Chainsawman" season='02' eps ='02'/>
        <Card image='https://uiparadox.co.uk/templates/vivid/v3/assets/media/anime-card/img-12.png' name="My Hero Academia" season='02' eps ='02'/>
      </div>
    </section>
  )
}

export default index
