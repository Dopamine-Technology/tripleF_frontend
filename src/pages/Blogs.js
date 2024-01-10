import React from 'react'
import Navbar from '../components/Register/Navbar';
import { Row, Col } from 'react-bootstrap';
import BlogsSet from '../components/Blogs/BlogsSet';
import RecentPosts from '../components/Blogs/RecentPosts';
import '../components/Blogs/style.css';

const Blogs = () => {
    return(
        <div>
        <Navbar />
        <Row>
            <Col sm={8}  >
                <div >
                    <p className='Col-title'>News</p>
                    <BlogsSet  />
                </div>
            </Col>

        
            <Col sm={4}>
           
                <div>
                   <p className='Col-title'>Recent posts</p>
                   <RecentPosts />
                </div>
            </Col>
        </Row>
    </div>
    )
}
export default Blogs;