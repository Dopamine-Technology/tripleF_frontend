import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Step = ({ step, content ,stepNum}) => {
  return (
    <Card style={{ width: '30rem', borderRadius: '10px' }}>
      <Card.Body>
        <Row>
  
        <Col xs={2} className="text-center" style={{ position: 'relative' }}>

            <h4 style={{ color: "#356255",zIndex:'1',fontSize:'30px' }}>{stepNum}</h4>
            <div style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              backgroundColor: '#84F4D4',
              opacity:'0.305404',
              position: 'absolute',
              top: '0px',
              left: '30%',
              transform: 'translateX(-50%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#356255',
              fontWeight: 'bold',
              zIndex:'2'
            }}>
       
            </div>
          </Col>

          <Col xs={10}>
            <Row>

              <Col xs={12} className="mb-2">
                <h5>Step {step}</h5>
              </Col>
         
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
