import React from 'react';
import { FaRegCalendarAlt } from "react-icons/fa";
import { RxDividerVertical } from "react-icons/rx";
import Rectangle from '../../assets/imgs/rectangle.png'
const SingleBlog = () => {
    const tags=['#hashtag','#hashtag'];
    return(
        <div className='singleBlog-container'>
        <p className='Blog-title-here-Neq'> Blog title here, Neque porro quisquam est qui dolorem ipsum</p>
        <div className='d-flex'>
                                    <p className='me-5 blog-sub'>Category Type
                                    <RxDividerVertical color="#E1E1E1" size={30} className='' />
                                     <FaRegCalendarAlt className='me-2' />21 Nov, 2023</p>
        </div>
        <img src="https://www.wemakefootballers.com/static-file/images/uploads/Screen-Shot-2018-11-02-at-11.31.56.webp" alt="Blog Image" style={{ width: '100%' }} />
        <p className='Lorem-ipsum-dolor-si'> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center',marginTop:'6rem' }}>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQbu3LGTAAPZ-rD0vldnm7XciQy38K_QmJqg&usqp=CAU" alt="Image 1" style={{ width: '60%',marginTop:'0' }} />
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRufE1oqUqZsdT-OPv8wCau57Sso3I5LCgCOyiVCA4MXCfd2N5RxrnQfQzMaQnFxkt9QMs&usqp=CAUimage2_url.jpg" alt="Image 2" style={{ width: '60%',marginLeft:'3rem',marginTop:'0' }} />
        </div>
        <p className='Lorem-ipsum-dolor-si'> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

      </div>
    )
}
export default SingleBlog;