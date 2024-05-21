import React,{useState,useEffect} from 'react'
import Navbar from '../components/Register/Navbar';
import RecentPosts from '../components/Blogs/RecentPosts';
import Footer from '../components/Footer/Footer';
import SingleBlog from '../components/Blogs/SingleBlog';
import { Row,Col } from 'react-bootstrap';
import { useScreenWidth } from '../components/ScreenWidthContext/ScreenWidth.context';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
import { useLocation , Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import useAxios from '../components/Auth/useAxiosHook.interceptor';

const BlogPage = () => {
    const tags=['#hashtag','#hashtag'];
    const {  isTabletScreen } = useScreenWidth();
    const currentLanguage = Cookies.get('language') || 'en';
  const [direction, setDirection] = useState('ltr');
  const [t,i18n]=useTranslation()
  const location = useLocation();
  const axios=useAxios();
  const {id}=useParams();
  const [blog,setBlog]=useState();

  useEffect(() => {
    axios.get(`app/get_post/${id}`)
      .then((response) => {
        console.log('news', response.data); 
        setBlog(response.data.result);
      })
      .catch((error) => {
        console.error('Error fetching news:', error);
      });
  }, []);

  useEffect(() => {
    if (currentLanguage === 'ar') {
      setDirection('rtl');
    }       else{
      setDirection('ltr')
    }
  }, [currentLanguage]);
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page when the component mounts
  }, [location.pathname])
    return(
        <div >
        <Navbar />
        <Row>
            <Col sm={8}  >
                    <SingleBlog blog={blog} />
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
                        {/* <Row>
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
                                {Array.isArray(tags) && tags.map((tag, index) => (
    <span key={index} className="badge me-2 p-2">{tag}</span>
))}

                                </div>
                            </div>
                        </Row> */}
                    </Col>
                )}
 
        </Row>
 <Footer />

    </div>
    )
}
export default BlogPage;