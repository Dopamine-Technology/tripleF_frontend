import React,{useEffect,useState,useLayoutEffect} from 'react';
import NavBar from './Navbar';
import { Row, Col } from 'react-bootstrap';
import HeaderDesc from './HeaderDesc';
import HeaderImg from './HeaderImg';
import './style.css';
import CombinedNavbars from '../Register/Navbar';
import Cookies from 'js-cookie';

const Header = ({ content }) => {
    
  const currentLanguage = Cookies.get('language') || 'en';
  const [navbarExpanded, setNavbarExpanded] = useState(false);
  

    return (
        <div className='whole-div'  >
            <div className="background-overlay"  id='homeSection'></div>

            <Row style={{ marginRight: '6rem', position: 'relative', zIndex: 2 }}> 
                <NavBar content={content} setNavbarExpanded={setNavbarExpanded} />
            </Row>
            <div id="overlay" >
            <Row className='header-row' style={{ position: 'relative', zIndex: 2 }}> 
            {!navbarExpanded && 
                <Col md={8}><HeaderDesc  /></Col>
            }
                <Col md={4}><HeaderImg /></Col>
                
            </Row>
            </div>
          
        </div>
    );
}

export default Header;


  