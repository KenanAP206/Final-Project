import React from 'react'
import './Categories.css'
import {NavLink} from 'react-router'
function index() {

  let catalog = [
    {name:'Action',
      image:'https://uiparadox.co.uk/templates/vivid/v3/assets/media/categories/Img-1.png'
    },
    {name:'Adventure',
      image:'https://uiparadox.co.uk/templates/vivid/v3/assets/media/categories/Img-2.png'},
    {name:'Comedy',
      image:'https://uiparadox.co.uk/templates/vivid/v3/assets/media/categories/Img-3.png'},
    {name:'Drama',
      image:'https://uiparadox.co.uk/templates/vivid/v3/assets/media/categories/Img-4.png'},
    {name:'Fantasy',
      image:'https://uiparadox.co.uk/templates/vivid/v3/assets/media/categories/Img-5.png'},
    {name:'Horror',
      image:'https://uiparadox.co.uk/templates/vivid/v3/assets/media/categories/Img-6.png'},
    {name:'Mystery',
      image:'https://uiparadox.co.uk/templates/vivid/v3/assets/media/categories/Img-7.png'}

  ]
  return (
    <section id='categories'>
        <div className="category-all">
          {catalog.map(item=>(
             <NavLink to={`/allshows?category=${item.name}`}>
             <div className="category-card">
                 <img srcSet={item.image} alt={item.name} />
                 <div className="cc-txt">
                   <h2>{item.name}</h2>
                   <p>850+ Shows</p>
                 </div>
               </div>
             </NavLink >
          ))}
         

          
          </div>  
    </section>
  )
}

export default index
