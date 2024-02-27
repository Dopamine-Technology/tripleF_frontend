import React from 'react';
import './style.css';
import { FaLongArrowAltRight, FaLongArrowAltLeft } from "react-icons/fa";
import single from '../../assets/imgs/SingleRight.svg'
import { Card } from 'antd';
import { useNavigate, Link } from 'react-router-dom';

const { Meta } = Card;
const SingleOne = ({ img, content, category }) => {
  return (
    <Card
      hoverable
      style={{
        width: 391,
        border: 0,
      }}
      cover={
        <img alt={img} src={img}
          style={{ borderRadius: '16px', width: '391px', height: '347px' }}
        />
      }
    >
      <Meta
        title={<p className='category-p'>{category}</p>}
        description={
          <p className="description-text">{content}</p>
        }
      />
      <a href='#'><img src={single} style={{ marginTop: '1rem'}} /></a>
    </Card>
  );
}

export default SingleOne;