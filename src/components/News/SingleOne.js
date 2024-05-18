import React, { useLayoutEffect, useState, useEffect } from 'react';
import './style.css';
import { FaLongArrowAltRight, FaLongArrowAltLeft } from "react-icons/fa";
import single from '../../assets/imgs/SingleRight.svg'
import { Card } from 'antd';
import { useLocation, Link } from 'react-router-dom';
import { useScreenWidth } from '../ScreenWidthContext/ScreenWidth.context';

const { Meta } = Card;

const truncateContent = (content) => {
  // Remove any HTML tags from the content
  const strippedContent = content.replace(/<[^>]+>/g, '');

  // Split the content into words
  const words = strippedContent.split(' ');

  // Check if the content has more than 6 words
  if (words.length > 6) {
    // Join the first 6 words and add three dots
    return words.slice(0, 6).join(' ') + '...';
  } else {
    // If the content has 6 or fewer words, return the original content
    return strippedContent;
  }
};

const SingleOne = ({ img, content, category, id }) => {

  const { windowWidth, isSmallScreen, isTabletScreen, isProScreen } = useScreenWidth();

  const truncatedContent = truncateContent(content);

  return (
    <Link to={`/blogs/${id}`} style={{ textDecoration: 'none' }}>
      <Card
        hoverable
        style={{
          width: isTabletScreen ? 200 : 391,
          border: 0,
        }}
        cover={
          <img alt={img} src={img}
            style={{ borderRadius: '16px', width: isSmallScreen ? '300px' : isTabletScreen || isProScreen ? '281px' : '391px', height: !isSmallScreen ? '347px' : '300px' }}
          />
        }
      >
        <Meta
          title={<p className='category-p'>{category}</p>}
          description={
            <Link to={`/blogs/${id}`} style={{ textDecoration: 'none' }}>
              <p className="description-text">{truncatedContent}</p>
            </Link>
          }
        />
        <a href={`/blogs/${id}`}><img src={single} style={{ marginTop: '1rem' }} /></a>
      </Card>
    </Link>
  );
}

export default SingleOne;
