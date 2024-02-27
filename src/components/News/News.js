import React, { useState, useEffect } from 'react';
import SingleOne from './SingleOne';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { FaArrowRight } from "react-icons/fa";

const News = () => {
  const [news, setNews] = useState([]);

  const axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      page: 0,
      limit: 5
    }
  };

  useEffect(() => {
    axios.post('https://backend.triplef.group/api/app/latest_posts', axiosConfig)
      .then((response) => {
        console.log('news', response.data); 
        setNews(response.data.result);
      })
      .catch((error) => {
        console.error('Error fetching news:', error);
      });
  }, []);

  const news2 = [
    {
      img: "https://th.bing.com/th/id/R.e9509b638beca9e17499ee45b20fc1dd?rik=%2fmxruNZokLGgPg&pid=ImgRaw&r=0",
      category: "Category name",
      content: "Few benefits of group & personal training"
    },
    {
      img: "https://th.bing.com/th/id/R.e9509b638beca9e17499ee45b20fc1dd?rik=%2fmxruNZokLGgPg&pid=ImgRaw&r=0",
      category: "Category name",
      content: "Few benefits of group & personal training"
    },
    {
      img: "https://th.bing.com/th/id/R.e9509b638beca9e17499ee45b20fc1dd?rik=%2fmxruNZokLGgPg&pid=ImgRaw&r=0",
      category: "Category name",
      content: "Few benefits of group & personal training"
    },
  ];

  return (
    <div className='p-4 mt-5' id='News'>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <p className='about-h1' style={{ width: '30rem', marginLeft: '5rem' }}>Our Latest News</p>
        <p><a href="/blogs" className='read-more-link'>View More</a> <FaArrowRight /></p>
      </div>
      <Row className='mt-5' style={{ marginLeft: '5rem', marginRight: '-16px' }}>
        {news2 && news2.length > 0 ? (
          news2.map((item, index) => (
            <Col key={index} md={4} xs={12}  className='col-single' style={{ paddingBottom: '16px' }}>
              <SingleOne img={item.img} content={item.content} category={item.category} />
            </Col>
          ))
        ) : (
          <p>No news available</p>
        )}
      </Row>
    </div>
  );
}

export default News;
