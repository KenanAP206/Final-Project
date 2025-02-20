import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import "./Shows.css";
import Card from '../../../Components/User/Card1'
import { CiFilter } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IoChevronDown } from "react-icons/io5";
import LoadingPage from '../../../Components/User/Loading/index'
import axios from 'axios';
import { NavLink } from "react-router-dom";
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

const Pagination = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [shows, setShows] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLetter, setSelectedLetter] = useState(null);
  const itemsPerPage = 15;

  // URL'den kategori parametresini al ve state'e kaydet
  const getInitialCategory = () => {
    const params = new URLSearchParams(location.search);
    return params.get('category');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/shows');
        const data = response.data.data;
        setShows(data);
        
        const categoryFromUrl = getInitialCategory();
        if (categoryFromUrl) {
          const filtered = data.filter(item => item.category === categoryFromUrl);
          setFilteredData(filtered);
        } else {
          setFilteredData(data);
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [location.search]);

  const CustomFilterDropdown = () => {
    const [filters, setFilters] = useState({
      category: getInitialCategory() ? [getInitialCategory()] : [],
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
      setFilters(prev => {
        const updatedFilters = {
          ...prev,
          [category]: prev[category].includes(value)
            ? prev[category].filter(item => item !== value)
            : [...prev[category], value]
        };
        return updatedFilters;
      });
    };

    const handleFilterApply = () => {
      let newFilteredData = shows;

      // Önce harf filtresi uygula
      if (selectedLetter) {
        newFilteredData = newFilteredData.filter(item => 
          item.name.charAt(0).toUpperCase() === selectedLetter
        );
      }

      // Sonra diğer filtreleri uygula
      newFilteredData = newFilteredData.filter(item => {
        const categoryMatch = filters.category.length === 0 || filters.category.includes(item.category);
        const typeMatch = filters.type.length === 0 || filters.type.includes(item.type);
        const statusMatch = filters.status.length === 0 || filters.status.includes(item.status);
        const premieredMatch = filters.premiered.length === 0 || filters.premiered.includes(item.premiered);

        return categoryMatch && typeMatch && statusMatch && premieredMatch;
      });

      // URL'i güncelle (sadece kategori için)
      if (filters.category.length > 0) {
        navigate(`/allshows?category=${filters.category[0]}`);
      } else {
        navigate('/allshows');
      }

      setFilteredData(newFilteredData);
      setCurrentPage(1);
    };

    const handleLetterClick = (letter) => {
      setSelectedLetter(letter);
      const letterFiltered = shows.filter(item => 
        item.name.charAt(0).toUpperCase() === letter
      );
      setFilteredData(letterFiltered);
      setCurrentPage(1);
    };

    const handleAllClick = () => {
      setSelectedLetter(null);
      setFilters({
        category: [],
        type: [],
        status: [],
        premiered: []
      });
      setFilteredData(shows);
      setCurrentPage(1);
      navigate('/allshows');
    };

    const DropdownMenu = ({ category, options }) => {
      const [isOpen, setIsOpen] = useState(false);
      const refs = useRef([]);

      const { refs: floatingRefs, floatingStyles, context } = useFloating({
        open: isOpen,
        onOpenChange: setIsOpen,
        middleware: [offset(4), flip({ padding: 8 }), shift()],
        whileElementsMounted: autoUpdate
      });

      const click = useClick(context);
      const dismiss = useDismiss(context);
      const role = useRole(context);
      const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss, role]);
      const headingId = useId();

      return (
        <div>
          <button
            ref={floatingRefs.setReference}
            {...getReferenceProps()}
            className="select"
          >
            <span className="capitalize">{category} <IoChevronDown/></span>
            {filters[category].length > 0 && (
              <span className="selectedcount">
                {filters[category].length}
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

    if (isLoading) return <LoadingPage/>;

    return (
      <div className="shows-filterbar">
        <div className="filter-up">
          <h2>Filter</h2>
          <div className="filter-btns">
            <button onClick={handleAllClick}>All</button>
            {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'].map(letter => (
              <button 
                key={letter} 
                onClick={() => handleLetterClick(letter)}
                className={selectedLetter === letter ? 'active' : ''}
              >
                {letter}
              </button>
            ))}
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

          <button className="filterer" onClick={handleFilterApply}>
            Filter <CiFilter />
          </button>
        </div>

        <div className="filter-low">
          <h2>Top Rated Shows</h2>
          <p>Based on your filter</p>
          <div className="filter-low-cards">
            {filteredData
              .sort((a, b) => b.rating - a.rating)
              .slice(0, 4)
              .map((item) => (
                <NavLink 
                  to={item.type === 'Movie' ? `/movie/${item._id}` : `/series/${item._id}`}
                  key={item._id}
                >
                  <div className="flc-card">
                    <img src={item.image} alt={item.name} />
                    <div className="flc-card-txt">
                      <div className="flc-txt-up">
                        <h4>{item.name}</h4>
                        <p>{item.season}</p>
                      </div>
                      <h6>
                        {item.category} | {item.year} | EP-{item.episode} | <FaStar /> {item.rating}
                      </h6>
                    </div>
                  </div>
                </NavLink>
              ))}
          </div>
        </div>
      </div>
    );
  };

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentItems = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <section id="shows">
      <CustomFilterDropdown />
      <div className="pagination-container">
        <h2 className="font-bold">{filteredData.length} items</h2>
        <div className="anime-list">
          {currentItems.map((item) => (
            <Card
              key={item._id}
              image={item.image}
              name={item.name}
              category={item.category}
              type={item.type}
              year={item.year}
              episode={item.episode}
              rating={item.rating}
              id={item._id}
            />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="pagination">
            <button
              onClick={() => setCurrentPage(prev => prev - 1)}
              disabled={currentPage === 1}
            >
              <FaChevronLeft/>
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={currentPage === index + 1 ? "active" : ""}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(prev => prev + 1)}
              disabled={currentPage === totalPages}
            >
              <FaChevronRight/>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Pagination;