import React, { useState, useEffect,useLayoutEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import ClientTalk from './ClientTalk';
import ClientImg from './ClientImg';
import './style.css';
import ClientImgResponsive from './ClientImgResponsive';

const OurClients = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useLayoutEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isSmallScreen = windowWidth <= 600;

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

  return (
    <div className='OurClientsWhole' id='Testimonial'>
      <Row>
        <Col><ClientTalk selectedImageIndex={selectedImageIndex} setSelectedImageIndex={setSelectedImageIndex} /></Col>
        {isSmallScreen?
        <Col><ClientImgResponsive selectedImageIndex={selectedImageIndex} onImageClick={handleImageChange} isSmallScreen={isSmallScreen} /></Col>:
        <Col><ClientImg selectedImageIndex={selectedImageIndex} onImageClick={handleImageChange} isSmallScreen={isSmallScreen} /></Col>
        }
        
      </Row>
    </div>
  );
}

export default OurClients;
