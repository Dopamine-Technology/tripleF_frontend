import React,{useContext,useState,useLayoutEffect,useEffect} from 'react';
import RegisterButton from './RegisterButton';
import {Row,Col} from 'react-bootstrap';
import { PermDataContext } from '../PermContext/PermData.context';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';

const HeaderDesc = ({translatedText}) => {

  const { permData } = useContext(PermDataContext);
  const isViewingTalent = permData?.find(item => item.name === 'view_talent' && item.value === true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useLayoutEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
    const isSmallScreen = windowWidth <= 600;
  
    const currentLanguage = Cookies.get('language') || 'en';
    const [direction, setDirection] = useState('ltr');
    const [t,i18n]=useTranslation();

    useEffect(() => {
      // Change direction based on the selected language
      if (currentLanguage === 'ar') {
        setDirection('rtl');
      } 
      else{
        setDirection('ltr')
      }
    }, [currentLanguage]);
  return (
    <div className='header-div' style={{direction:direction}} >
      <Row >
        <Col md={6} className={isSmallScreen ? '':'mt-5'} >
          <p className='header-h1'>
            {/* What We Do In Life Echoes In Eternity */}
            {t('header.title')}
          </p>
          <p className='mt-4 mb-4 header-p2' >
          {t('header.subTitle')}
          </p>
          <div className='register-responsive-btn'>
          <RegisterButton />
          </div>
        </Col>
      </Row>
    </div>
  )
}
 
export default HeaderDesc;