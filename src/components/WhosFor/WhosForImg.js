import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Card } from 'antd';
const { Meta } = Card;

const WhosForImg = ({img,title,desc}) => {
  return (
    <Card
    hoverable
    style={{
      width: 230,
    }}
    cover={<img alt="example" src={img} 
   />}
  >
    <Meta title={title} 
    description={desc}
    
     />
     <a href='#' className='mt-5'>Learn More</a>
  </Card>

  );
}

export default WhosForImg;
