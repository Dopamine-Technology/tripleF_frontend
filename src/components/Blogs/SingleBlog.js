import React,{useEffect} from 'react';
import { FaRegCalendarAlt } from "react-icons/fa";
import { RxDividerVertical } from "react-icons/rx";
import { useScreenWidth } from '../ScreenWidthContext/ScreenWidth.context';

const SingleBlog = ({ blog }) => {
  const { windowWidth, isSmallScreen, isTabletScreen, isProScreen } = useScreenWidth();



  return (
    <div className='singleBlog-container'>
      <p className='Blog-title-here-Neq'>{blog?.title}</p>
      <div className='d-flex'>
        <p className='me-5 blog-sub'>{blog?.title}
          <RxDividerVertical color="#E1E1E1" size={30} className='' />
          <FaRegCalendarAlt className='me-2' />{blog?.created_at}
        </p>
        
      </div>
      <img src={blog?.main_image} alt="Blog Image" className='main-img' />
      <div className='Lorem-ipsum-dolor-si' dangerouslySetInnerHTML={{ __html: blog?.content }}></div>
      {/* {blog?.post_media && blog.post_media.map((media, index) => (
        <img key={index} src={media.url} alt={`Additional Image ${index + 1}`} className='additional-img' />
      ))} */}
    </div>
  )
}

export default SingleBlog;
