import React from 'react'
import Navbar from '../components/Navbar'
import Hero  from '../components/Hero'
import PorpularSearches from '../components/PorpularSearches'
import Footer from '../components/Footer'
const Home = () => {
  return (
    <div>
              <Navbar/>
               <Hero />
               <PorpularSearches />
               <Footer/>
    </div>
  )
}

export default Home
