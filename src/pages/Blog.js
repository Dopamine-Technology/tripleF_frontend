import React,{useState,useEffect} from 'react'
import Navbar from '../components/Register/Navbar';
import RecentPosts from '../components/Blogs/RecentPosts';
import Footer from '../components/Footer/Footer';
import SingleBlog from '../components/Blogs/SingleBlog';
import { Row,Col } from 'react-bootstrap';
import { useScreenWidth } from '../components/ScreenWidthContext/ScreenWidth.context';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';

const BlogPage = () => {
    const tags=['#hashtag','#hashtag'];
    const {  isTabletScreen } = useScreenWidth();
    const currentLanguage = Cookies.get('language') || 'en';
  const [direction, setDirection] = useState('ltr');
  const [t,i18n]=useTranslation()
  useEffect(() => {
    if (currentLanguage === 'ar') {
      setDirection('rtl');
    }       else{
      setDirection('ltr')
    }
  }, [currentLanguage]);
    return(
        <div style={{direction:direction}}>
        <Navbar />
        <Row>
            <Col sm={8}  >
                    <SingleBlog />
            </Col>

        
            {!isTabletScreen && (
                    <Col sm={4}>
                        <Row>
                            <div>
                                <p className='Col-title'>{t('BlogsList.recentPosts')}</p>
                                <hr className='hr-title' />
                                <RecentPosts />
                            </div>
                        </Row>
                        <Row>
                            <div>
                                <p className='Col-title'>{t('BlogsList.categories')}</p>
                                <hr className='hr-title' />
                                <div style={{ marginLeft: '4rem' }}>
                                    <p className='category-name'>Category Name</p>
                                    <hr style={{ width: '10rem', color: '#AAABAB' }} />
                                    <p className='category-name'>Category Name</p>
                                    <hr style={{ width: '10rem', color: '#AAABAB' }} />
                                    <p className='category-name'>Category Name</p>
                                    <hr style={{ width: '10rem', color: '#AAABAB' }} />
                                </div>
                            </div>
                        </Row>
                        <Row>
                            <div>
                                <p className='Col-title'>{t('BlogsList.Tags')}</p>
                                <hr className='hr-title' />
                                <div style={{ marginLeft: '4rem' }}>
                                    {tags.map((tag, index) => (
                                        <span key={index} className="badge me-2 p-2">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </Row>
                    </Col>
                )}
 
        </Row>
 <Footer />

    </div>
    )
}
export default BlogPage;