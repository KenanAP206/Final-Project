import React, { useEffect, useState } from 'react'
import './Continue.css'
import Card from '../../Card2/index'
import { showContext } from '../../../../Context/ShowContext';
import { useContext } from 'react';
import axios from 'axios'
function index() {
  let [filteredShows, setFilteredShows] = useState([])
  let {shows,loading}=useContext(showContext)
  const token = localStorage.getItem('token');

  if (!token) {
    console.error("Token is not available");
    return null; 
  }

  const tokenParts = token.split('.');
  const payload = JSON.parse(atob(tokenParts[1]));
  const userId = payload.userId;

  useEffect(()=>{
    const fetchuser = async ()=>{
      const userResponse = await axios.get(`http://localhost:3000/users/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    const userData = userResponse.data.data;
    setFilteredShows(shows.filter(show => userData.watched.includes(show.id)))
    }

    fetchuser()
  })
  
  if (!token) {
    return (
      <section id='continue'>
      </section>
    );
  }

  return (
    <section id='continue'>
     <div className="cont-head">
     <div className="hadmer">Continue Watching</div>
     </div>
      <div className="cont-cards">
      {filteredShows.slice(0, 6).map(show => (
            <Card image={show.image} name={show.name} category={show.category} id={show._id} duration ={show.duration}/>
        ))}

  
      </div>
    </section>
  )
}

export default index
