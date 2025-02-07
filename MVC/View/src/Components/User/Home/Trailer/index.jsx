import React, { useState } from 'react'
import './Trailer.css'
import { FaRegPlayCircle } from "react-icons/fa";
import { GoClock } from "react-icons/go";
import { IoPlayOutline, IoClose } from "react-icons/io5";
import { GiRoundStar } from "react-icons/gi";

function index() {
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const [selectedAnime, setSelectedAnime] = useState(null);
  const [videoUrl, setVideoUrl] = useState('');

  const handleWatchTrailer = (anime, url) => {
    setSelectedAnime(anime);
    setVideoUrl(url);
    setOverlayVisible(true);
  };

  const handleCloseOverlay = () => {
    setOverlayVisible(false);
    setSelectedAnime(null);
    setVideoUrl('');
  };

  return (
    <section id='trailer'>
      <div className="hadmer">Trailer</div>
      <div className="trailer-cont">
        <div className="trailer-l">
            <img src="https://uiparadox.co.uk/templates/vivid/v3/assets/media/anime-card/img-13.png" alt="" />
            <div className="tl-hover">
                <div className="tl-hov-up">
                    <button  onClick={() => handleWatchTrailer('Another', "https://www.youtube.com/embed/N2iSnFwt9do")}>Watch Trailer <IoPlayOutline/></button>
                    <p>  <GoClock/> 01:02</p>
                </div>
                <div className="tl-hov-low">
                        <h3>Another</h3>
                        <p>Drama | 2021 | EP-24 | <GiRoundStar/> 8.5</p>
                </div>
            </div>
        </div>
        <div className="trailer-r">
            <div className="trailer-card">
                <img srcSet="https://uiparadox.co.uk/templates/vivid/v3/assets/media/anime-card/img-14.png" alt="aot" />
                <div className="tc-hover">
                   <div className="tc-hov-txt">
                   <h3>Attack on Titan</h3>
                   <p>Action | 2021 | EP-24</p>
                   </div>
                   <div className="tc-hov-low">
                    <button  onClick={() => handleWatchTrailer('Attack on Titan', "https://www.youtube.com/embed/LV-nazLVmgo" )}> <FaRegPlayCircle/> Watch Trailer</button> <p><GoClock/> 02:26</p>
                   </div>
                </div>
            </div>
            <div className="trailer-card" >
                <img srcSet="https://uiparadox.co.uk/templates/vivid/v3/assets/media/anime-card/img-15.png" alt="black-bullet" />
                <div className="tc-hover">
                   <div className="tc-hov-txt">
                   <h3>Black Bullet</h3>
                   <p>Action | 2021 | EP-24</p>
                   </div>
                   <div className="tc-hov-low">
                    <button onClick={() => handleWatchTrailer('Black Bullet Official Trailer', 'https://www.youtube.com/embed/MH-AYqImZIk')}> <FaRegPlayCircle/> Watch Trailer</button> <p><GoClock/> 01:32</p>
                   </div>
                </div>
            </div>
            <div className="trailer-card">
                <img srcSet="https://uiparadox.co.uk/templates/vivid/v3/assets/media/anime-card/img-16.png" alt="aot" />
                <div className="tc-hover">
                   <div className="tc-hov-txt">
                   <h3>The Garden of Words</h3>
                   <p>Romance | 2021 | EP-24</p>
                   </div>
                   <div className="tc-hov-low">
                    <button onClick={() => handleWatchTrailer('The Garden of Words',"https://www.youtube.com/embed/FMabhvDoolc")}> <FaRegPlayCircle/> Watch Trailer</button> <p><GoClock/> 01:27</p>
                   </div>
                </div>
            </div>
            <div className="trailer-card">
                <img srcSet="https://uiparadox.co.uk/templates/vivid/v3/assets/media/anime-card/img-17.png" alt="aot" />
                <div className="tc-hover">
                   <div className="tc-hov-txt">
                   <h3>One Piece</h3>
                   <p>Action | 2021 | EP-24</p>
                   </div>
                   <div className="tc-hov-low">
                    <button onClick={() => handleWatchTrailer('One Piece',"https://www.youtube.com/embed/MCb13lbVGE0")}> <FaRegPlayCircle/> Watch Trailer</button> <p><GoClock/> 02:36</p>
                   </div>
                </div>
            </div>
        </div>
      </div>

      {isOverlayVisible && (
        <div className="overlay">
          <div className="overlay-content">
            <div className="overlay-header"> 
              <h2>{selectedAnime}</h2>
              <button className="close-button" onClick={handleCloseOverlay}><IoClose/> Close</button>
            </div>
            <iframe width="937" height="527" src={videoUrl} title={`${selectedAnime} Trailer`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          </div>
        </div>
      )}
    </section>
  )
}

export default index
