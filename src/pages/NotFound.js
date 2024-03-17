import React from 'react';
import notFoundImg from '../assets/imgs/404Image.png'

function NotFound() {
    return(
        <div style={{overflowY:'hidden'}}>
        <img src={notFoundImg}style={{height:'49rem',marginLeft:'8rem'}}  />
        </div>
    )
}

export default NotFound;