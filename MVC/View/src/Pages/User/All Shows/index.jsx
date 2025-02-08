import React, { useState } from "react";
import "./Shows.css";
import Card from '../../../Components/User/Card1'
import { CiFilter } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";


const data = [
  { id: 1, name: "Your Name", image: "https://uiparadox.co.uk/templates/vivid/v3/assets/media/anime-card/img-15.png" },
  { id: 2, name: "Jujutsu Kaisen", image: "https://uiparadox.co.uk/templates/vivid/v3/assets/media/anime-card/img-14.png" },
  { id: 3, name: "Chainsaw Man", image: "https://uiparadox.co.uk/templates/vivid/v3/assets/media/anime-card/img-13.png" },
  { id: 4, name: "One Piece", image: "https://uiparadox.co.uk/templates/vivid/v3/assets/media/anime-card/img-12.png" },
  { id: 5, name: "86 Eighty-Six", image: "https://uiparadox.co.uk/templates/vivid/v3/assets/media/anime-card/img-11.png" },
  { id: 6, name: "Darling in the Franxx", image: "https://uiparadox.co.uk/templates/vivid/v3/assets/media/anime-card/img-10.png" },
  { id: 7, name: "Arcane", image: "https://uiparadox.co.uk/templates/vivid/v3/assets/media/anime-card/img-9.png" },
  { id: 8, name: "Attack on Titan", image: "https://uiparadox.co.uk/templates/vivid/v3/assets/media/anime-card/img-6.png" },
  { id: 9, name: "Demon Slayer", image: "https://uiparadox.co.uk/templates/vivid/v3/assets/media/anime-card/img-7.png" },
  { id: 10, name: "Naruto", image: "https://uiparadox.co.uk/templates/vivid/v3/assets/media/anime-card/img-8.png" },
  { id: 11, name: "Naruto", image: "https://uiparadox.co.uk/templates/vivid/v3/assets/media/anime-card/img-25.png" },
  { id: 12, name: "Naruto", image: "https://uiparadox.co.uk/templates/vivid/v3/assets/media/anime-card/img-23.png" },
  { id: 13, name: "Naruto", image: "https://uiparadox.co.uk/templates/vivid/v3/assets/media/anime-card/img-22.png" },
  { id: 14, name: "Naruto", image: "https://uiparadox.co.uk/templates/vivid/v3/assets/media/anime-card/img-8.png" },
  { id: 15, name: "Naruto", image: "https://uiparadox.co.uk/templates/vivid/v3/assets/media/anime-card/img-8.png" },
  { id: 16, name: "Naruto", image: "https://uiparadox.co.uk/templates/vivid/v3/assets/media/anime-card/img-8.png" }
];

const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15; // Her sayfada gösterilecek öğe sayısı 

  // Toplam sayfa sayısını hesapla
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Şu anki sayfanın verilerini al
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Sayfa değiştirme fonksiyonu
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <section id="shows">
      <div className="shows-filterbar">
        <div className="filter-up">
          <h2>Filter</h2>
          <div className="filter-btns">
            <button>All</button>
            <button>A</button>
            <button>B</button>
            <button>C</button>
            <button>D</button>
            <button>E</button>
            <button>F</button>
            <button>G</button>
            <button>D</button>
            <button>E</button>
            <button>F</button>
            <button>G</button>
            <button>H</button>
            <button>I</button>
            <button>J</button>
            <button>K</button>
            <button>L</button>
            <button>N</button>
            <button>O</button>
            <button>P</button>
            <button>Q</button>
            <button>R</button>
            <button>S</button>
            <button>T</button>
            <button>U</button>
            <button>V</button>
            <button>W</button>
            <button>1-9</button>
          </div>
          <div className="filter-selections">
          <select name="Genre" id="">
            <option value="Genre">Genre</option>
          </select>
          <select name="Genre" id="">
            <option value="Genre">Genre</option>
          </select>
          <select name="Genre" id="">
            <option value="Genre">Genre</option>
          </select>
          <select name="Genre" id="">
            <option value="Genre">Genre</option>
          </select>
          </div>
          <button className="filterer">Filter <CiFilter /></button>
        </div>
        <div className="filter-low">
          <h2>Top Rated Shows</h2>
          <p>Based on your filter</p>
          <div className="filter-low-cards">
            <div className="flc-card">
              <img srcSet="https://uiparadox.co.uk/templates/vivid/v3/assets/media/anime-card/img-27.png" alt="" />
              <div className="flc-card-txt">
                <div className="flc-txt-up">
                  <h4>The Daily Life of the Immortal King</h4>
                  <p>Season 3</p>
                </div>
                <h6>Action | 2021 | EP-24 | <FaStar /> 8.5</h6>
              </div>
            </div>
            <div className="flc-card">
              <img srcSet="https://uiparadox.co.uk/templates/vivid/v3/assets/media/anime-card/img-28.png" alt="" />
              <div className="flc-card-txt">
                <div className="flc-txt-up">
                  <h4>The Daily Life of the Immortal King</h4>
                  <p>Season 3</p>
                </div>
                <h6>Action | 2021 | EP-24 | <FaStar /> 8.5</h6>
              </div>
            </div>
            <div className="flc-card">
              <img srcSet="https://uiparadox.co.uk/templates/vivid/v3/assets/media/anime-card/img-29.png" alt="" />
              <div className="flc-card-txt">
                <div className="flc-txt-up">
                  <h4>The Daily Life of the Immortal King</h4>
                  <p>Season 3</p>
                </div>
                <h6>Action | 2021 | EP-24 | <FaStar /> 8.5</h6>
              </div>
            </div>
            <div className="flc-card">
              <img srcSet="https://uiparadox.co.uk/templates/vivid/v3/assets/media/anime-card/img-30.png" alt="" />
              <div className="flc-card-txt">
                <div className="flc-txt-up">
                  <h4>The Daily Life of the Immortal King</h4>
                  <p>Season 3</p>
                </div>
                <h6>Action | 2021 | EP-24 | <FaStar /> 8.5</h6>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="pagination-container">
        <h2 className="font-bold">115 items</h2>
        <div className="anime-list">
          {currentItems.map((item) => (
            <Card image={item.image} name={item.name} category='Action' year='2021' episode='24' rating='8.5' />
          ))}
        </div>

        {/* Sayfa Numaraları */}
        <div className="pagination">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <FaChevronLeft/>
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={currentPage === index + 1 ? "active" : ""}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
           <FaChevronRight/>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Pagination;
