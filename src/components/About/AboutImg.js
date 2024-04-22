import React,{useLayoutEffect,useState} from 'react';
import boy from '../../assets/imgs/boy_play.png';
import football from '../../assets/imgs/football.png';
import image1 from '../../assets/imgs/image1Responsive.webp';
import image2 from '../../assets/imgs/image2Responsive.webp';
import { Container,Row,Col } from 'react-bootstrap';


const AboutImg = () => {
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

    return ( <div className="image-container">
      <Row className='row-responsive'>
     <Col>
    <img src={isSmallScreen?image1:football} alt="Image 2" className="me-1 image2" />
    </Col>
    <Col className='p-0'>
    <img src={isSmallScreen?image2:boy} alt="Image 1" className="image1" />
    </Col>
    </Row>

  </div>);
}
 
export default AboutImg;