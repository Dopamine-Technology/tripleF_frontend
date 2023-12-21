import React from 'react';
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

  return (
    <div className='steps-div'>
   
      <Row style={{marginTop:'2rem'}}>
        <Col md={6}>
        
          <Row className='mb-3'>
            {stepsArray.map((step, index) => (
              <Col key={index} md={12} style={{ marginLeft: index % 2 == 0 ? '5rem' : '2rem' }}>
                <Step step={step.step} content={step.content} stepNum={step.stepNum} />
              </Col>
            ))}
          </Row>
        </Col>
        <Col md={6}>
          <div >
            <h1 className='text-white about-h1' style={{width:'24rem',marginLeft:'-0.4rem'}}>How it works</h1>
            <p style={{width:"30rem",color:"white"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
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
