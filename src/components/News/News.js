import React,{useState,useEffect} from 'react';
import SingleOne from './SingleOne';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';


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
    axios.post('https://backendtriplef.dopaminetechnology.com/api/app/latest_posts', axiosConfig)
      .then((response) => {
        console.log('news',response.data); 
        setNews(response.data.result);
      })
      .catch((error) => {
        console.error('Error fetching news:', error);
      });
  }, []);
    const news2=[{
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
        <h2 className='about-h1' style={{width:'20rem'}}>Our Latest News </h2>
        <Row className='m-5'>
           {news2 && news2.length > 0 ? (
            news2.map((item, index) => (
          <Col key={index} md={4} xs={6} sm={6} className='col-single'>
            <SingleOne img={item.img} content={item.content} category={item.category} />
          </Col>
        ))
      ) : (
        <p>No news available</p>
      )}
      </Row>
    </div> );
}
 
export default News;