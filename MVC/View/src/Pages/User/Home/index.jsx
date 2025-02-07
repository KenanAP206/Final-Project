import React from 'react'
import Hero from '../../../Components/User/Home/Hero'
import Categories from '../../../Components/User/Home/Categories'
import Trend from '../../../Components/User/Home/Trend'
import Continue from '../../../Components/User/Home/Continue'
import Recent from '../../../Components/User/Home/Recent'
import Trailer from '../../../Components/User/Home/Trailer'
import Top from '../../../Components/User/Home/Top'
function index() {
  return (
    <main>
      <Hero/>
      <Categories/>
      <Trend/>
      <Continue/>
      <Recent/>
      <Trailer/>
      <Top/>
    </main>
  )
}

export default index
