import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

const UseContentFetcher = (tag) => {
  const [content, setContent] = useState([]);

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
          `http://172.104.243.57/api/app/get_translations?tag=${tag}`,
          axiosConfig
        );
        setContent(response.data.result);
        console.log('content', response.data.result);
      } catch (error) {
        console.error('Error fetching content:', error);
      }
    };

    fetchData();
  }, [tag]);

  return content;
};

export default UseContentFetcher;
