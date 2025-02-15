import React from 'react'
import Slider from 'react-slick';
import './Recent.css'
import Card from '../../Card1/index'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { showContext } from '../../../../Context/ShowContext';
import { useContext } from 'react';
function index() {
      let {shows,loading}=useContext(showContext)
      const filteredShows = shows ? shows.filter(show => show.isNew === true) : [];
    
function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block"}}
        onClick={onClick}
      />
    );
  }
  
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block"}}
        onClick={onClick}
      />
    );
  }
  

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4, 
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };



    return (
        <section id='recent'>
            <div className="recent-head">
                <div className="hadmer">Recently Released</div>

            </div>
            <Slider {...settings}>
            {filteredShows.map(show => (
          <Card key={show.name} image={show.image} name={show.name} category={show.category} type={show.type} year={show.year} episode={show.episode} rating={show.rating} id={show._id} />
        ))}
            </Slider>
        </section>
    )
}

export default index
