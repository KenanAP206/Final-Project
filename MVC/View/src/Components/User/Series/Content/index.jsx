import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from 'react-router';
import "./Content.css";
import { FaStar } from "react-icons/fa";
import { IoEye, IoPlayOutline, IoClose } from "react-icons/io5";
function Index() {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const [selectedAnime, setSelectedAnime] = useState(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [episodes, setEpisodes] = useState([]);
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


  
  useEffect(() => {
    const fetchShow = () => {
      axios.get(`http://localhost:3000/shows/${id}`)
        .then(response => {
          setShow(response.data.data);
          setSelectedEpisode(episodes[0]);
        })
        .catch(error => {
          console.error("Error fetching show:", error);
        });
    };
    axios.get(`http://localhost:3000/episodes/shows/${id}`)
    .then(response => {
      setEpisodes(response.data);
      console.log(episodes);
      
    })
    .catch(error => {
      console.error("Error fetching show:", error);
    });
    if (episodes?.length > 0) {
      setSelectedEpisode(episodes[0]); 
    }

    fetchShow();
  }, [id]);

  if (!show) return <div>Loading...</div>;


  const handleEpisodeClick = (ep) => {
    if (episodes.length > 0) {
      setSelectedEpisode(ep);
    }
    else {
      selectedEpisode(episodes[0])
    }
  };




  return (
    <div>
      <div className="content-blur"></div>

      <section id="sercontent">
        <div className="scontent-up">
          <div className="scontent-episodes">
            <h3 className="text-white font-bold m-2">Episodes - {episodes?.length}</h3>
            {episodes.length > 0 && episodes.map((ep) => (
              <div
                key={ep.id}
                className={`episode-item ${selectedEpisode?.id === ep.id ? "active" : ""
                  }`}
                onClick={() => handleEpisodeClick(ep)}
              >
                <img src={show.image} className="thumbnail" />
                <p>{show.name} - Episode {ep.order}</p>
              </div>
            ))}
          </div>

          <div className="scontent-video">
            <iframe
              src={selectedEpisode?.link}
              title="Episode Player"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        <div className="scontent-low">
          <div className="scl-left">
            <div className="scl-header">
              <h2><p>{show.name}</p> <span>{show.rating} <FaStar className='star' /> {show.views} <IoEye /> </span></h2>
            </div>
            <div className="scl-l-tags">
              <span> {show.age_rating} </span>
              <span> {show.quality} </span>
              <span> {show.year}</span>
              <span> {show.sort} </span>
              <span> {show.duration}</span>
            </div>
            <div className="scl-info">
              <h2>About the Story</h2>
              <p>{show.desc}
              </p>
            </div>

            <h6><span>Staring:</span>  {show.staring}</h6>
            <h6><span>Language:</span> {show.language}</h6>
            <h6><span>Subtitles:</span>  {show.subtitles}</h6>

            <button onClick={() => handleWatchTrailer(show.name, show.trailer)}>
              <IoPlayOutline /> Play
            </button>
          </div>
          <div className="scl-right">
            <h2>About</h2>

            <h6><span>Type:</span> {show.sort}</h6>
            <h6><span>Director:</span> {show.director}</h6>
            <h6><span>Date aired:</span> {show.date_aired}</h6>
            <h6><span>Status:</span> {show.status}</h6>
            <h6><span>Country:</span> {show.country}</h6>
            <h6><span>Premiered:</span> {show.premiered}</h6>
            <h6><span>Duration:</span> {show.duration}</h6>

            <div className="genre">
              <h4>Genre:</h4>
              <p>
                {Array.isArray(show.genre) && show.genre.length > 0 ?
                  show.genre.flatMap(genre => genre.split(",")).map((genre, index) => (
                    <span key={index}>{genre.trim()}</span>
                  ))
                  : <span>No genres available</span>
                }

              </p>
            </div>
          </div>
        </div>
        {isOverlayVisible && (
          <div className="overlay">
            <div className="overlay-content">
              <div className="overlay-header">
                <h2>{selectedAnime}</h2>
                <button className="close-button" onClick={handleCloseOverlay}><IoClose /> Close</button>
              </div>
              <iframe width="937" height="527" src={videoUrl} title={`${selectedAnime} Trailer`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            </div>
          </div>
        )}
        <hr />
      </section>
    </div>
  );
}

export default Index;
