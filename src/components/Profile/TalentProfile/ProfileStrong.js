import React,{useState,useContext} from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { FaArrowRight } from "react-icons/fa6";
import PercentageCircle from './PercentageCircle';

const ProfileStrong = ({ img, content, category }) => {
    const [percentage, setPercentage] = useState(80);

    return (
        <Card className='profile-card' >
          <p className='strong-p'>Complete your profile <FaArrowRight color='#213555' /></p>
          <Row>
            <Col>
            <PercentageCircle percentage={percentage} />
            </Col>
            <Col></Col>
          </Row>
        </Card>
    )
}

export default ProfileStrong;
