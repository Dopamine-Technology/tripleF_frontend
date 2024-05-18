import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { FaRegCalendarAlt } from "react-icons/fa";
import { RxDividerVertical } from "react-icons/rx";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Blog = ({img, title, categoryName, date, desc, tags}) => {
    const id = 1;
    const navigate = useNavigate();

    // Function to truncate the description to 200 words
    const truncateDescription = (description) => {
        // Create a div element to parse the HTML content
        const tempElement = document.createElement('div');
        tempElement.innerHTML = description;

        // Extract text content from HTML and split into words
        const textContent = tempElement.textContent || tempElement.innerText || '';
        const words = textContent.trim().split(/\s+/);

        // Check if the number of words is greater than 200
        if (words.length > 100) {
            // Join the first 200 words and append ellipsis
            return words.slice(0, 100).join(' ') + '...';
        } else {
            // If the number of words is 200 or fewer, return the original content
            return textContent;
        }
    };

    const truncatedDesc = truncateDescription(desc);

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
                                <Link to={`/blogs/${id}`} style={{textDecoration:'none',color:'none'}}><p className='blog-title'>{title}</p></Link>
                                <div className='d-flex'>
                                    <p className='me-5 blog-sub'>{categoryName}
                                    <RxDividerVertical color="gray" size={30} className='' />
                                     <FaRegCalendarAlt className='me-2' />{date}</p>
                                </div>
                                <p className='blog-desc'>{truncatedDesc}</p>
                                <div>
                                    {Array.isArray(tags) && tags.map((tag, index) => (
                                        <span key={index} className="badge me-2 p-2">{tag}</span>
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
