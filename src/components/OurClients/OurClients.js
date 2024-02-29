import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import ClientTalk from './ClientTalk';
import ClientImg from './ClientImg';
import './style.css';

const OurClients = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

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
        <Col><ClientImg selectedImageIndex={selectedImageIndex} onImageClick={handleImageChange} /></Col>
      </Row>
    </div>
  );
}

export default OurClients;
