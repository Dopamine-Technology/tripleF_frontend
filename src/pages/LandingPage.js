import React from 'react'
import Header from '../components/Header/Header'
import About from '../components/About/About';
import Steps from '../components/Steps/Steps';
import WhosFor from '../components/WhosFor/WhosFor';
import BecomeClient from '../components/BecomeClient/BecomeClient';
import News from '../components/News/News';
import Footer from '../components/Footer/Footer';
import OurClients from '../components/OurClients/OurClients';

function LandingPage() {
  return (
    <div>
    <Header />
    <About />
    <WhosFor />
    <Steps />
    <OurClients />
    <BecomeClient />
    <News />
    <Footer />
    </div>
  )
}

export default LandingPage