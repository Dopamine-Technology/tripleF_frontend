import React from 'react';
import { RxDividerVertical } from "react-icons/rx";
import { Button } from 'react-bootstrap';


function Opportunity(){
    return(
        <div className='post-continer'>
        
   
   <div className='text'>
   <div className="poster">
   <div className="Simplilearn">
       <img src='https://marketplace.canva.com/EAFn79D1vQ4/1/0/1600w/canva-red-white-and-black-modern-football-club-logo-cyuklMnKVrQ.jpg' alt="Img" style={{height:"50px", width:"50px", borderRadius:"50%"}}/>
       <p className='post-username'>Club Name here <br /> 
       <div className='d-flex '>
                                    <p className='me-5 blog-sub'>Moscow, Russia
                                    <RxDividerVertical color="gray" size={30} className='' />
                                       Midfielder</p>
        </div>
       </p> 
    
   </div>
   

</div>
<div className="post-container">
        <div className='d-flex justify-content-between'>
        <h5 className='postOpp-title'>Opportunities title here</h5>
        <Button className='apply-btn'>Apply Now</Button>
        </div>
 
       
        <p className='postOpp-desc'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi 
        ut aliquip ex ea commodo consequat. </p>




    
</div>

           </div>
       
</div>
    )
}

export default Opportunity;