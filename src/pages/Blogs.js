import React,{useLayoutEffect,useState,useEffect} from 'react'
import Navbar from '../components/Register/Navbar';
import { Row, Col } from 'react-bootstrap';
import BlogsSet from '../components/Blogs/BlogsSet';
import RecentPosts from '../components/Blogs/RecentPosts';
import '../components/Blogs/style.css';
import Footer from '../components/Footer/Footer';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';

const Blogs = () => {
    const tags=['#hashtag','#hashtag'];
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const currentLanguage = Cookies.get('language') || 'en';
  const [direction, setDirection] = useState('ltr');
  const [t,i18n]=useTranslation()

  useEffect(() => {
    // Change direction based on the selected language
    if (currentLanguage === 'ar') {
      setDirection('rtl');
    }       else{
      setDirection('ltr')
    }
  }, [currentLanguage]);

    useLayoutEffect(() => {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };
  
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
    const isSmallScreen = windowWidth <= 600;
    const isTabletScreen = windowWidth > 600 && windowWidth <= 820;

    return(
        <div >
        <Navbar />
        <Row >
            <Col sm={8}  >
                <div >
                    <p className='Col-title'>{t('BlogsList.news')}</p>
                    <BlogsSet  />
                </div>
            </Col>

        
            <Col sm={4} style={{ display: isTabletScreen ? 'none' : 'block' }}>
           <Row >
            <div>
  <p className='Col-title' >{t('BlogsList.recentPosts')}</p>
  <hr className='hr-title' />
  <RecentPosts />
</div>
</Row>
{/* <Row>
<div>
  <p className='Col-title' >{t('BlogsList.categories')}</p>
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
  <p className='Col-title' >{t('BlogsList.Tags')}</p>
  <hr className='hr-title' />
  <div style={{marginLeft:'4rem'}}>
  {Array.isArray(tags) && tags.map((tag, index) => (
    <span key={index} className="badge me-2 p-2">{tag}</span>
))}

  </div>

</div>
</Row> */}
            </Col>
 
        </Row>
 <Footer />
    </div>
    )
}
export default Blogs;