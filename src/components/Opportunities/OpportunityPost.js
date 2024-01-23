import React from 'react';
import './style.css';
import { RxDividerVertical } from "react-icons/rx";
import { Button } from 'react-bootstrap';

const OpportunityPost=()=>{
   return(

    <div className="post-container">
        <div className='d-flex justify-content-between'>
        <h5 className='postOpp-title'>Opportunities title here</h5>
        <Button className='view-btn'>View More</Button>
        </div>
        <div className='d-flex '>
                                    <p className='me-5 blog-sub'>Moscow, Russia
                                    <RxDividerVertical color="gray" size={30} className='' />
                                       Midfielder</p>
        </div>
       
        <p className='postOpp-desc'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi 
        ut aliquip ex ea commodo consequat. </p>

 </div>
   )
}

export default OpportunityPost;