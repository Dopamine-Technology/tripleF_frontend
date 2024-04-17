import React,{useLayoutEffect,useState,useEffect} from 'react';
import './style.css';
import Step from './step';
import { Row, Col } from 'react-bootstrap';
import RegisterButton from '../Header/RegisterButton';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';

const Steps = () => {
  const currentLanguage = Cookies.get('language') || 'en';
    const [direction, setDirection] = useState('ltr');
    const [t,i18n]=useTranslation();

    useEffect(() => {
      if (currentLanguage === 'ar') {
        setDirection('rtl');
      }       else{
        setDirection('ltr')
      }
    }, [currentLanguage]);
    
  const stepsArray = [
    {
      stepNum:'01',
      step: t('howItWorks.cards.0.title'),
      content: t('howItWorks.cards.0.desc')
    },
    {
      stepNum:'02',
      step: t('howItWorks.cards.0.title'),
      content: t('howItWorks.cards.0.desc')
    },
    {
      stepNum:'03',
      step: t('howItWorks.cards.0.title'),
      content: t('howItWorks.cards.0.desc')
    },
  ];
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
    <div className='steps-div' id='How' style={{direction:direction}}>
   <div className="Shape"></div>
      <Row style={{marginTop:'2rem'}}>
        <Col md={6} className="order-md-1 order-2">
          <Row className='mb-3'>
            {stepsArray.map((step, index) => (
              <Col key={index} md={12} style={{ marginLeft: isSmallScreen ? 0 : (index % 2 === 0 ? isTabletScreen?'0.7rem':'5.3rem' : isTabletScreen?'-2rem':'2.3rem') }}>
                <Step step={step.step} content={step.content} stepNum={step.stepNum} isSmallScreen={isSmallScreen}
                 isTabletScreen={isTabletScreen} />
              </Col>
            ))}
          </Row>
        </Col>
        <Col md={6} className="order-md-2 order-1">
          <div className='desc-responsive' >
            <p className='text-white how-h1 mt-5 mb-4' >{t('howItWorks.title')}</p>
            <p style={{color:"white"}} className='mb-5 Lorem-responsive'>{t('howItWorks.desc')}
              </p>
              <RegisterButton />
          </div>
        </Col>
      </Row>
   
    </div>
  );
}

export default Steps;
