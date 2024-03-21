import React,{useState,useContext} from 'react';
import { RxDividerVertical } from "react-icons/rx";
import { Button } from 'react-bootstrap';
import { IoMdArrowDropdown,IoMdArrowDropup } from "react-icons/io";
import {Row,Col} from 'react-bootstrap';
import { useLocation,Link } from 'react-router-dom';
import { BsThreeDotsVertical } from "react-icons/bs";
import Dropdown from 'react-bootstrap/Dropdown';
import { CiLink } from "react-icons/ci";
import { MdOutlineCancel } from "react-icons/md";
import cancel from '../../assets/imgs/cancel.png';
import { AiOutlineReload } from "react-icons/ai";
import useAxios from '../Auth/useAxiosHook.interceptor';
import { message } from 'antd';
import collpase from '../../assets/imgs/collapse.svg';
import UnCollpase from '../../assets/imgs/unCollapse.svg';
import { UserDataContext } from '../UserContext/UserData.context';
import { FaArrowRight } from "react-icons/fa";

function Opportunity({data}){

    const location = useLocation();
    const { user } = useContext(UserDataContext);
    const isAppliedPath = location.pathname === '/applied/list';
    const axios=useAxios();
    const [isExpanded, setIsExpanded] = useState(false);
    const opportunityData='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi  ut aliquip ex ea commodo consequat. sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '
    const titles=[
        {title:'Age',name:`${data.from_age}-${data.to_age}`},
        {title:'Height',name:`${data.from_height}-${data.to_height}`},
        {title:'Weight',name:`${data.from_weight}-${data.to_weight}`},
        {title:'gender',name:data.gender},
        {title:'Preferred Foot',name:data.foot}
    ]
   
    const handleApply = (id) => {
        axios.get(`/opportunities/apply/${id}`);
        console.log('apply saved',id)
     }
 
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
        
        <div className='post2-continer'>
        {isAppliedPath?(<p className='time-applied'>{data.created_at}</p>):(null)}
   
   <div className='text2'>
   <div className='d-flex justify-content-between'>
   <div className="poster">
   <div className="Simplilearn">
       <img src={user.userData.profile.type_name=="club"?data.user.profile.club_logo:data.user.image} alt="Img" style={{height:"50px", width:"50px", borderRadius:"50%"}}/>
       <p className='post-username'>{user.userData.profile.type_name=="club"?data.user.profile.club_name:data.user.user_name} <br /> 
       <div className='d-flex'>
                                    <p className='me-5 blog-sub'>{data.country.name}
                                    <RxDividerVertical color="gray" size={30} className='' />
                                    {data.position && data.position.name}
                                    </p>
        </div>
       </p> 
    
   </div>
   

</div>
{isAppliedPath?( 
    <div className='d-flex'>
        <Link className='seeApplicants' to={`/profiles/applied/${data.title}/${data.id}`}>32 Applicants <FaArrowRight color='#1d71b8' /></Link>
<Dropdown >
      <Dropdown.Toggle variant=""  className="edit">
         <BsThreeDotsVertical fontSize="1.5rem"  />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="" className='p-2' ><CiLink className='me-2' color='#9D9C9D'/>Copy link to Post</Dropdown.Item>
        <Dropdown.Item href="" className='mt-1 p-2' onClick={() => handleChangeState(data.id)}> 
        {data.status=='open'?   <><MdOutlineCancel className='me-2' color='#9D9C9D' />Discard Opportunity</>:
        <><AiOutlineReload className='me-2' color='#9D9C9D' />Reopen Opportunity</>}

        </Dropdown.Item>
       
      </Dropdown.Menu>
    </Dropdown>
    </div>
    ):(<Button className='apply-btn' onClick={() => handleApply(data.id)}>Apply Now</Button>  )}
   

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
        {/* {isExpanded?<IoMdArrowDropup onClick={handleExpandClick} color='gray' fontSize={30} />:<IoMdArrowDropdown onClick={handleExpandClick} color='gray' fontSize={30} />} */}
        {isExpanded? <img src={UnCollpase} onClick={handleExpandClick} />:<img src={collpase} onClick={handleExpandClick} />}
        </div>

  
</div>

 </div>
       
</div>

</div>
    )
}

export default Opportunity;