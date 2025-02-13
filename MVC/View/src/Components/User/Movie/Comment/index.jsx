import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { DiscussionEmbed } from 'disqus-react';
import { FaStar } from "react-icons/fa";
import { IoEye } from "react-icons/io5";
import { IoPlayOutline, IoClose } from "react-icons/io5";
import './Comment.css';

function index() {
  const { id } = useParams();
  const [show, setShow] = useState(null);




 
  const disqusConfig = {
    url: `http://localhost:3000/shows/${id}`, 
    identifier: `show_${id}`, 
    title: show?.name || 'Show Page' 
  };

  return (
    <section className='comments'>
      <div className="comments-section" style={{ padding: '20px' }}>
        <DiscussionEmbed
          shortname='watchmaker'
          config={disqusConfig}
        />
      </div>
    </section>
  );
}

export default index;