import React, { useState,useEffect } from "react";
import axios from 'axios';
import { useParams } from 'react-router';
import "./Content.css";
import { FaStar } from "react-icons/fa";
import { IoEye, IoPlayOutline } from "react-icons/io5";

function Index() {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const episodes = [
    {
      id: 1,
      title: "E1 - Flame Hashira Kyojuro Rengoku",
      videoUrl: "http://video.sibnet.ru/shell.php?videoid=4532350&share=1",
      thumbnail: "https://imgs.search.brave.com/pd3cfPrj-fgtJi7uTeSb_qX-DSrI74s9NqbEaaB-1yg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93MC5w/ZWFrcHguY29tL3dh/bGxwYXBlci82MTYv/MzQ3L0hELXdhbGxw/YXBlci1kZW1vbi1z/bGF5ZXItdGh1bWJu/YWlsLmpwZw",
    },
    {
      id: 2,
      title: "E2 - Mugen Train Mission",
      videoUrl: "http://video.sibnet.ru/shell.php?videoid=4532351&share=1",
      thumbnail: "https://imgs.search.brave.com/pd3cfPrj-fgtJi7uTeSb_qX-DSrI74s9NqbEaaB-1yg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93MC5w/ZWFrcHguY29tL3dh/bGxwYXBlci82MTYv/MzQ3L0hELXdhbGxw/YXBlci1kZW1vbi1z/bGF5ZXItdGh1bWJu/YWlsLmpwZw",
    },
    {
      id: 3,
      title: "E3 - The First Battle",
      videoUrl: "http://video.sibnet.ru/shell.php?videoid=4532352&share=1",
      thumbnail: "https://imgs.search.brave.com/pd3cfPrj-fgtJi7uTeSb_qX-DSrI74s9NqbEaaB-1yg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93MC5w/ZWFrcHguY29tL3dh/bGxwYXBlci82MTYv/MzQ3L0hELXdhbGxw/YXBlci1kZW1vbi1z/bGF5ZXItdGh1bWJu/YWlsLmpwZw",
    },
    {
      id: 4,
      title: "E3 - The First Battle",
      videoUrl: "http://video.sibnet.ru/shell.php?videoid=4532352&share=1",
      thumbnail: "https://imgs.search.brave.com/pd3cfPrj-fgtJi7uTeSb_qX-DSrI74s9NqbEaaB-1yg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93MC5w/ZWFrcHguY29tL3dh/bGxwYXBlci82MTYv/MzQ3L0hELXdhbGxw/YXBlci1kZW1vbi1z/bGF5ZXItdGh1bWJu/YWlsLmpwZw",
    },
    {
      id: 5,
      title: "E3 - The First Battle",
      videoUrl: "http://video.sibnet.ru/shell.php?videoid=4532352&share=1",
      thumbnail: "https://imgs.search.brave.com/pd3cfPrj-fgtJi7uTeSb_qX-DSrI74s9NqbEaaB-1yg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93MC5w/ZWFrcHguY29tL3dh/bGxwYXBlci82MTYv/MzQ3L0hELXdhbGxw/YXBlci1kZW1vbi1z/bGF5ZXItdGh1bWJu/YWlsLmpwZw",
    },
    {
      id: 5,
      title: "E3 - The First Battle",
      videoUrl: "http://video.sibnet.ru/shell.php?videoid=4532352&share=1",
      thumbnail: "https://imgs.search.brave.com/pd3cfPrj-fgtJi7uTeSb_qX-DSrI74s9NqbEaaB-1yg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93MC5w/ZWFrcHguY29tL3dh/bGxwYXBlci82MTYv/MzQ3L0hELXdhbGxw/YXBlci1kZW1vbi1z/bGF5ZXItdGh1bWJu/YWlsLmpwZw",
    },
    {
      id: 5,
      title: "E3 - The First Battle",
      videoUrl: "http://video.sibnet.ru/shell.php?videoid=4532352&share=1",
      thumbnail: "https://imgs.search.brave.com/pd3cfPrj-fgtJi7uTeSb_qX-DSrI74s9NqbEaaB-1yg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93MC5w/ZWFrcHguY29tL3dh/bGxwYXBlci82MTYv/MzQ3L0hELXdhbGxw/YXBlci1kZW1vbi1z/bGF5ZXItdGh1bWJu/YWlsLmpwZw",
    },
    {
      id: 5,
      title: "E3 - The First Battle",
      videoUrl: "http://video.sibnet.ru/shell.php?videoid=4532352&share=1",
      thumbnail: "https://imgs.search.brave.com/pd3cfPrj-fgtJi7uTeSb_qX-DSrI74s9NqbEaaB-1yg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93MC5w/ZWFrcHguY29tL3dh/bGxwYXBlci82MTYv/MzQ3L0hELXdhbGxw/YXBlci1kZW1vbi1z/bGF5ZXItdGh1bWJu/YWlsLmpwZw",
    },
  ];
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
    if (episodes.length > 0) {
      setSelectedEpisode(episodes[0]); // Set the first episode after episodes are loaded
    }

    fetchShow();
  }, [id]);

  if (!show) return <div>Loading...</div>;


  const handleEpisodeClick = (ep) => {
    if(episodes.length>0){
    setSelectedEpisode(ep);}
    else{
      selectedEpisode(episodes[0])
    }
  };


 

  return (
    <div>
      <div className="content-blur"></div>

      <section id="sercontent">
        <div className="scontent-up">
          <div className="scontent-episodes">
            <h3 className="text-white font-bold m-2">Episodes - {episodes.length}</h3>
            {episodes.map((ep) => (
              <div
                key={ep.id}
                className={`episode-item ${selectedEpisode?.id === ep.id ? "active" : ""
                  }`}
                onClick={() => handleEpisodeClick(ep)}
              >
                <img src={ep.thumbnail} alt={ep.title} className="thumbnail" />
                <p>{ep.title}</p>
              </div>
            ))}
          </div>

          <div className="scontent-video">
            <iframe
              src={selectedEpisode?.videoUrl}
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

            <button>
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
                {show.genre.split(",").map((genre, index) => (
                  <span key={index}>{genre.trim()}</span>
                ))}
              </p>
            </div>
          </div>
        </div>

        <hr />
      </section>
    </div>
  );
}

export default Index;
