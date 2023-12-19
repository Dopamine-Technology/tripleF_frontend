import React from 'react';
import './style.css';
import { FaLongArrowAltRight,FaLongArrowAltLeft } from "react-icons/fa";
import single from '../../assets/imgs/SingleRight.svg'
import { Card } from 'antd';

const { Meta } = Card;



const SingleOne = ({img,content,category}) => {
    return (
<Card
    hoverable
    style={{
      width: 330,
      border:0
    }}
    cover={<img alt={img} src={img} 
   />}
  >
    <Meta title={content} 
    description={category}
    
     />
     <a href='#' className='mt-5'> <img src={single} /> </a>
  </Card>
    );
}
 
export default SingleOne;
