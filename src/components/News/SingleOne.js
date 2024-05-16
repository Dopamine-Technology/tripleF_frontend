import React,{useLayoutEffect,useState,useEffect} from 'react';
import './style.css';
import { FaLongArrowAltRight, FaLongArrowAltLeft } from "react-icons/fa";
import single from '../../assets/imgs/SingleRight.svg'
import { Card } from 'antd';
import { useLocation , Link } from 'react-router-dom';
import { useScreenWidth } from '../ScreenWidthContext/ScreenWidth.context';

const { Meta } = Card;
const SingleOne = ({ img, content, category ,id}) => {
  
  const { windowWidth, isSmallScreen, isTabletScreen, isProScreen } = useScreenWidth();


  
  return (
    <Link to={`/blogs/${id}`} style={{ textDecoration: 'none' }}>
    <Card
      hoverable
      style={{
        width: isTabletScreen?200:391,
        border: 0,
      }}
      cover={
        <img alt={img} src={img}
          style={{ borderRadius: '16px', width: isSmallScreen?'300px':isTabletScreen||isProScreen?'281px':'391px', height: !isSmallScreen?'347px':'300px' }}
        />
      }
    >
      <Meta
        title={<p className='category-p'>{category}</p>}
        description={
          <Link to={`/blogs/${id}`} style={{textDecoration:'none'}}><p className="description-text">{content}</p></Link>
        }
      />
      <a href={`/blogs/${id}`}><img src={single} style={{ marginTop: '1rem'}} /></a>
    </Card>
    </Link>
  );
}

export default SingleOne;