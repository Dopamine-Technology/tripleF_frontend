import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { FaRegCalendarAlt } from "react-icons/fa";


const RecentPosts = ({img,title,date}) => {
    return (
        <div>
        <Card className='post-card'>
            <Card.Body>
                <Row>
                    <Col md={6}>
                        <img
                            src='https://media.istockphoto.com/id/510398566/photo/the-most-famous-sports.jpg?s=612x612&w=0&k=20&c=4luU-DrHEakY-5VL4TgAPgOAGzeN-l9IpmxpUriW2a4='
                            alt="Blog"
                            className="post-img"
                        />
                    </Col>
                  
                    <Col md={6}>
                        <div>
                            <p className='blog-title'>Blog title here, Neque porro quisquam </p>
                            <div className='d-flex'>
                              
                                <p className='blog-sub'> <FaRegCalendarAlt className='me-2' />21 Nov, 2023</p>
                            </div>
                           
                            <div>
 
                               
                              
                            </div>
                        </div>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    </div>
    )
}

export default RecentPosts;