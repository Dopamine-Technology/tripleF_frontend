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
     <a href='#' > <img src={single} style={{marginTop:'1rem'}} /> </a>
  </Card>
    );
}
 
export default SingleOne;
