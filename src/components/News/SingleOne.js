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
 <Meta
        title={<p style={{color:'#C2C2C2'}}>{category}</p>}
        description={<p style={{color:'#464646',fontSize:'19px'}}>{content}</p>}
      />
     <a href='#' > <img src={single} style={{marginTop:'1rem'}} /> </a>
  </Card>
    );
}
 
export default SingleOne;
