import React,{useEffect,useLayoutEffect,useState} from 'react';
import { Row, Col } from 'react-bootstrap';
import ContactForm from './ContactForm';
import './style.css';
import boy from '../../assets/imgs/boy.png'


const BecomeClient = () => {
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
    <div className="becomeClient-div" id='Contact'>
      <Row>
        <Col md={7} >
          <ContactForm isTabletScreen={isTabletScreen} />
        </Col>
        <Col md={5} >
         <img src={boy} alt="" border="0" height={isTabletScreen?'727px':'688px'} width={isTabletScreen?'342px':'526px'} className='contactForm-img' />
        </Col>
      </Row>
    </div>
  );
}

export default BecomeClient;
