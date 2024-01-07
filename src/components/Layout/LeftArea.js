import React,{useState} from 'react'
import {FaMedrt,FaFontAwesomeFlag, FaFacebookMessenger, FaAngleDown, FaUserFriends, FaSearch, FaGrin, FaRegThumbsUp, FaCommentAlt, FaRegShareSquare} from 'react-icons/fa'
import {MdVideoCall, MdMoreHoriz} from 'react-icons/md'
import {AiFillFileImage} from 'react-icons/ai'
import { FaRegNewspaper,FaPeopleGroup } from "react-icons/fa6";
import { FaRegSquare } from "react-icons/fa";
import { CiSaveDown2 } from "react-icons/ci";
import { Button } from 'react-bootstrap';
import asset2 from '../../assets/imgs/Asset2.svg'
import { IoMdHome } from "react-icons/io";
import { RiFootballLine } from "react-icons/ri";
import { TbUserSearch } from "react-icons/tb";
import { FaRegLightbulb } from "react-icons/fa";
import { FaFlag } from "react-icons/fa";


function LeftArea() {
    const [activeLink, setActiveLink] = useState(null);

    const handleNavLinkClick = (index,sectionId) => {
        setActiveLink(index);
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      };


    return(
        <div className='leftside-container'>
            
            <div className="Pro">
            <IoMdHome  fontSize="1.5rem" className={`${activeLink === 1 ? 'active' : ''}`}/>
            <div onClick={() => handleNavLinkClick(1)} >Home</div>
            </div>
            <hr style={{color:'#B0B0B0'}}/>
            <div className="Pro">
                <RiFootballLine  fontSize="1.3rem" className={`${activeLink === 2 ? 'active' : ''}`}/>
                <div onClick={() => handleNavLinkClick(2)} >Clubs</div>
            </div>
            <hr style={{color:'#B0B0B0'}} />
            <div className="Pro">
                <TbUserSearch  fontSize="1.3rem" className={`${activeLink === 3 ? 'active' : ''}`}/>
                <div onClick={() => handleNavLinkClick(3)} >Scouts</div>
            </div>
            <hr style={{color:'#B0B0B0'}} />
            <div className="Pro">
                <FaRegLightbulb  fontSize="1.3rem"  className={`${activeLink === 4 ? 'active' : ''}`}/>
                <div onClick={() => handleNavLinkClick(4)} style={{fontSize:'11px'}}>Opportunities</div>
            </div>
            <hr style={{color:'#B0B0B0'}} />
            <div className="Pro">
                <FaFlag  fontSize="1.3rem" className={`${activeLink === 5 ? 'active' : ''}`}/>
                <div onClick={() => handleNavLinkClick(5)} >Challenges</div>
            </div>
            
            <hr style={{color:'#B0B0B0'}} />
            <div className="Pro">
                <CiSaveDown2  fontSize="1.3rem"  className={`${activeLink === 6 ? 'active' : ''}`}/>
                <div onClick={() => handleNavLinkClick(6)}>saved</div>
            </div>
           
            <br></br>
            

        </div>
    )
}

export default LeftArea;
