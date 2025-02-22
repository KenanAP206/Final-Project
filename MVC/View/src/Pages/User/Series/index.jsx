import React,{useState, useEffect}  from 'react'
import Content from '../../../Components/User/Series/Content'
import Comment from '../../../Components/User/Series/Comment'
import Recent from '../../../Components/User/Series/Recent'
import Continue from '../../../Components/User/Home/Continue'
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
    <div>
      <Content/>
      <Recent/>
      <Continue/>
      <Comment/>
    </div>
  )
}

export default index
