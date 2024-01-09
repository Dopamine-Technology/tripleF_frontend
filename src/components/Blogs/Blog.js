import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { FaRegCalendarAlt } from "react-icons/fa";

const Blog = ({img,title,categoryName,date,desc,tags}) => {
    return (
        <div>
            <Card className='blog-card'>
                <Card.Body>
                    <Row>
                        <Col md={6}>
                            <img
                                src={img}
                                alt="Blog"
                                className=" blog-img"
                            />
                        </Col>
                      
                        <Col md={6}>
                            <div>
                                <p className='blog-title'>{title}</p>
                                <div className='d-flex'>
                                    <p className='me-5 blog-sub'>{categoryName}</p>
                                    <p className='blog-sub'> <FaRegCalendarAlt className='me-2' />{date}</p>
                                </div>
                                <p className='blog-desc'>{desc}</p>
                                <div>
                                {tags.map((tag, index) => (
             <span className="badge bg-secondary me-2">{tag}</span>
            
        ))}
                                   
                                  
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Blog;


