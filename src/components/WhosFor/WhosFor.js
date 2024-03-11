import React from 'react';
import { Row, Col } from 'react-bootstrap';
import WhosForDesc from './WhosForDec'
import WhosForImg from './WhosForImg';
import svg from '../../assets/imgs/football-3.svg';
import club from '../../assets/imgs/football-club.png';
import coach from '../../assets/imgs/coach.svg'
import icon from '../../assets/imgs/binoculars.png';
import Football from '../../assets/imgs/football@2x.png';
import './style.css'

const WhosFor = () => {
  const types = [
    {
      img: Football,
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
      img: icon,
      title: "Scouts",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    }
  ];

  return (
    <div className=' whos-for-container  ' id='#whoSection'>
      <Row className="justify-content-center who-h1" >
        <Col xs={12} sm={10} md={8} lg={6}>
          <WhosForDesc />
        </Col>
      </Row>
      <Row className="justify-content-center card-container  " >

        {types.map((type, index) => (
          <Col key={index} xs={12} sm={6} md={6} lg={3} className='card-responsive' >
            <WhosForImg img={type.img} title={type.title} desc={type.desc} />
          </Col>
        ))}

      </Row>
    </div>
  );
}

export default WhosFor;
