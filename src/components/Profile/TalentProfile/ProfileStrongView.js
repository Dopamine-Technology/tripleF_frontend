import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import PercentageLine from './PercentageLine';
import ProgressBar from 'react-bootstrap/ProgressBar';

function ProfileStrongView(){
    const now = 90;
    return(
        
        <div>
        <Card className='profile-card'>
            <p className='strong-p'>Profile completion </p>
            <Row className="align-items-center">
                <Col xs={9} lg={10}>
                    <ProgressBar now={now} className='custom-progress' />
                </Col>
                <Col xs={3} lg={2}>
                    <span className='progressbar-span'>{now}%</span>
                </Col>
            </Row>
        </Card>
    </div>
    )
}

export default ProfileStrongView