import React,{useState,useEffect,useContext} from 'react';
import { RxDividerVertical } from "react-icons/rx";
import { Button } from 'react-bootstrap';
import { IoMdArrowDropdown,IoMdArrowDropup } from "react-icons/io";
import {Row,Col} from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { BsThreeDotsVertical } from "react-icons/bs";
import Dropdown from 'react-bootstrap/Dropdown';
import { CiLink } from "react-icons/ci";
import { MdOutlineCancel } from "react-icons/md";
import cancel from '../../../assets/imgs/cancel.png';
import { AiOutlineReload } from "react-icons/ai";
import useAxios from '../../Auth/useAxiosHook.interceptor';
import { message } from 'antd';
import { UserDataContext } from '../../UserContext/UserData.context';


function OppProfileScout({profileData}){

    const axios=useAxios();
    const [isExpanded, setIsExpanded] = useState(false);
    const [ScoutOpportunities,setScoutOpportunities]=useState();

    const fetchOppData = async () => {
        try {
          const type = 'published';
          const response = await axios.post('/opportunities/user_opportunities',{type});
          setScoutOpportunities(response.data.result);
         
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      
      useEffect(() => {
 
        fetchOppData();
      }, []);

    const opportunityData='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi  ut aliquip ex ea commodo consequat. sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '
   
 
    const handleExpandClick = () => {
        setIsExpanded(!isExpanded);
    };
 
    const displayDescription = isExpanded
    ? opportunityData
    : opportunityData.slice(0, 230);

    const handleChangeState=(id)=>{
        axios.get(`opportunities/toggle_status/${id}`)
        .then((response) => {
            message.success(response.data.message);
            window.location.reload();
        })
    }

    return(

        <div>
            {ScoutOpportunities?.map((data)=>(
                <div className='post2-continer' style={{marginLeft:'0rem'}}>
   
   <div className='text2' >
   <div className='d-flex justify-content-between' >
   <div className="poster">
   <div className="Simplilearn" style={{marginTop:'0.7rem'}}>
       <img src={profileData.image?profileData.image:profileData.social_image}
        alt="Img" style={{height:"50px", width:"50px", borderRadius:"50%"}}/>
       <p className='post-username'>{profileData.user_name} <br /> 

       </p> 
    
   </div>
   

</div>
 <Dropdown>
      <Dropdown.Toggle variant=""  className="edit">
         <BsThreeDotsVertical fontSize="1.5rem"  />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="" className='p-2' ><CiLink className='me-2' color='#9D9C9D'/>Copy link to Post</Dropdown.Item>
        <Dropdown.Item href="" className='mt-1 p-2' onClick={() => handleChangeState(data.id)}> 
        {data.status=='open'?   <><MdOutlineCancel className='me-2' color='#9D9C9D' />Discard Opportunity</>:
        <><AiOutlineReload className='me-2' color='#9D9C9D' />Reopen Opportunity</>}
<><MdOutlineCancel className='me-2' color='#9D9C9D' />Discard Opportunity</>
        </Dropdown.Item>
       
      </Dropdown.Menu>
    </Dropdown>
   

</div>

<div>

</div>
<div className="opp-container mt-1" style={{border: '1px solid rgba(225, 225, 225, 1)',padding:'2rem'}}>
       <h5 className='postOpp-title'>{data.title}</h5>
       <div className='d-flex'>
                                    <p className='me-5 blog-sub'>{data.country.name}
                                    <RxDividerVertical color="gray" size={30} className='' />
                                    {data.position && data.position.name}
                             
                                    </p>
        </div>
        <p className='postOpp-desc'> {displayDescription}
        {
            isExpanded?(
                <div className='mt-4'>
                <p className='postOpp-title'>Requirements</p>
                <ul dangerouslySetInnerHTML={{ __html: data.requirements }}></ul>

                <p className='postOpp-title'>Additional Information</p>
                <ul dangerouslySetInnerHTML={{ __html: data.requirements }}></ul>
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
            ))}
   

        </div>
    )
}

export default OppProfileScout;