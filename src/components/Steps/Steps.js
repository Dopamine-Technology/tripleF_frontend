import React,{useLayoutEffect,useState} from 'react';
import './style.css';
import Step from './step';
import { Row, Col } from 'react-bootstrap';
import RegisterButton from '../Header/RegisterButton';

const Steps = () => {
  const stepsArray = [
    {
      stepNum:'01',
      step: 'One',
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      stepNum:'02',
      step: 'Two',
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    },
    {
      stepNum:'03',
      step: 'Three',
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
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

  const isSmallScreen = windowWidth <= 360;

  return (
    <div className='steps-div' id='How'>
   <div className="Shape"></div>
      <Row style={{marginTop:'2rem'}}>
        <Col md={6} className="order-md-1 order-2">
          <Row className='mb-3'>
            {stepsArray.map((step, index) => (
              <Col key={index} md={12} style={{ marginLeft: isSmallScreen ? 0 : (index % 2 === 0 ? '5.3rem' : '2.3rem') }}>
                <Step step={step.step} content={step.content} stepNum={step.stepNum} isSmallScreen={isSmallScreen} />
              </Col>
            ))}
          </Row>
        </Col>
        <Col md={6} className="order-md-2 order-1">
          <div className='desc-responsive' >
            <p className='text-white how-h1 mt-5 mb-4' >How it works</p>
            <p style={{color:"white"}} className='mb-5 Lorem-responsive'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
             Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
               Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
               Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
             Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              Duis aute irure.</p>
              <RegisterButton />
          </div>
        </Col>
      </Row>
   
    </div>
  );
}

export default Steps;
