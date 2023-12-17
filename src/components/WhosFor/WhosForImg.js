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
      <div style={{ width: '100px', height: '100px', borderRadius: '50%', overflow: 'hidden', backgroundColor: '#E4F8F2' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
          <img alt="example" src={img} style={{ maxWidth: '80%', maxHeight: '80%', objectFit: 'cover' }} />
        </div>
      </div>
      <Meta title={title} description={desc} />
      {/* <a href='#' className='mt-5'>Read More</a> */}
    </Card>
  );
}

export default WhosForImg;
