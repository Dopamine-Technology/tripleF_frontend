import React from 'react';
import { Row, Col } from 'react-bootstrap';
import WhosForDesc from './WhosForDec'
import WhosForImg from './WhosForImg';
import svg from '../../assets/imgs/football-3.svg';
import club from '../../assets/imgs/footballClub.svg';
import coach from '../../assets/imgs/coach.svg'
import './style.css'

const WhosFor = () => {
  const types = [
    {
      img: svg,
      title: "Talents",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    },
    {
      img: coach,
      title: "Coaches",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    },
    {
      img: club,
      title: "Clubs",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    },
    {
      img: svg,
      title: "Scouts",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    }
  ];

  return (
    <div className=' mt-5 whos-for-container mt-5  '>
      <Row className="justify-content-center mb-3 who-h1" >
        <Col xs={12} sm={10} md={8} lg={6}>
          <WhosForDesc />
        </Col>
      </Row>
      <Row className="justify-content-center card-container " >
        {types.map((type, index) => (
          <Col key={index} xs={6} sm={6} md={6} lg={3} >
            
            <WhosForImg img={type.img} title={type.title} desc={type.desc} />
           
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default WhosFor;
