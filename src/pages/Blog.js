import React from 'react'
import Navbar from '../components/Register/Navbar';
import RecentPosts from '../components/Blogs/RecentPosts';
import Footer from '../components/Footer/Footer';
import SingleBlog from '../components/Blogs/SingleBlog';
import { Row,Col } from 'react-bootstrap';

const BlogPage = () => {
    const tags=['#hashtag','#hashtag'];

    return(
        <div>
        <Navbar />
        <Row>
            <Col sm={8}  >
        

                    <SingleBlog />
             
            </Col>

        
            <Col sm={4}>
           <Row>
            <div>
  <p className='Col-title' >Recent posts</p>
  <hr className='hr-title' />
  <RecentPosts />
</div>
</Row>
<Row>
<div>
  <p className='Col-title' >Categories</p>
  <hr className='hr-title' />
  <div style={{marginLeft:'4rem'}}>
  <p className='category-name'>Category Name</p>
  <hr style={{width:'10rem',color:'#AAABAB'}} />
  <p className='category-name'>Category Name</p>
  <hr style={{width:'10rem',color:'#AAABAB'}} />
  <p className='category-name'>Category Name</p>
  <hr style={{width:'10rem',color:'#AAABAB'}} />
  </div>

</div>
</Row>
<Row>
<div>
  <p className='Col-title' >Tags</p>
  <hr className='hr-title' />
  <div style={{marginLeft:'4rem'}}>
  {tags.map((tag, index) => (
                           <span className="badge  me-2 p-2">{tag}</span>
                        
            
        ))}
  </div>

</div>
</Row>
            </Col>
 
        </Row>
 <Footer />

    </div>
    )
}
export default BlogPage;