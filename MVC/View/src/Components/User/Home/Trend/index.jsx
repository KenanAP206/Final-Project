import React from 'react'
import './Trend.css'
import Card from '../../Card1/index'
import { showContext } from '../../../../Context/ShowContext';
import { useContext } from 'react';
function index() {
  let {shows,loading}=useContext(showContext)
  const filteredShows = shows ? shows.filter(show => show.views > 1000).slice(0, 4) : [];
  console.log(filteredShows);
  
  return (
    <section id='trend'>
       <div className="hadmer">Trending Shows</div> 
      <div className="trend-cards">
        {filteredShows.map(show => (
          <Card key={show.name} image={show.image} name={show.name} category={show.category} type={show.type} year={show.year} episode={show.episode} rating={show.rating} id={show._id} />
        ))}
      </div>
    </section>
  )
}

export default index
