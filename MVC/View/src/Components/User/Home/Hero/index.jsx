import React from 'react'
import './Hero.css'
import { MdOutlineInfo } from "react-icons/md";
import { RiPlayLargeLine } from "react-icons/ri";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useState, useEffect } from 'react'

function index() {
    const slides = [
        {
          img: 'https://wallpapers-clan.com/wp-content/uploads/2025/01/tanjiro-fire-wolf-demon-slayer-desktop-wallpaper-preview.jpg',
          title: 'Demon Slayer: Kimetsu no Yaiba',
          tags: ['18+', 'HD', '2029', 'Anime', '1hr 45m'],
          stars: 'Natsuki Hanae, Akari Kito, Hiro Shimono'
        },
        {
          img: 'https://imgs.search.brave.com/-aBBae6Ti6EZzaOVjMdUqbRz1Gz6Kdco-fJS69LFUvE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLWNsYW4u/Y29tL3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDI1LzAxL2pqay1z/YXRvcnUtZ29qby1k/YXJrLWNsb3RoZXMt/ZGVza3RvcC13YWxs/cGFwZXItY292ZXIu/anBn',
          title: 'Jujutsu Kaisen',
          tags: ['18+', 'HD', '2030', 'Anime', '2hr 45m'],
          stars: 'Natsuki Hanae, Akari Kito, Hiro Shimono'
        }
      ];
    
      const [currentSlide, setCurrentSlide] = useState(0);
      const [isTransitioning, setIsTransitioning] = useState(false);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
      setIsTransitioning(false);
    }, 200);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
      setIsTransitioning(false);
    }, 200);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000); 

    return () => clearInterval(timer); 
  }, [currentSlide]);
  return (
    <div>
      <section id='hero'>
        <div className="hero-all">
        <div className="hero-slider">
          <div className={`slider ${isTransitioning ? 'fade' : ''}`}>
            <img src={slides[currentSlide].img} alt={slides[currentSlide].title} />
            <div className="slider-txt">
              <h2>{slides[currentSlide].title}</h2>
              <div className="slider-tags">
                {slides[currentSlide].tags.map((tag, index) => (
                  <span key={index}>{tag}</span>
                ))}
              </div>
              <p><span>Starting:</span> {slides[currentSlide].stars}</p>
              <div className="slider-btns">
                <button className='playbtn'><RiPlayLargeLine /> Play</button>
                <button className='infbtn'><MdOutlineInfo /> More info</button>
              </div>
            </div>
          </div>
          <button className="nav-btn left" onClick={prevSlide}><FaArrowLeft /></button>
          <button className="nav-btn right" onClick={nextSlide}><FaArrowRight /></button>
        </div>
            <div className="hero-cards">
                <div className="hero-card">
                    <img alt="hero academia" srcset="https://imgs.search.brave.com/VXqEYuA3L2KVFkmXSPpMJGySw_LtL_0xVjAdKNwwIUE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXZlLmNv/bS93cC93cDI1NDEx/MzcuanBn" />
                <div className="hc-txt">
                <h3>My Hero Academia</h3>
                    <div className="hc-tags">
                        <p>2019 • <span>18+</span> • 4 seasons • Anime</p>
                    </div>
                    <p>Story of Deku who has no quirk or power.</p>
                    <button><RiPlayLargeLine/> Watch</button>
                </div>
                </div>
                <div className="hero-card">
                    <img alt="" srcset="https://imgs.search.brave.com/Gn7aridMjjNmfjFFIwDVY9fCTxgNd_eaNzuViQly3rM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jNC53/YWxscGFwZXJmbGFy/ZS5jb20vd2FsbHBh/cGVyLzMyMy80NzIv/OTMxL2hlbGwtcy1w/YXJhZGlzZS1qaWdv/a3VyYWt1LWFuaW1l/LWJveXMtYW5pbWUt/Z2lybHMtaGQtd2Fs/bHBhcGVyLXByZXZp/ZXcuanBn" />
               <div className="hc-txt">
               <h3>Hell's Paradise</h3>
                    <div className="hc-tags">
                        <p>2019 • <span>18+</span> • 4 seasons • Anime</p>
                    </div>
                    <p>Sentenced to death, ninja Gabimaru the Hollow finds himself apathetic.</p>
                    <button><RiPlayLargeLine/> Watch</button>
               </div>
                </div>
            </div>
        </div>
      </section>
    </div>
  )
}

export default index
