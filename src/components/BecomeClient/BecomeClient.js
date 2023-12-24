import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ContactForm from './ContactForm';
import './style.css';
import boy from '../../assets/imgs/boy.png'


const BecomeClient = () => {
  return (
    <div className="becomeClient-div">
      <Row>
        <Col md={6}>
          <ContactForm />
        </Col>
        <Col md={6}>
         {/* <img src={boy} alt="" border="0" height='82.6%' width='100%' /> */}
         <img src={boy} alt="" border="0" height='89%' width='100%' className='contactForm-img' />
        </Col>
      </Row>
    </div>
  );
}

export default BecomeClient;
