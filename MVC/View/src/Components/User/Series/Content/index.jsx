import React, { useState } from "react";
import "./Content.css";
import { FaStar } from "react-icons/fa";
import { IoEye, IoPlayOutline } from "react-icons/io5";

function Index() {
  // Bölüm listesi
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

  // Seçili bölümü state olarak sakla (başlangıçta ilk bölüm)
  const [selectedEpisode, setSelectedEpisode] = useState(episodes[0]);

  return (
    <div>
      <div className="content-blur"></div>

      <section id="sercontent">
        <div className="scontent-up">
          {/* Bölüm Listesi */}
          <div className="scontent-episodes">
            <h3 className="text-white font-bold mb-2">Episodes</h3>
            {episodes.map((ep) => (
              <div
                key={ep.id}
                className={`episode-item ${
                  selectedEpisode.id === ep.id ? "active" : ""
                }`}
                onClick={() => setSelectedEpisode(ep)}
              >
                <img src={ep.thumbnail} alt={ep.title} className="thumbnail" />
                <p>{ep.title}</p>
              </div>
            ))}
          </div>

          {/* Video Oynatıcı */}
          <div className="scontent-video">
            <iframe
              src={selectedEpisode.videoUrl}
              title="Episode Player"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* Alt Bilgi */}
        <div className="scontent-low">
          <div className="scl-left">
            <div className="scl-header">
              <h2>
                <p>Demon Slayer: Kimetsu no Yaiba : Season 1 </p>
                <span>
                  4.9 <FaStar className="star" /> 200 <IoEye />
                </span>
              </h2>
            </div>
            <div className="scl-l-tags">
              <span> 18+ </span>
              <span> HD </span>
              <span> 2029</span>
              <span> Anime </span>
              <span> 1hr 45m</span>
            </div>
            <div className="scl-info">
              <h2>About the Story</h2>
              <p>
                Flame Hashira Kyojuro Rengoku receives new orders: Travel to the
                Mugen Train, where over forty people have gone missing, and
                conduct an investigation. Leaving the Demon Slayer Corps
                Headquarters, he sets off on this new mission.
              </p>
            </div>

            <h6>
              <span>Staring:</span> Natsuki Hanae, Akari Kito, Hiro Shimono
            </h6>
            <h6>
              <span>Language:</span> Japanese, English, English (India), Español
              (América Latina)
            </h6>
            <h6>
              <span>Subtitles:</span> Japanese, English
            </h6>

            <button>
              <IoPlayOutline /> Play
            </button>
          </div>
          <div className="scl-right">
            <h2>About</h2>

            <h6>
              <span>Type:</span> Movie
            </h6>
            <h6>
              <span>Director:</span> Bones
            </h6>
            <h6>
              <span>Date aired:</span> Jan 15, 2022
            </h6>
            <h6>
              <span>Status:</span> Completed
            </h6>
            <h6>
              <span>Country:</span> Japan
            </h6>
            <h6>
              <span>Premiered:</span> Winter 2022
            </h6>
            <h6>
              <span>Duration:</span> 120 min
            </h6>

            <div className="genre">
              <h4>Genre:</h4>
              <p>
                <span>Action</span> <span>Thriller</span> <span> Sci-Fi</span>{" "}
                <span>Cyberpunk</span> <span>Shounen</span>
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
