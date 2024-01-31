import React,{useState} from 'react';
import { RxDividerVertical } from "react-icons/rx";
import { Button } from 'react-bootstrap';
import { IoMdArrowDropdown,IoMdArrowDropup } from "react-icons/io";
import {Row,Col} from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { BsThreeDotsVertical } from "react-icons/bs";
import Dropdown from 'react-bootstrap/Dropdown';
import { CiLink } from "react-icons/ci";
import { MdOutlineCancel } from "react-icons/md";


function Opportunity({data }){
    const location = useLocation();
    const isAppliedPath = location.pathname === '/applied/list';
    const [isExpanded, setIsExpanded] = useState(false);
    const opportunityData='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi  ut aliquip ex ea commodo consequat. sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '
    const titles=[
        {title:'Age',name:'10 -15 years'},
        {title:'Height',name:'150 -170 CM'},
        {title:'Weight',name:'55 -65 Kg'},
        {title:'Preferred Foot',name:data.preferredFoot},
    ]
 
    const handleExpandClick = () => {
        setIsExpanded(!isExpanded);
    };
 
    const displayDescription = isExpanded
    ? opportunityData
    : opportunityData.slice(0, 230);

    return(
        <div>
        
        <div className='post2-continer'>
        {isAppliedPath?(<p className='time-applied'>Applied 2 weeks ago</p>):(null)}
   
   <div className='text2'>
   <div className='d-flex justify-content-between'>
   <div className="poster">
   <div className="Simplilearn">
       <img src={data.clubLogo} alt="Img" style={{height:"50px", width:"50px", borderRadius:"50%"}}/>
       <p className='post-username'>{data.clubName}<br /> 
       <div className='d-flex'>
                                    <p className='me-5 blog-sub'>{data.locationName}
                                    <RxDividerVertical color="gray" size={30} className='' />
                                    {data.positionName}</p>
        </div>
       </p> 
    
   </div>
   

</div>
{isAppliedPath?( <Dropdown>
      <Dropdown.Toggle variant=""  className="edit">
         <BsThreeDotsVertical fontSize="1.5rem"  />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="" className='p-2' ><CiLink className='me-2' />Copy link to Post</Dropdown.Item>
        <Dropdown.Item href="" className='mt-1 p-2'> <MdOutlineCancel className='me-2' />Discard Opportunity</Dropdown.Item>
       
      </Dropdown.Menu>
    </Dropdown>):(     <Button className='apply-btn'>Apply Now</Button>  )}
   

</div>
<div>
           
            <div className='four-div-container d-flex ' >
            {titles.map((singleData) => (
  <div className='four-div me-4'>
    <p className=''> {singleData.title} <span className='four-span-name'>{singleData.name}</span></p>
  </div>
))}
 
            </div>
          </div>
<div>

</div>
<div className="opp-container ">
       <h5 className='postOpp-title'>{data.title}</h5>
   
        <p className='postOpp-desc' > {displayDescription}
        {
            isExpanded?(
                <div className='mt-4'>
                <p className='postOpp-title'>Requirements</p>
                <ul>
                    <li>Sed ut perspiciatis unde omnis iste natus error </li>
                    <li>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium </li>
                    <li>Sed ut perspiciatis unde omnis iste natus error sit voluptatem </li>
                    <li>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium </li>
                </ul>
                <p className='postOpp-title'>Additional Information</p>
                <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur</p>
                </div>
            ):(null)
        }
        </p>

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