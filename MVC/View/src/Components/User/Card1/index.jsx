import React from 'react'
import './Card1.css'
import { RiPlayLargeLine } from "react-icons/ri";
import { NavLink } from 'react-router-dom'
import { FaStar } from "react-icons/fa";
import { TbPremiumRights } from "react-icons/tb";

function index(props) {
  const navigateTo = () => {
    if (props.type === "Movie") {

      return `/movie/${props.id}`;
    } else {
      return `/series/${props.id}`;
    }
  };



  return (
    <div id='card1'>
      <div className="card-up">
        {props.premium ? <TbPremiumRights className='prem-icon' />
          : ''}
        <img alt="" srcSet={props.image} />
        <NavLink to={navigateTo()}>
          Watch Now <RiPlayLargeLine />
        </NavLink>
      </div>
      <div className="card-low">
        <h3>{props.name}</h3>
        <div className="c-tags">
          <span>{props.category} • {props.year} • EP-{props.episode} • <FaStar /> {props.rating} </span>
        </div>
      </div>
    </div>
  )
}

export default index
