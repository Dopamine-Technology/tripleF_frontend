import React,{useEffect,useState} from 'react';
import { Row,Col } from 'react-bootstrap';
import AboutDesc from './AboutDesc';
import AboutImg from './AboutImg';
import './style.css';
import Cookies from 'js-cookie';

const About = () => {
    const currentLanguage = Cookies.get('language') || 'en';
    const [direction, setDirection] = useState('ltr');

    useEffect(() => {
      // Change direction based on the selected language
      if (currentLanguage === 'ar') {
        setDirection('rtl');
      }       else{
        setDirection('ltr')
      }
    }, [currentLanguage]);
    return ( <div >
        <Row className='mt-5' >
            <Col><AboutDesc /></Col>
            <Col><AboutImg /></Col>
        </Row>
    </div> );
}
 
export default About;