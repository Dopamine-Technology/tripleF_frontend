import React from 'react';
import SingleOne from './SingleOne';
import { Row, Col } from 'react-bootstrap';


const News = () => {
    const news=[{
        img:"https://th.bing.com/th/id/R.e9509b638beca9e17499ee45b20fc1dd?rik=%2fmxruNZokLGgPg&pid=ImgRaw&r=0",
        category:"Category name",
        content:"Few benifits of group & personal training"
    },
    {
        img:"https://th.bing.com/th/id/R.e9509b638beca9e17499ee45b20fc1dd?rik=%2fmxruNZokLGgPg&pid=ImgRaw&r=0",
        category:"Category name",
        content:"Few benifits of group & personal training"
    },
    {
        img:"https://th.bing.com/th/id/R.e9509b638beca9e17499ee45b20fc1dd?rik=%2fmxruNZokLGgPg&pid=ImgRaw&r=0",
        category:"Category name",
        content:"Few benifits of group & personal training"
    },
]
    return ( <div className='p-4'>
        <h2 className='who-h1'>Our Latest News </h2>
        <Row className='m-5'>
        {news.map((step, index) => (
          <Col key={index} md={4}>
            <SingleOne img={step.img} content={step.content} category={step.category} />
          </Col>
        ))}
      </Row>
    </div> );
}
 
export default News;