import React,{useState,useContext,useLayoutEffect} from 'react';
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
import { useScreenWidth } from '../ScreenWidthContext/ScreenWidth.context';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../LanguageContext/LanguageProvider';

function Opportunity({data}){
    const { language, changeLanguage } = useLanguage(); 
    const [direction, setDirection] = useState('ltr');
    const [t, i18n] = useTranslation();
    const location = useLocation();
    const { user } = useContext(UserDataContext);
    const isAppliedPath = location.pathname === '/applied/list';
    const axios=useAxios();
    const [isExpanded, setIsExpanded] = useState(false);
    const opportunityData='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi  ut aliquip ex ea commodo consequat. sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '
    const titles=[
        {title:t('Opportunity.age'),name:`${data.from_age}-${data.to_age}`},
        {title:t('Register.height'),name:`${data.from_height}-${data.to_height}`},
        {title:t('Register.weight'),name:`${data.from_weight}-${data.to_weight}`},
        {title:t('Register.gender'),name:data.gender},
        {title:t('Register.preferredFoot'),name:data.foot}
    ]
   
    const handleApply = (id) => {
        axios.get(`/opportunities/apply/${id}`);
        message.success('you application sent successfully');
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
    const { windowWidth, isSmallScreen, isTabletScreen, isProScreen } = useScreenWidth();


    return(
        <div>
        
        <div className='post2-continer'>
        {isAppliedPath?(<p className='time-applied'>{data.created_at}</p>):(null)}
   
   <div className='text2'>
   <div className={isSmallScreen ? "" : "d-flex justify-content-between"}>
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
        <Link className='seeApplicants' to={`/profiles/applied/${data.title}/${data.id}`}>{data.applicants_count} {t('Opportunity.applicants')}<FaArrowRight color='#1d71b8' /></Link>
<Dropdown>
      <Dropdown.Toggle variant=""  className="edit">
         <BsThreeDotsVertical fontSize="1.5rem"  />
      </Dropdown.Toggle>

      <Dropdown.Menu className='w-auto'>
        <Dropdown.Item href="" className='p-2' ><CiLink className='me-1' color='#9D9C9D'/>{t('PostActions.copyLink')}</Dropdown.Item>
        <Dropdown.Item href="" className='mt-1 p-2' onClick={() => handleChangeState(data.id)}> 
        { user.userData.id==data.user.id?(
        data.status=='open'? 
        <><MdOutlineCancel className='me-1' color='#9D9C9D' />{t('Opportunity.closeOpportunity')}</>:
        <><AiOutlineReload className='me-2' color='#9D9C9D' />{t('Opportunity.openOpportunity')}</>):(<></>)}
        </Dropdown.Item>
       
      </Dropdown.Menu>
    </Dropdown>
    </div>
    ):(
        <>
     
    <Button className='apply-btn' onClick={() => handleApply(data.id)}>{t('Opportunity.applyNow')}</Button> 
    </>
     )}
   

</div>
<div>
           
            <div className={`four-div-container ${isSmallScreen?'':'d-flex'} `} >
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
                <p className='postOpp-title'>{t('Opportunity.requirements')}</p>
                <ul dangerouslySetInnerHTML={{ __html: data.requirements }}></ul>

                <p className='postOpp-title'>{t('Opportunity.additionalInformation')}</p>
                <ul dangerouslySetInnerHTML={{ __html: data.additional_info }}></ul>
                </div>
            ):(null)
        }
        </p>

       <div className="center-icon" >
       
        {isExpanded? <img src={UnCollpase} onClick={handleExpandClick} />:<img src={collpase} onClick={handleExpandClick} />}
        </div>

  
</div>

 </div>
       
</div>

</div>
    )
}

export default Opportunity;