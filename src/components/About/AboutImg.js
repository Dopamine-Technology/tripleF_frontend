import React from 'react';
import boy from '../../assets/imgs/boy_play.png';
import football from '../../assets/imgs/football.png';
import { Container,Row,Col } from 'react-bootstrap';


const AboutImg = () => {
    return ( <div className="image-container">
      <Row>
        <Col>
    <img src={football} alt="Image 2" className="me-1 image2" />
    </Col>
    <Col className='p-0'>
    <img src={boy} alt="Image 1" className="image1" />
    </Col>
    </Row>

  </div>);
}
 
export default AboutImg;