import React,{useState} from 'react'
import { CiSaveDown2 } from "react-icons/ci";
import { Button } from 'react-bootstrap';
import asset2 from '../../assets/imgs/Asset2.svg'
import { IoMdHome } from "react-icons/io";
import { RiFootballLine } from "react-icons/ri";
import { TbUserSearch } from "react-icons/tb";
import { FaRegLightbulb } from "react-icons/fa";
import { FaFlag } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';


function LeftArea() {
    const [activeLink, setActiveLink] = useState(null);
    const navigate=useNavigate();

    const handleNavLinkClick = (index,redirect) => {
        setActiveLink(index);
        navigate(redirect);
      };


    return(
        <div className='leftside-container'>
            
            <div className="Pro">
            <IoMdHome  fontSize="1.5rem" className={`${activeLink === 1 ? 'active' : ''}`}/>
            <div onClick={() => handleNavLinkClick(1,'/home')} >Home</div>
            </div>
            <hr style={{color:'#B0B0B0'}}/>
            <div className="Pro">
                <RiFootballLine  fontSize="1.3rem" className={`${activeLink === 2 ? 'active' : ''}`}/>
                <div onClick={() => handleNavLinkClick(2,'/clubs')} >Clubs</div>
            </div>
            <hr style={{color:'#B0B0B0'}} />
            <div className="Pro">
                <TbUserSearch  fontSize="1.3rem" className={`${activeLink === 3 ? 'active' : ''}`}/>
                <div onClick={() => handleNavLinkClick(3,'/scouts')} >Scouts</div>
            </div>
            <hr style={{color:'#B0B0B0'}} />
            <div className="Pro">
                <FaRegLightbulb  fontSize="1.3rem"  className={`${activeLink === 4 ? 'active' : ''}`}/>
                <div onClick={() => handleNavLinkClick(4,'/Opportunities')} style={{fontSize:'11px'}}>Opportunities</div>
            </div>
            <hr style={{color:'#B0B0B0'}} />
            <div className="Pro">
                <FaFlag  fontSize="1.3rem" className={`${activeLink === 5 ? 'active' : ''}`}/>
                <div onClick={() => handleNavLinkClick(5,'/challenges')} >Challenges</div>
            </div>
            
            <hr style={{color:'#B0B0B0'}} />
            <div className="Pro">
                <CiSaveDown2  fontSize="1.3rem"  className={`${activeLink === 6 ? 'active' : ''}`}/>
                <div onClick={() => handleNavLinkClick(6,'/saved')}>saved</div>
            </div>
           
            <br></br>
            

        </div>
    )
}

export default LeftArea;
