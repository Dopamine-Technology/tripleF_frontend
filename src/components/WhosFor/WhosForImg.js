import React from 'react';
import { Card } from 'antd';
const { Meta } = Card;

const WhosForImg = ({ img, title, desc }) => {
  return (
    <Card
      hoverable
      className='whos-card'
      style={{
        width: 250,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          overflow: 'hidden',
          backgroundColor: '#E4F8F2',
          margin: '0 auto', 
        }}
      >
        <img
          alt="example"
          src={img}
          style={{
            width: '50%',
            height: '50%',
            objectFit: 'cover',
            borderRadius: '50%', 
          }}
        />
      </div>
      <Meta title={<div style={{ textAlign: 'center',marginTop:'1rem'}}>{title}</div>} description={desc} />
    </Card>
  );
}

export default WhosForImg;
