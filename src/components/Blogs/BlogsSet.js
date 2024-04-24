import React,{useState} from 'react'
import Blog from './Blog';
import './style.css';
import Rectangle from '../../assets/imgs/rectangle.png';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';

const BlogsSet = () => {
  const currentLanguage = Cookies.get('language') || 'en';
  const [direction, setDirection] = useState('ltr');
  const [t,i18n]=useTranslation();

    const blogs=[{
        img:Rectangle,
        title:"Blog title here, Neque porro quisquam est qui dolorem ipsum",
        categoryName:"Category Name",
        date:"21 Nov, 2023",
        desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor",
        tags:['#hashtag','#hashtag']
    },
    {
        img:Rectangle,
        title:"Blog title here, Neque porro quisquam est qui dolorem ipsum",
        categoryName:"Category Name",
        date:"21 Nov, 2023",
        desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor",
        tags:['#hashtag','#hashtag']
    },
    {
        img:Rectangle,
        title:"Blog title here, Neque porro quisquam est qui dolorem ipsum",
        categoryName:"Category Name",
        date:"21 Nov, 2023",
        desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor",
        tags:['#hashtag','#hashtag']
    },
]
return (
    <div style={{marginLeft:'3rem'}}>
      {blogs && blogs.length > 0 ? (
        blogs.map((blog, index) => (
          <Blog
            key={index}
            img={blog.img}
            title={blog.title}
            categoryName={blog.categoryName}
            date={blog.date}
            desc={blog.desc}
            tags={blog.tags}
          />
        ))
      ) : (
        <p>{t('BlogsList.noBlogs')}</p>
      )}
    </div>
  );
}

export default BlogsSet;