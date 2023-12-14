import React,{useEffect,useState} from 'react'
import Header from '../components/Header/Header'
import About from '../components/About/About';
import Steps from '../components/Steps/Steps';
import WhosFor from '../components/WhosFor/WhosFor';
import BecomeClient from '../components/BecomeClient/BecomeClient';
import News from '../components/News/News';
import Footer from '../components/Footer/Footer';
import OurClients from '../components/OurClients/OurClients';
import Cookies from 'js-cookie';
import axios from 'axios';
import PermissionsFetcher from '../components/Permissions/PermissionsFetcher';

function LandingPage() {
  const [content,setContent]=useState([]);
    
  useEffect(() => {
    const fetchData = async () => {
      try {
        const axiosConfig = {
          headers: {
            'Content-Type': 'application/json',
            'Accept-Language': Cookies.get('language'),
          },
        };
        const response = await axios.get(
          'http://172.104.243.57/api/app/get_translations?tag=landing',
          axiosConfig
        );
        setContent(response.data.result); 
        console.log('content', response.data.result);
      } catch (error) {
        console.error('Error fetching content:', error);
      }
    };

    fetchData();
  }, []);

  

  return (
    <div>
    <Header content={content} />
    <About content={content}/>
    <WhosFor content={content} />
    <Steps content={content} />
    <OurClients content={content} />
    <BecomeClient content={content} />
    <News content={content} />
    <Footer content={content} />
    <PermissionsFetcher />

    </div>
  )
}

export default LandingPage