import React from 'react';
import Card from 'react-bootstrap/Card';

const Step = ({step,content}) => {

    return (     <Card style={{ width: '27rem',borderRadius:'20px' ,height:'14rem'}} >
    <Card.Body className='mt-4'>
      <Card.Title>Step {step}</Card.Title>

      <Card.Text>
        {content}
      </Card.Text>
    </Card.Body>
  </Card>
);
}
 
export default Step;