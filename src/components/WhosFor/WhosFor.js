import React from 'react';
import { Row, Col } from 'react-bootstrap';
import WhosForDesc from './WhosForDec';
import WhosForImg from './WhosForImg';
import svg from '../../assets/imgs/football-3.svg'

const WhosFor = () => {
  const types = [
    {
      img: svg, // Add image URL or path here
      title: "Talented",
      desc: "fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      img: svg, // Add image URL or path here
      title: "Coaches",
      desc: " fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      img: svg, // Add image URL or path here
      title: "Clubs",
      desc: "fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      img: svg, // Add image URL or path here
      title: "Companies",
      desc: "fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    }
  ];

  return (
    <Row className="justify-content-center">
      <Col xs={12} sm={10} md={8} lg={6}>
        <WhosForDesc />
        <Row className='m-4'>
          {types.map((type, index) => (
            <Col key={index} md={3} className='mb-4'>
              <WhosForImg img={type.img} title={type.title} desc={type.desc} />
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
}

export default WhosFor;
