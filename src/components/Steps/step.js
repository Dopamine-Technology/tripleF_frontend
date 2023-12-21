import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Step = ({ step, content ,stepNum}) => {
  return (
    <Card style={{ width: '27rem', borderRadius: '10px' }}>
      <Card.Body>
        <Row>
          {/* First Column for Step Number */}
          <Col xs={2} className="text-center">
            <h4 style={{color:"#356255"}}>{stepNum}</h4>
          </Col>
          {/* Second Column for Step Number and Description */}
          <Col xs={10}>
            <Row>
              {/* Step Number Again */}
              <Col xs={12} className="mb-2">
                <h5>Step {step}</h5>
              </Col>
              {/* Description */}
              <Col xs={12}>
                <p>{content}</p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default Step;
