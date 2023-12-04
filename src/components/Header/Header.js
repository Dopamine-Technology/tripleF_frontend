import React from 'react';
import NavBar from './Navbar';
import {Row,Col} from 'react-bootstrap';
import HeaderDesc from './HeaderDesc';
import HeaderImg from './HeaderImg';
import './style.css';

const Header = () => {
    return ( <div className='bg-black'>
        <Row>
        <NavBar />
        </Row>
        <Row className='mt-5'>
            <Col md={8}><HeaderDesc /></Col>
            <Col md={4}><HeaderImg /></Col>
        </Row>
        
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="white" stroke="white" fill-opacity="1" d="M0,224L120,208C240,192,480,160,720,144C960,128,1200,128,1320,128L1440,128L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"></path></svg>
    </div> );
}
 
export default Header;