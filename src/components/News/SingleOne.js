import React from 'react';
import './style.css';
import { FaLongArrowAltRight,FaLongArrowAltLeft } from "react-icons/fa";
import { Card } from 'antd';
const { Meta } = Card;



const SingleOne = ({img,content,category}) => {
    return (
<Card
    hoverable
    style={{
      width: 400,
    }}
    cover={<img alt={img} src={img} 
   />}
  >
    <Meta title={category} 
    description={content}
    
     />
     <a href='#' className='mt-5'> <FaLongArrowAltRight size={27} color='black'/> </a>
  </Card>
    );
}
 
export default SingleOne;
