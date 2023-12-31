import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ContactForm from './ContactForm';
import './style.css';
import boy from '../../assets/imgs/boy.png'


const BecomeClient = () => {
  return (
    <div className="becomeClient-div">
      <Row>
        <Col md={7}>
          <ContactForm />
        </Col>
        <Col md={5}>
         <img src={boy} alt="" border="0" height='103%' width='100.3%' className='contactForm-img' />
        </Col>
      </Row>
    </div>
  );
}

export default BecomeClient;
