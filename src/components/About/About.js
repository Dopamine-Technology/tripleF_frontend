import React from 'react';
import { Row,Col } from 'react-bootstrap';
import AboutDesc from './AboutDesc';
import AboutImg from './AboutImg';
import './style.css';

const About = () => {
    return ( <div>
        <Row>
            <Col><AboutDesc /></Col>
            <Col><AboutImg /></Col>
        </Row>
    </div> );
}
 
export default About;