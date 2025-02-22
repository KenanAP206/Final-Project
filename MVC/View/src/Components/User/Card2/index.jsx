import React from 'react'
import './Card2.css'
import { RiPlayLargeLine } from "react-icons/ri";
import {NavLink} from 'react-router-dom'
import { PiFilmSlateBold } from "react-icons/pi";
import { FaCrown } from "react-icons/fa6";

function index(props) {
  const navigateTo = () => {
    if (props.type === "Movie") {

      return `/movie/${props.id}`;
    } else {
      return `/series/${props.id}`;
    }
  };
  return (
    <div id='card2'>
      <img srcSet={props.image} alt="" />
      <div className="card2-txt">
        <div className="c2-txt-up">
        <h3>{props.name}</h3>
        <p><PiFilmSlateBold/>  {props.duration} • <FaCrown/> {props.category}</p>
        </div>
        <NavLink to={navigateTo()}> <RiPlayLargeLine/> Play</NavLink>
      </div>
    </div>
  )
}

export default index
