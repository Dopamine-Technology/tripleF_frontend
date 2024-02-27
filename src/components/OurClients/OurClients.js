import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import ClientTalk from './ClientTalk';
import ClientImg from './ClientImg';
import './style.css';

const OurClients = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const newIndex = (selectedImageIndex + 1) % 6; // Assuming there are 6 images
      setSelectedImageIndex(newIndex);
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [selectedImageIndex]);

  return (
    <div className='OurClientsWhole' id='Testimonial'>
      <Row>
        <Col><ClientTalk selectedImageIndex={selectedImageIndex} setSelectedImageIndex={setSelectedImageIndex} /></Col>
        <Col><ClientImg selectedImageIndex={selectedImageIndex} /></Col>
      </Row>
    </div>
  );
}

export default OurClients;
