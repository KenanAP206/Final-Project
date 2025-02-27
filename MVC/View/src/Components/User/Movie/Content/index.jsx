import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams } from 'react-router';
import './Content.css'
import { FaStar } from "react-icons/fa";
import { IoEye, IoPlayOutline, IoClose, IoHeart } from "react-icons/io5";
import LoadingPage from '../../Loading/index'
import Swal from 'sweetalert2';
import { useLocation } from "react-router-dom";

function ContentPage() {
    const location = useLocation();
    const { id } = useParams();
    const [show, setShow] = useState(null);
    const [isOverlayVisible, setOverlayVisible] = useState(false);
    const [selectedAnime, setSelectedAnime] = useState(null);
    const [videoUrl, setVideoUrl] = useState('');
    const [episodes, setEpisodes] = useState({});
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });



    const handleAddToFavorites = async () => {
        try {
                const token = localStorage.getItem('token');
                if (!token) {
                    Toast.fire({
                        icon: "error",
                        background:'#1b1b1b',
                        color:'white',
                        title: "Please login..."
                    });
                    return;
                }
            
                const tokenParts = token.split('.');
                const payload = JSON.parse(atob(tokenParts[1]));
                const userId = payload.userId;

                const userResponse = await axios.get(`http://localhost:3000/users/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

            console.log("User Response Data:", userResponse.data);

            const userData = userResponse.data.data;

            console.log("ID:", id);
            console.log("Favorites before check:", userData.favorites);

            if (!userData.favorites) {
                userData.favorites = [];
            }

            if (userData.favorites.includes(id)) {
                console.log("ID already in favorites:", id);
                Toast.fire({
                    icon: "error",
                    background:'#1b1b1b',
                    color:'white',                    
                    title: "Already in <b>Favorites</b>!"
                  });
                return;
            }

            userData.favorites.push(id);

            await axios.put(`http://localhost:3000/users/${userId}`, userData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            Toast.fire({
                icon: "success",
                background:'#1b1b1b',
                color:'white',
                title: "Added in <b>Favorites</b> successfully!"
              });

        } catch (error) {
            console.error('Adding error:', error);
            Toast.fire({
                icon: "error",
                background:'#1b1b1b',
                color:'white',
                title: "Something went wrong..."
              });
        }
    };

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
    async function Watched(){
        const token = localStorage.getItem('token');
        const tokenParts = token.split('.');
        const payload = JSON.parse(atob(tokenParts[1]));
        const userId = payload.userId;
        const userResponse = await axios.get(`http://localhost:3000/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log("User Response Data:", userResponse.data);

        const userData = userResponse.data.data;
        const pathParts = location.pathname.split("/");
    
        if (pathParts.length === 3 && (pathParts[1] === "movie" || pathParts[1] === "series")) {
          const contentId = pathParts[2]; 
    
        if (!userData.watched) {
            userData.watched = [];
        }

        if (userData.watched.includes(contentId)) {
            return;
        }

        userData.watched.push(contentId);

        await axios.put(`http://localhost:3000/users/${userId}`, userData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
          }
        }
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
        Watched()
        fetchShow();
        fetchEpisodes();
    }, [id]);


   
   

   
    if (!show) return <LoadingPage />;

    return (
        <div>
            <div className="content-blur"></div>
            <section id='movcontent'>
                <div className="mcontent-up">
                    <div className="mcontent-video">
                        <iframe src={episodes[0]?.link || ''}></iframe>
                    </div>
                </div>
                <div className="mcontent-low">
                    <div className="mcl-left">
                        <div className="mcl-header">
                            <h2>
                                <p>{show.name}</p> 
                                <span>{show.rating} <FaStar className='star' /> {show.views} <IoEye /> </span>
                                <button className='favorim' onClick={handleAddToFavorites}>
                                    <IoHeart />
                                </button>
                            </h2>
                        </div>
                        <div className="mcl-l-tags">
                            <span>{show.age_rating}</span>
                            <span>{show.quality}</span>
                            <span>{show.year}</span>
                            <span>{show.sort}</span>
                            <span>{show.duration}</span>
                        </div>
                        <div className="mcl-info">
                            <h2>About the Story</h2>
                            <p>{show.desc}</p>
                        </div>

                        <h6><span>Staring:</span> {show.staring}</h6>
                        <h6><span>Language:</span> {show.language}</h6>
                        <h6><span>Subtitles:</span> {show.subtitles}</h6>

                        <button onClick={() => handleWatchTrailer(show.name, show.trailer)}>
                            <IoPlayOutline /> Play
                        </button>
                    </div>

                    <div className="mcl-right">
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
                                {Array.isArray(show.genre) && show.genre.length > 0 
                                    ? show.genre.flatMap(genre => genre.split(",")).map((genre, index) => (
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
                                <button className="close-button" onClick={handleCloseOverlay}>
                                    <IoClose /> Close
                                </button>
                            </div>
                            <iframe 
                                width="937" 
                                height="527" 
                                src={videoUrl} 
                                title={`${selectedAnime} Trailer`} 
                                frameBorder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                referrerPolicy="strict-origin-when-cross-origin" 
                                allowFullScreen
                            />
                        </div>
                    </div>
                )}
                <hr />
            </section>
        </div>
    );
}

export default ContentPage;