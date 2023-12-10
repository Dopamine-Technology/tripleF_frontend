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
      content: "Some quick example text for Step One."
    },
    {
      stepNum:'02',
      step: 'Two',
      content: "Some quick example text for Step Two."
    },
    {
      stepNum:'03',
      step: 'Three',
      content: "Some quick example text for Step Three."
    },
  ];

  return (
    <div className='steps-div'>
   
      <Row>
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
          <div className='mt-5'>
            <h1 className='text-white fw-bold'>How it works</h1>
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
