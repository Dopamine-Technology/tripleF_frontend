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
         <img src={boy} alt="" border="0" height='100%' width='100%' />
        </Col>
      </Row>
    </div>
  );
}

export default BecomeClient;
