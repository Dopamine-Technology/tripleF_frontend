import React, { useState, useEffect,useLayoutEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import ClientTalk from './ClientTalk';
import ClientImg from './ClientImg';
import './style.css';
import ClientImgResponsive from './ClientImgResponsive';
import Cookies from 'js-cookie';
import { useScreenWidth } from '../ScreenWidthContext/ScreenWidth.context';

const OurClients = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { windowWidth, isSmallScreen, isTabletScreen, isProScreen } = useScreenWidth();
  const currentLanguage = Cookies.get('language') || 'en';
  const [direction, setDirection] = useState('ltr');


  useEffect(() => {
    const interval = setInterval(() => {
      const newIndex = (selectedImageIndex + 1) % 6; 
      setSelectedImageIndex(newIndex);
    }, 30000); 

    return () => clearInterval(interval);
  }, [selectedImageIndex]);

  const handleImageChange = (index) => {
    setSelectedImageIndex(index);
   
  };
  useEffect(() => {
    // Change direction based on the selected language
    if (currentLanguage === 'ar') {
      setDirection('rtl');
    } 
    else{
      setDirection('ltr')
    }
  }, [currentLanguage]);

  return (
    <div className='OurClientsWhole' id='Testimonial' style={{direction:'ltr'}}>
      <Row>
        <Col><ClientTalk selectedImageIndex={selectedImageIndex} setSelectedImageIndex={setSelectedImageIndex} /></Col>
        {/* {isSmallScreen?
        <Col><ClientImgResponsive selectedImageIndex={selectedImageIndex} onImageClick={handleImageChange} isSmallScreen={isSmallScreen} /></Col>:
        <Col><ClientImg selectedImageIndex={selectedImageIndex} onImageClick={handleImageChange} isSmallScreen={isSmallScreen} /></Col>
        } */}
        
      </Row>
    </div>
  );
}

export default OurClients;
