import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { FaRegCalendarAlt } from "react-icons/fa";
import { RxDividerVertical } from "react-icons/rx";

const Blog = ({img,title,categoryName,date,desc,tags}) => {
    return (
        <div>
            <Card className='blog-card'>
                <Card.Body>
                    <Row>
                        <Col md={5}>
                            <img
                                src={img}
                                alt="Blog"
                                className="blog-img"
                            />
                        </Col>
                      
                        <Col md={7}>
                            <div>
                                <p className='blog-title'>{title}</p>
                                <div className='d-flex'>
                                    <p className='me-5 blog-sub'>{categoryName}
                                    <RxDividerVertical color="gray" size={30} className='' />
                                     <FaRegCalendarAlt className='me-2' />{date}</p>
                                </div>
                                <p className='blog-desc'>{desc}</p>
                                <div>
                                {tags.map((tag, index) => (
                           <span className="badge  me-2 p-2">{tag}</span>
            
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


