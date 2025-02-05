import React from 'react'
import './Card1.css'
import { RiPlayLargeLine } from "react-icons/ri";
import {NavLink} from 'react-router-dom'
import { FaStar } from "react-icons/fa";

function index(props) {
  return (
    <div id='card1'>
      <div className="card-up">
        <img alt="" srcSet={props.image} />
        <NavLink> 
        Watch Now <RiPlayLargeLine/>
         </NavLink>
        </div>
      <div className="card-low">
        <h3>{props.name}</h3>
        <div className="c-tags">
          <span>{props.category} • {props.year} • EP-{props.episode} • <FaStar/> {props.rating} </span>
        </div>
      </div>
    </div>
  )
}

export default index
