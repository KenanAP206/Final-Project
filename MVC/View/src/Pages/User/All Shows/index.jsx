import React, { useState, useRef, useEffect, useContext } from "react";
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
import { showContext } from '../../../Context/ShowContext';

const Pagination = () => {
  const { shows, loading } = useContext(showContext);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15; // Her sayfada gösterilecek öğe sayısı 
  const [filteredData, setFilteredData] = useState(shows); // Initialize with shows from context

  // Toplam sayfa sayısını hesapla
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Şu anki sayfanın verilerini al
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Sayfa değiştirme fonksiyonu
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Update the effect to set filteredData when shows change
  useEffect(() => {
    setFilteredData(shows);
    setCurrentPage(1); // Reset to first page when shows change
  }, [shows]);

  // New CustomFilterDropdown component
  const CustomFilterDropdown = () => {
    const [openCategory, setOpenCategory] = useState(null);
    const [filters, setFilters] = useState({
      category: [],
      type: [],
      status: [],
      premiered: []
    });
    

    const filterOptions = {
      category: ['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Mystery'],
      type: ['TV Series', 'Movie', 'OVA', 'Special', 'ONA'],
      status: ['Airing', 'Completed', 'Upcoming'],
      premiered: ['Winter', 'Spring', 'Summer', 'Fall']
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
      const { category, type, status, premiered } = filters; // Tüm seçili filtreleri al
      const newFilteredData = filteredData.filter(item => 
        (category.length === 0 || category.includes(item.category)) &&
        (type.length === 0 || type.includes(item.type)) &&
        (status.length === 0 || status.includes(item.status)) &&
        (premiered.length === 0 || premiered.includes(item.premiered))
      );

      // Eğer hiçbir filtre seçilmemişse, eski verileri geri yükle
      if (category.length === 0 && type.length === 0 && status.length === 0 && premiered.length === 0) {
        setFilteredData(shows); // Eski verileri geri yükle
      } else if (newFilteredData.length === 0) {
        setFilteredData(shows); // Eski verileri geri yükle
      } else {
        setFilteredData(newFilteredData); // Filtrelenmiş veriyi güncelle
      }
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

    if (loading) return <div><LoadingPage/></div>;

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
            <Card key={item.name} image={item.image} name={item.name} category={item.category} type={item.type} year={item.year} episode={item.episode} rating={item.rating} id={item._id} />
            
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
