import React from 'react';
import { Card } from 'antd';
import cardBG from '../../assets/imgs/cardBG.png'
const { Meta } = Card;


const WhosForImg = ({ img, title, desc }) => {
  return (
    <Card
      hoverable
      className='whos-card'

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
            width: '48px',
            height: '48px',
            padding: '3px',
            objectFit: 'contain',
           }
          }
        />
      </div>
      <Meta title={<div className='card-title'>{title}</div>} 
      description={<div style={{color:'rgba(70, 70, 70, 0.8)',textAlign: 'center'}}>{desc}</div>} />
    </Card>
  );
}

export default WhosForImg;
