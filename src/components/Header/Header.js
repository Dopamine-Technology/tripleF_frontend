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

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
   

    useLayoutEffect(() => {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
    
      const isSmallScreen = windowWidth <= 600;
      const isTabletScreen = windowWidth > 600 && windowWidth <= 820;
  
    return (
        <div className='whole-div'  >
            <div className="background-overlay"  id='homeSection'></div>

            <Row style={{ marginRight: '6rem', position: 'relative', zIndex: 2 }}> 
                <NavBar content={content} />
            </Row>
            <div id="overlay" >
            <Row className='header-row' style={{ position: 'relative', zIndex: 2 }}> 
                <Col md={8}><HeaderDesc  /></Col>
                <Col md={4}><HeaderImg /></Col>
                
            </Row>
            </div>
            {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="white" fill-opacity="1" d="M0,320L120,309.3C240,299,480,277,720,261.3C960,245,1200,235,1320,229.3L1440,224L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"></path></svg>  */}
          
        </div>
    );
}

export default Header;


  