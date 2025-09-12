import React from 'react'
import Navbar from '../layout/Navbar.jsx'
import Footer from '../layout/Footer.jsx'
import Hero from '../components/landing/Hero.jsx'
import CTA from '../components/landing/CTA.jsx'
import Benefits from '../components/landing/Benifits.jsx'
import Services from '../components/landing/Features.jsx'
import Pricing from '@/components/landing/Pricing.jsx'

const landing = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <Benefits />
      <Pricing/>
      <CTA />
      <Footer />
    </>
  )
}

export default landing