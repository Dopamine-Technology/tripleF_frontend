import React,{useState} from 'react';
import { RxDividerVertical } from "react-icons/rx";
import { Button } from 'react-bootstrap';
import { IoMdArrowDropdown,IoMdArrowDropup } from "react-icons/io";


function Opportunity(){
    const [isExpanded, setIsExpanded] = useState(false);
    const opportunityData='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi  ut aliquip ex ea commodo consequat. sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '
 
    const handleExpandClick = () => {
        setIsExpanded(!isExpanded);
    };
 
    const displayDescription = isExpanded
    ? opportunityData
    : opportunityData.slice(0, 230);

    return(
        <div>
        <div className='post2-continer'>
        
   
   <div className='text2'>
   <div className='d-flex justify-content-between'>
   <div className="poster">
   <div className="Simplilearn">
       <img src='https://marketplace.canva.com/EAFn79D1vQ4/1/0/1600w/canva-red-white-and-black-modern-football-club-logo-cyuklMnKVrQ.jpg' alt="Img" style={{height:"50px", width:"50px", borderRadius:"50%"}}/>
       <p className='post-username'>Club Name here <br /> 
       <div className='d-flex'>
                                    <p className='me-5 blog-sub'>Location
                                    <RxDividerVertical color="gray" size={30} className='' />
                                    Position</p>
        </div>
       </p> 
    
   </div>
   

</div>
<Button className='apply-btn'>Apply Now</Button>
</div>
<div className="opp-container ">
       <h5 className='postOpp-title'>Opportunities title here</h5>
   
        <p className='postOpp-desc' > {displayDescription}</p>

       <div className="center-icon" >
        {isExpanded?<IoMdArrowDropup onClick={handleExpandClick} color='gray' fontSize={30} />:<IoMdArrowDropdown onClick={handleExpandClick} color='gray' fontSize={30} />}
        
        </div>

  
</div>

 </div>
       
</div>

</div>
    )
}

export default Opportunity;