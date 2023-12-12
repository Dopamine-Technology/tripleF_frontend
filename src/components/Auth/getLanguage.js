import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

function ContentFetcher({ setFetchedContent }) {
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
          'http://172.104.243.57/api/app/get_translations?tag=landing',
          axiosConfig
        );
        setContent(response.data.result); // Assuming 'result' contains the array of content
        setFetchedContent(response.data.result); // Pass fetched content to parent component
        console.log('content', response.data.result);
      } catch (error) {
        console.error('Error fetching content:', error);
      }
    };

    fetchData();
  }, [setFetchedContent]);

  return null; // Since this component handles fetching only, it doesn't render anything
}

export default ContentFetcher;
