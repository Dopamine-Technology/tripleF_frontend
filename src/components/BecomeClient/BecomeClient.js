import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ContactForm from './ContactForm';
import './style.css';


const BecomeClient = () => {
  return (
    <div className="becomeClient-div">
      <Row>
        <Col md={6}>
          <ContactForm />
        </Col>
        <Col md={6}>
         <img src="" alt="undraw-Contact-us-re-8wjd" border="0" className="img-fluid" />
        </Col>
      </Row>
    </div>
  );
}

export default BecomeClient;
