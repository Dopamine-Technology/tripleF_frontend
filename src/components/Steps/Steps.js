import React from 'react';
import './style.css';
import Step from './step';
import { Row, Col } from 'react-bootstrap';
import RegisterButton from '../Header/RegisterButton';

const Steps = () => {
  const stepsArray = [
    {
      step: 'One',
      content: "Some quick example text for Step One."
    },
    {
      step: 'Two',
      content: "Some quick example text for Step Two."
    },
    {
      step: 'Three',
      content: "Some quick example text for Step Three."
    },
  ];

  return (
    <div className='steps-div'>
      <Row>
        <Col md={6}>
        
          <Row className='m-5'>
            {stepsArray.map((step, index) => (
              <Col key={index} md={12}>
                <Step step={step.step} content={step.content} />
              </Col>
            ))}
          </Row>
        </Col>
        <Col md={6}>
          <div>
            <h1 className='text-white'>How it works</h1>
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
