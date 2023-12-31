import React from 'react';
import { Card } from 'antd';
import cardBG from '../../assets/imgs/cardBG.png'
const { Meta } = Card;

const WhosForImg = ({ img, title, desc }) => {
  return (
    <Card
      hoverable
      className='whos-card'
      style={{
        width: 250,
        backgroundImage:`url(${cardBG})`,
        backgroundSize: '6rem',
        backgroundRepeat: 'no-repeat',
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
      <Meta title={<div style={{ textAlign: 'center',marginTop:'1rem'}}>{title}</div>} description={<div style={{color:'#464646'}}>{desc}</div>} />
    </Card>
  );
}

export default WhosForImg;
