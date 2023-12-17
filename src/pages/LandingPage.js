import React,{useEffect,useState} from 'react'
import Header from '../components/Header/Header'
import About from '../components/About/About';
import Steps from '../components/Steps/Steps';
import WhosFor from '../components/WhosFor/WhosFor';
import BecomeClient from '../components/BecomeClient/BecomeClient';
import News from '../components/News/News';
import Footer from '../components/Footer/Footer';
import OurClients from '../components/OurClients/OurClients';
import Cookies from 'js-cookie';
import UseContentFetcher from '../components/Translation/ContentFetcher';


function LandingPage() {
  const content = UseContentFetcher('landing');

  return (
    <div style={{overflowY:'hidden'}}>
    <Header content={content} />
    <About id="about" content={content}/>
    <WhosFor id="who" content={content} />
    <Steps content={content} />
    <OurClients content={content} />
    <BecomeClient content={content} />
    <News content={content} />
    <Footer content={content} />

    </div>
  )
}

export default LandingPage