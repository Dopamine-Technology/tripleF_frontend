import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { FaRegCalendarAlt } from "react-icons/fa";

const RecentPosts = () => {
    const posts=[
        {
          img:"https://media.istockphoto.com/id/510398566/photo/the-most-famous-sports.jpg?s=612x612&w=0&k=20&c=4luU-DrHEakY-5VL4TgAPgOAGzeN-l9IpmxpUriW2a4=",
          title:"Blog title here, Neque porro quisquam",
          date:"21 Nov, 2023",
      },
      {
          img:"https://media.istockphoto.com/id/510398566/photo/the-most-famous-sports.jpg?s=612x612&w=0&k=20&c=4luU-DrHEakY-5VL4TgAPgOAGzeN-l9IpmxpUriW2a4=",
          title:"Blog title here, Neque porro quisquam",
          date:"21 Nov, 2023"
      },
      {
          img:"https://media.istockphoto.com/id/510398566/photo/the-most-famous-sports.jpg?s=612x612&w=0&k=20&c=4luU-DrHEakY-5VL4TgAPgOAGzeN-l9IpmxpUriW2a4=",
          title:"Blog title here, Neque porro quisquam",
          date:"21 Nov, 2023"
      },
  ]
  return (

    <div>

      {posts && posts.length > 0 ? (
        posts.map((post, index) => (
          <Card className='post-card' key={index} style={{padding:'0',marginTop:'0'}}>
            <Card.Body>
              <Row>
                <Col md={4}>
                  <img
                    src={post.img}
                    alt="Blog"
                    className="post-img"
                  />
                </Col>
                <Col md={8}>
                  <div>
                    <p className='post-title'>{post.title}</p>
                    <div className='d-flex'>
                      <p className='blog-sub'>
                        <FaRegCalendarAlt className='me-2' />
                        {post.date}
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
