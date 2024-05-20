import React, { useState, useEffect ,useLayoutEffect} from 'react';
import SingleOne from './SingleOne';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { FaArrowRight,FaArrowLeft  } from "react-icons/fa";
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
import { useScreenWidth } from '../ScreenWidthContext/ScreenWidth.context';
import { useLanguage } from '../LanguageContext/LanguageProvider';
import useAxios from '../Auth/useAxiosHook.interceptor';

const News = () => {
  const [news, setNews] = useState([]);

  const { windowWidth, isSmallScreen, isTabletScreen, isProScreen } = useScreenWidth();

  const { language, changeLanguage,direction } = useLanguage(); 
  const [t,i18n]=useTranslation();
  const axios=useAxios();

  const axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      page: 0,
      limit: 5
    }
  };

 
  useEffect(() => {
    axios.post('app/latest_posts', axiosConfig)
      .then((response) => {
        console.log('news', response.data);
        // Assuming response.data.result is an array
        const limitedNews = response.data.result.slice(0, 3);
        setNews(limitedNews);
      })
      .catch((error) => {
        console.error('Error fetching news:', error);
      });
  }, []);
  
  return (
    <div className='p-4 mt-5' id='News' >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <p className='news-h1' style={{ width: '30rem', marginLeft: isSmallScreen?'0rem':'2.7rem' }}>{t('News.title')}</p>
        <p><a href="/blogs" className='read-more-link mt-2'>{t('News.view_more')}</a> {language=='ar'?<FaArrowLeft  className='arrow-hidden' />:<FaArrowRight className='arrow-hidden' />}</p>
      </div>
      <Row className={isSmallScreen?`news-row`:`mt-5 news-row`} >
        {news && news.length > 0 ? (
          news.map((item, index) => (
            <Col key={index} md={4} xs={12}  className='col-single' style={{ paddingBottom: '16px' }}>
              <SingleOne img={item.main_image} content={item.content} category={item.title} id={item.id} />
            </Col>
          ))
        ) : (
          <p>No news available</p>
        )}
      </Row>
    </div>
  );
}

export default News;
