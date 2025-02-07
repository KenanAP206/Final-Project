import React from 'react'
import Slider from 'react-slick';
import './Recent.css'
import Card from '../../Card1/index'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function index() {
    
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
                <Card image='https://uiparadox.co.uk/templates/vivid/v3/assets/media/anime-card/img-14.png' name="Hell's Paradise" category='Action' year='2021' episode='24' rating='8.5' />
                <Card image='https://uiparadox.co.uk/templates/vivid/v3/assets/media/anime-card/img-4.png' name='One Piece' category='Action' year='2021' episode='1000' rating='8' />
                <Card image='https://uiparadox.co.uk/templates/vivid/v3/assets/media/anime-card/img-5.png' name='86 Eighty Six' category='Action' year='2021' episode='12' rating='8.5' />
                <Card image='https://uiparadox.co.uk/templates/vivid/v3/assets/media/anime-card/img-6.png' name='Darling in the Franxx' category='Action' year='2021' episode='24' rating='7' />
            </Slider>
        </section>
    )
}

export default index
