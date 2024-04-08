import React,{useLayoutEffect,useState} from 'react';
import './style.css';
import { FaLongArrowAltRight, FaLongArrowAltLeft } from "react-icons/fa";
import single from '../../assets/imgs/SingleRight.svg'
import { Card } from 'antd';
import { useNavigate, Link } from 'react-router-dom';

const { Meta } = Card;
const SingleOne = ({ img, content, category }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useLayoutEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isSmallScreen = windowWidth <= 600;
  const isTabletScreen = windowWidth > 600 && windowWidth <= 820;
  
  return (
    <Link to="/blogs/1" style={{ textDecoration: 'none' }}>
    <Card
      hoverable
      style={{
        width: isTabletScreen?200:391,
        border: 0,
      }}
      cover={
        <img alt={img} src={img}
          style={{ borderRadius: '16px', width: isSmallScreen?'300px':isTabletScreen?'281px':'391px', height: !isSmallScreen?'347px':'300px' }}
        />
      }
    >
      <Meta
        title={<p className='category-p'>{category}</p>}
        description={
          <Link to='/blogs/1' style={{textDecoration:'none'}}><p className="description-text">{content}</p></Link>
        }
      />
      <a href='/blogs/1'><img src={single} style={{ marginTop: '1rem'}} /></a>
    </Card>
    </Link>
  );
}

export default SingleOne;