import React from 'react'
import './Trend.css'
import Card from '../../Card1/index'
function index() {
  return (
    <section id='trend'>
       <div className="hadmer">Trending Shows</div> 
      <div className="trend-cards">
    <Card image='https://uiparadox.co.uk/templates/vivid/v3/assets/media/anime-card/img-3.png' name='Hell’s Paradise' category='Action' year='2021' episode='24' rating='8.5'/>
    <Card image='https://uiparadox.co.uk/templates/vivid/v3/assets/media/anime-card/img-4.png' name='One Piece' category='Action' year='2021' episode='1000' rating='8'/>
    <Card image='https://uiparadox.co.uk/templates/vivid/v3/assets/media/anime-card/img-5.png' name='86 Eighty Six' category='Action' year='2021' episode='12' rating='8.5'/>
    <Card image='https://uiparadox.co.uk/templates/vivid/v3/assets/media/anime-card/img-6.png' name='Darling in the Franxx' category='Action' year='2021' episode='24' rating='7'/>

      </div>
    </section>
  )
}

export default index
