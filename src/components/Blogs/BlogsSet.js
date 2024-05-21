import React,{useState,useEffect} from 'react'
import Blog from './Blog';
import './style.css';
import Rectangle from '../../assets/imgs/rectangle.png';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
import useAxios from '../Auth/useAxiosHook.interceptor';

const BlogsSet = () => {
  const currentLanguage = Cookies.get('language') || 'en';
  const [direction, setDirection] = useState('ltr');
  const [t,i18n]=useTranslation();
  const [blogs, setBlogs] = useState([]);

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

//     const blogs=[{
//         img:Rectangle,
//         title:"Blog title here, Neque porro quisquam est qui dolorem ipsum",
//         categoryName:"Category Name",
//         date:"21 Nov, 2023",
//         desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor",
//         tags:['#hashtag','#hashtag']
//     },
//     {
//         img:Rectangle,
//         title:"Blog title here, Neque porro quisquam est qui dolorem ipsum",
//         categoryName:"Category Name",
//         date:"21 Nov, 2023",
//         desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor",
//         tags:['#hashtag','#hashtag']
//     },
//     {
//         img:Rectangle,
//         title:"Blog title here, Neque porro quisquam est qui dolorem ipsum",
//         categoryName:"Category Name",
//         date:"21 Nov, 2023",
//         desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor",
//         tags:['#hashtag','#hashtag']
//     },
// ]

useEffect(() => {
  axios.post('app/latest_posts', axiosConfig)
    .then((response) => {
      console.log('news', response.data); 
      setBlogs(response.data.result);
    })
    .catch((error) => {
      console.error('Error fetching news:', error);
    });
}, []);
return (
    <div style={{marginLeft:'3rem'}}>
      {blogs && blogs.length > 0 ? (
        blogs.map((blog, index) => (
          <Blog
            key={index}
            img={blog.main_image?blog.main_image:''}
            title={blog.title?blog.title:''}
            categoryName={blog.title?blog.title:''}
            date={blog.created_at?blog.created_at:''}
            desc={blog.content?blog.content:''}
            tags={blog.tags?blog.tags:''}
            id={blog.id}
          />
        ))
      ) : (
        <p>{t('BlogsList.noBlogs')}</p>
      )}
    </div>
  );
}

export default BlogsSet;