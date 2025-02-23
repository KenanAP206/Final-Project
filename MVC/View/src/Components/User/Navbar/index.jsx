import React,{useState,useEffect, useRef} from 'react'
import { NavLink } from "react-router"
import './Navbar.css'
import { FaSearch } from "react-icons/fa";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaStar } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function index() {
  let [value, setValue] = useState('');
  let [shows, setShows] = useState([]);
  let [isOpen, setisOpen] = useState(false)
  let [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const profileBarRef = useRef(null);
  const token = localStorage.getItem('token');
  const tokenParts = token ? token.split('.') : [];
  let payload = {};
  

  
  if (tokenParts.length === 3) {
    try {
      const base64Url = tokenParts[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = JSON.parse(atob(base64));
      payload = jsonPayload;
    } catch (error) {
      console.error("Token decoding error:", error);
      console.error("Base64 URL:", base64Url);
    }
  } else {
    console.error("Invalid token format:", token);
  }
  
  const role = payload?.role || null;
  const navigate = useNavigate(); 

  function handleLogout(e){
    e.preventDefault()
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
    localStorage.removeItem('permissions');  
    navigate('/login')
  }
  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await axios.get('http://localhost:3000/shows');
        setShows(response.data.data);        
      } catch (error) {
        console.error("Veri alma hatası:", error);
      }
    };
    fetchShows();
  }, []);

  const filteredShows = shows.filter(show => 
    show.name.toLowerCase().includes(value.toLowerCase())
  );

  const toggleProfileBar = () => {
    setisOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (profileBarRef.current && !profileBarRef.current.contains(event.target)) {
      setisOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <header>
      <nav className='navbarim'>
        <div className="logo"> <NavLink to='/'><img alt="logo" srcset="/src/assets/Images/logo2.png" />  </NavLink></div>
        <div className="nav-mid">
          <NavLink to='/' style={({ isActive }) => ({ color: isActive ? '#AC01FB' : 'white' })}>Home</NavLink>
          <NavLink to='/allshows' style={({ isActive }) => ({ color: isActive ? '#AC01FB' : 'white' })}>Shows</NavLink>
          <a href="#trailer">Trailers</a>
          <NavLink to='/payment' style={({ isActive }) => ({ color: isActive ? '#AC01FB' : 'white' })}>Premium</NavLink>
        </div>
        <div className="nav-r">
          
          <div className="searcher">
            <button>
            {(value.length > 0) ? (
              <IoMdClose onClick={()=>setValue('')}/>
            ):
            ( <FaSearch />)}
              </button>

            <input 
              onChange={(e) => setValue(e.target.value)} 
              placeholder='Search...' 
              type="text" 
              value={value}
            />
          {(value.length > 0) ? (
              <div className="searcher-box">
              {filteredShows.slice(0, 4).map(show => (
                 <NavLink 
                 to={show.type === 'Movie' ? `/movie/${show._id}` : `/series/${show._id}`}
                 key={show._id}>
                <div className="flc-card" key={show.id}>
                  <img srcSet={show.image} alt={show.title} />
                  <div className="flc-card-txt">
                    <div className="flc-txt-up">
                      <h4>{show.name}</h4>
                      <p>{show.duration}</p>
                    </div>
                    <h6>{show.category} | {show.year} | <FaStar /> {show.rating}</h6>
                  </div>
                </div>
                </NavLink>
              ))}
              </div>
          ) : (null)}
          </div>


         <div className="profile-btn">
         <FaUser className='bg-white user-btn' onClick={toggleProfileBar} />
       {(token) ?
         ((role=='admin')
         ?(isOpen && (
          <div className="profile-bar" ref={profileBarRef}>
            <NavLink to='/admin'>Admin</NavLink>
            <NavLink to='/profile'>Profile</NavLink>
            <NavLink onClick={(e)=>{handleLogout(e)}} className='pb-l'>Log out</NavLink>
          </div>
        )):(isOpen &&( <div className="profile-bar" ref={profileBarRef}>
          <NavLink to='/profile'>Profile</NavLink>
          <NavLink onClick={(e)=>{handleLogout(e)}} className='pb-l'>Log out</NavLink>
        </div>)))  
         :
         (isOpen && (
           <div className="profile-bar" ref={profileBarRef}>
             <NavLink to='/login'>Login</NavLink>
             <NavLink className='pb-log' to='/register'>Register</NavLink>
           </div>
         ))
        }
       

         </div>
          <GiHamburgerMenu className='bg-white menu-btn' onClick={toggleSidebar} />
        </div>
      </nav>
      {isSidebarOpen && (
        <>
          <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={toggleSidebar}></div>
          <div className="navsidebar fixed top-0 right-0 w-64 h-full text-white shadow-lg z-50 p-4">
 
            <div className=" p-4">
              <NavLink to='/allshows' className="block py-2 hover:bg-gray-700">All Shows</NavLink>
              <NavLink to='/profile' className="block py-2 hover:bg-gray-700">Profile</NavLink>
              <NavLink to='/' className="block py-2 hover:bg-gray-700">Home</NavLink>
            </div>
          </div>
        </>
      )}
    </header>
  )
}

export default index
