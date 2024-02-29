import React, { useState, useContext } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { FaArrowRight, FaCheckCircle, FaCircle } from "react-icons/fa";
import PercentageCircle from './PercentageCircle';
import { FaRegCircle } from "react-icons/fa6";
import { TbCircleCheckFilled } from "react-icons/tb";

const ProfileStrong = ({ img, content, category }) => {
    const [percentage, setPercentage] = useState(80);
    const StrongData = [
        { check: false, value: 'Personal info', svg: '1/2' },
        { check: false, value: 'Social', svg: '1/2' },
        { check: true, value: 'Profile Photo', svg: '1/1' },
        { check: true, value: 'Cover Photo', svg: '1/1' },
      ];

    return (
        <Card className='profile-card' >
          <p className='strong-p'>Complete your profile <FaArrowRight color='#213555' /></p>
          <Row>
            <Col>
              <PercentageCircle percentage={percentage} />
            </Col>
            <Col>
              {StrongData.map((item, index) => (
                <div key={index} className='d-flex align-items-center justify-content-between mt-3'>
                  <div className="d-flex align-items-center">
                    {item.check ?
                      <TbCircleCheckFilled color='#77DCBF' size={23} className='me-2' /> :
                      <FaRegCircle color='#EBEAED' size={20} className='me-2'/>
                    }
                    <p className='strong-value me-3 mb-0'>{item.value}</p>
                  </div>
                  <p className='mb-0 item-svg'>{item.svg}</p>
                </div>
              ))}
            </Col>
          </Row>
        </Card>
    )
}

export default ProfileStrong;
