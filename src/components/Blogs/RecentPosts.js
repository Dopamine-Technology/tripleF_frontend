import React,{useEffect,useState} from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { FaRegCalendarAlt } from "react-icons/fa";
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
import useAxios from '../Auth/useAxiosHook.interceptor';

const RecentPosts = () => {
  const currentLanguage = Cookies.get('language') || 'en';
  const [direction, setDirection] = useState('ltr');
  const [t,i18n]=useTranslation();
  const axios=useAxios();
  const [posts,setPosts]=useState();
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
    axios.post('app/latest_posts', axiosConfig)
      .then((response) => {
        console.log('news', response.data); 
        const limitedPosts = response.data.result.slice(0, 3); // Get only the first three elements
        setPosts(limitedPosts);
      })
      .catch((error) => {
        console.error('Error fetching news:', error);
      });
  }, []);

  //   const posts=[
  //       {
  //         img:"https://media.istockphoto.com/id/510398566/photo/the-most-famous-sports.jpg?s=612x612&w=0&k=20&c=4luU-DrHEakY-5VL4TgAPgOAGzeN-l9IpmxpUriW2a4=",
  //         title:"Blog title here, Neque porro quisquam",
  //         date:"21 Nov, 2023",
  //     },
  //     {
  //         img:"https://media.istockphoto.com/id/510398566/photo/the-most-famous-sports.jpg?s=612x612&w=0&k=20&c=4luU-DrHEakY-5VL4TgAPgOAGzeN-l9IpmxpUriW2a4=",
  //         title:"Blog title here, Neque porro quisquam",
  //         date:"21 Nov, 2023"
  //     },
  //     {
  //         img:"https://media.istockphoto.com/id/510398566/photo/the-most-famous-sports.jpg?s=612x612&w=0&k=20&c=4luU-DrHEakY-5VL4TgAPgOAGzeN-l9IpmxpUriW2a4=",
  //         title:"Blog title here, Neque porro quisquam",
  //         date:"21 Nov, 2023"
  //     },
  // ]
  return (

    <div>

      {posts && posts.length > 0 ? (
        posts.map((post, index) => (
          <Card className='post-card' key={index} style={{padding:'0',marginTop:'0'}}>
   
            <Card.Body>
              <Row>
              
                <Col md={4}>
                  <img
                    src={post.main_image}
                    alt="Blog"
                    className="post-img"
                  />
                </Col>
                <Col md={8}>
                  <div>
                  <a href={`/blogs/${post.id}`} style={{textDecoration:'none',color:"black"}}>
                    <p className='post-title'>{post.title}</p>
                  </a>
                    <div className='d-flex'>
                      <p className='blog-sub'>
                        <FaRegCalendarAlt className='me-2' />
                        {post.created_at}
                      </p>
                    </div>
                  </div>
                </Col>
      
              </Row>
              
            </Card.Body>
          </Card>
        ))
      ) : (
        <p>No posts available</p>
      )}
    </div>
  );
};

export default RecentPosts;
