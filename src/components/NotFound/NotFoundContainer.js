import React from 'react';
import notFoundImg from '../../assets/imgs/notFound.svg';
import './style.css';

function NotFoundContainer() {
    return(
        <div>
             <div className='notFound-container'>
        <img src={notFoundImg} />
        <p className='notFound-word'>404</p>
        <p className='the-page-not'>Sorry, the page not found</p>
        <p className='reason-notFound'>The link you followed probably broken
           or the page has been removed</p>
            </div>
        </div>
    )
}
export default NotFoundContainer;