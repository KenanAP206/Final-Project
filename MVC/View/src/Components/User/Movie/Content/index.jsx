import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams } from 'react-router';
import './Content.css'
import { FaStar } from "react-icons/fa";
import { IoEye } from "react-icons/io5";
import { IoPlayOutline, IoClose } from "react-icons/io5";
import LoadingPage from '../../Loading/index'
function index() {
    const { id } = useParams();
    const [show, setShow] = useState(null);
    const [isOverlayVisible, setOverlayVisible] = useState(false);
    const [selectedAnime, setSelectedAnime] = useState(null);
    const [videoUrl, setVideoUrl] = useState('');
    const [episodes, setEpisodes] = useState({});
    
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
                })
                .catch(error => {
                    console.error("Error fetching show:", error);
                });
        };
        const fetchEpisodes = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/episodes/shows/${id}`);
          
                setEpisodes(response.data);

                
            } catch (error) {
                console.error("Error fetching episodes:", error);
            }
        };

        fetchEpisodes();
        fetchShow();
    }, [id]);

 
    if (!show) return <div><LoadingPage/></div>;

    return (
        <div>
            <div className="content-blur">

            </div>

            <section id='movcontent'>

                <div className="mcontent-up">
                    <div className="mcontent-video">
                        <iframe src={episodes[0]?.link || ''}></iframe>
                    </div>
                </div>
                <div className="mcontent-low">
                    <div className="mcl-left">
                        <div className="mcl-header">
                            <h2><p>{show.name}</p> <span>{show.rating} <FaStar className='star' /> {show.views} <IoEye /> </span></h2>
                        </div>
                        <div className="mcl-l-tags">
                            <span> {show.age_rating} </span>
                            <span> {show.quality} </span>
                            <span> {show.year}</span>
                            <span> {show.sort} </span>
                            <span> {show.duration}</span>
                        </div>
                        <div className="mcl-info">
                            <h2>About the Story</h2>
                            <p>{show.desc}
                            </p>

                        </div>

                        <h6><span>Staring:</span>  {show.staring}</h6>
                        <h6><span>Language:</span> {show.language}</h6>
                        <h6><span>Subtitles:</span>  {show.subtitles}</h6>

                        <button onClick={() => handleWatchTrailer(show.name, show.trailer)}><IoPlayOutline /> Play</button>

                    </div>
                    <div className="mcl-right">
                        <h2>
                            About
                        </h2>

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
    )
}

export default index
