import React, { useState, useEffect } from 'react'
import Hero from '../../../Components/User/Home/Hero'
import Categories from '../../../Components/User/Home/Categories'
import Trend from '../../../Components/User/Home/Trend'
import Continue from '../../../Components/User/Home/Continue'
import Recent from '../../../Components/User/Home/Recent'
import Trailer from '../../../Components/User/Home/Trailer'
import Top from '../../../Components/User/Home/Top'
import LoadingPage from '../../../Components/User/Loading/index'
import axios from 'axios'

function index() {
  const [isLoading, setIsLoading] = useState(true);
  const [shows, setShows] = useState([]); 

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
  
  if (isLoading) return <div><LoadingPage/></div>;


  return (
    <main>
      {isLoading ? <LoadingPage /> : (
        <>
          <Hero/>
          <Categories/>
          <Trend/>
          <Continue/>
          <Recent/>
          <Trailer/>
          <Top/>
        </>
      )}
    </main>
  )
}

export default index
