import React, { useState, useRef, useEffect } from "react";
import "./Shows.css";
import Card from '../../../Components/User/Card1'
import { CiFilter } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  FloatingFocusManager,
  useId
} from '@floating-ui/react';
import { IoChevronDown } from "react-icons/io5";
import LoadingPage from '../../../Components/User/Loading/index'
import axios from 'axios'

const data = [
  { id: 1, genre:'Action', type:'Movie',name: "Your Name", image: "https://uiparadox.co.uk/templates/vivid/v3/assets/media/anime-card/img-15.png" },
  { id: 2, genre:'Action', type:'Movie', name: "Jujutsu Kaisen", image: "https://uiparadox.co.uk/templates/vivid/v3/assets/media/anime-card/img-14.png" },
  { id: 3, genre:'Adventure', type:'Movie' ,name: "Chainsaw Man", image: "https://uiparadox.co.uk/templates/vivid/v3/assets/media/anime-card/img-13.png" },
  { id: 4, genre:'Fantasy', type:'TV Series',name: "One Piece", image: "https://uiparadox.co.uk/templates/vivid/v3/assets/media/anime-card/img-12.png" },
  { id: 5, genre:'Drama', type:'OVA',name: "86 Eighty-Six", image: "https://uiparadox.co.uk/templates/vivid/v3/assets/media/anime-card/img-11.png" },
  { id: 6, genre:'Drama', type:'ONA',name: "Darling in the Franxx", image: "https://uiparadox.co.uk/templates/vivid/v3/assets/media/anime-card/img-10.png" },
  { id: 7, genre:'Action', type:'TV Series',name: "Arcane", image: "https://uiparadox.co.uk/templates/vivid/v3/assets/media/anime-card/img-9.png" },
  { id: 8, genre:'Action', type:'TV Series',name: "Attack on Titan", image: "https://uiparadox.co.uk/templates/vivid/v3/assets/media/anime-card/img-6.png" },
  { id: 9, genre:'Action', type:'TV Series',name: "Demon Slayer", image: "https://uiparadox.co.uk/templates/vivid/v3/assets/media/anime-card/img-7.png" },
  { id: 10, genre:'Action', type:'TV Series',name: "Naruto", image: "https://uiparadox.co.uk/templates/vivid/v3/assets/media/anime-card/img-8.png" },
  { id: 11, genre:'Mystery', type:'TV Series',name: "Naruto", image: "https://uiparadox.co.uk/templates/vivid/v3/assets/media/anime-card/img-25.png" },
  { id: 12, genre:'Action', type:'Special',name: "Naruto", image: "https://uiparadox.co.uk/templates/vivid/v3/assets/media/anime-card/img-23.png" },
  { id: 13, genre:'Action', type:'OVA',name: "Naruto", image: "https://uiparadox.co.uk/templates/vivid/v3/assets/media/anime-card/img-22.png" },
  { id: 14, genre:'Action', type:'TV Series',name: "Naruto", image: "https://uiparadox.co.uk/templates/vivid/v3/assets/media/anime-card/img-8.png" },
  { id: 15, genre:'Action', type:'TV Series',name: "Naruto", image: "https://uiparadox.co.uk/templates/vivid/v3/assets/media/anime-card/img-8.png" },
  { id: 16, genre:'Action', type:'TV Series',name: "Naruto", image: "https://uiparadox.co.uk/templates/vivid/v3/assets/media/anime-card/img-8.png" }
];

const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15; // Her sayfada gösterilecek öğe sayısı 
  const [filteredData, setFilteredData] = useState(data); // Add state for filtered data

  // Toplam sayfa sayısını hesapla
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Şu anki sayfanın verilerini al
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Sayfa değiştirme fonksiyonu
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // New CustomFilterDropdown component
  const CustomFilterDropdown = () => {
    const [openCategory, setOpenCategory] = useState(null);
    const [filters, setFilters] = useState({
      genre: [],
      type: [],
      status: [],
      season: []
    });
    

    const filterOptions = {
      genre: ['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Mystery'],
      type: ['TV Series', 'Movie', 'OVA', 'Special', 'ONA'],
      status: ['Airing', 'Completed', 'Upcoming'],
      season: ['Winter', 'Spring', 'Summer', 'Fall']
    };

    const handleFilterChange = (category, value) => {
      setFilters(prev => ({
        ...prev,
        [category]: prev[category].includes(value)
          ? prev[category].filter(item => item !== value)
          : [...prev[category], value]
      }));
    };

    const handleFilterApply = () => {
      const { genre, type, status, season } = filters; // Tüm seçili filtreleri al
      const newFilteredData = data.filter(item => 
        (genre.length === 0 || genre.includes(item.genre)) &&
        (type.length === 0 || type.includes(item.type)) &&
        (status.length === 0 || status.includes(item.status)) &&
        (season.length === 0 || season.includes(item.season))
      );
      setFilteredData(newFilteredData); // Filtrelenmiş veriyi güncelle
      setCurrentPage(1); // İlk sayfaya sıfırla
    };

    const DropdownMenu = ({ category, options }) => {
      const [isOpen, setIsOpen] = useState(false);
      const refs = useRef([]);

      const { refs: floatingRefs, floatingStyles, context } = useFloating({
        open: isOpen,
        onOpenChange: setIsOpen,
        middleware: [
          offset(4),
          flip({ padding: 8 }),
          shift()
        ],
        whileElementsMounted: autoUpdate
      });

      const click = useClick(context);
      const dismiss = useDismiss(context);
      const role = useRole(context);

      const { getReferenceProps, getFloatingProps } = useInteractions([
        click,
        dismiss,
        role
      ]);

      const headingId = useId();

      const selectedCount = filters[category].length;

      return (
        <div>
          <button
            ref={floatingRefs.setReference}
            {...getReferenceProps()}
            className="select"
          >
            <span className="capitalize">{category} <IoChevronDown/></span>
            {selectedCount > 0 && (
              <span className="selectedcount">
                {selectedCount}
              </span>
            )}
          </button>

          {isOpen && (
            <FloatingFocusManager context={context} modal={false}>
              <div
                ref={floatingRefs.setFloating}
                style={floatingStyles}
                {...getFloatingProps()}
                className="checkboxdiv"
              >
                <div className="checkboxdiv-header">
                  {category}
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {options.map((option, index) => (
                    <label
                      key={option}
                      ref={el => refs.current[index] = el}
                      className="flex items-center gap-2 px-2 py-1.5 hover:bg-gray-700 rounded cursor-pointer text-sm"
                    >
                      <input
                        type="checkbox"
                        checked={filters[category].includes(option)}
                        onChange={() => handleFilterChange(category, option)}
                        className="rounded border-gray-600"
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            </FloatingFocusManager>
          )}
        </div>
      );
    };

   
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:3000/shows'); 
          setShows(response.data); 
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          setIsLoading(false); 
        }
      };

      fetchData();
    }, []); 
    const [isLoading, setIsLoading] = useState(true);
    const [shows, setShows] = useState([]); 

    if (isLoading) return <div><LoadingPage/></div>;



    return (
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
        {Object.entries(filterOptions).map(([category, options]) => (
          <DropdownMenu
            key={category}
            category={category}
            options={options}
          />
        ))}

      </div>

    <button className="filterer" onClick={handleFilterApply}>Filter <CiFilter /></button>
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
    );
  };


  return (
    <section id="shows">
    
      <CustomFilterDropdown />



      <div className="pagination-container">
        <h2 className="font-bold">115 items</h2>
        <div className="anime-list">
          {currentItems.map((item) => (
            <Card image={item.image} name={item.name} category={item.genre} year={item.type} episode='24' rating='8.5' />
            
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
