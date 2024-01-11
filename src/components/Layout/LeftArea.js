import React,{useState} from 'react'
import { CiSaveDown2 } from "react-icons/ci";
import { IoMdHome } from "react-icons/io";
import { RiFootballLine } from "react-icons/ri";
import { RiUserSearchLine } from "react-icons/ri";
import { PiLightbulbFilamentLight } from "react-icons/pi";
import { FaFlagCheckered } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { CiMenuBurger } from "react-icons/ci";


function LeftArea() {
    const [activeLink, setActiveLink] = useState(1);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const navigate=useNavigate();

    const handleNavLinkClick = (index,redirect) => {
        setActiveLink(index);
        navigate(redirect);
      };

      const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
      };


    return(
        <div>
      
      <CiMenuBurger onClick={toggleSidebar} className="burger-button" />
        <div className={`leftside-container ${isCollapsed ? 'collapsed' : ''}`}>


            
            <div className="Pro">
            <IoMdHome  fontSize="1.5rem" className={`${activeLink === 1 ? 'activeLink' : 'not-active'}`}/>
            <div onClick={() => handleNavLinkClick(1,'/home')} >Home</div>
            </div>
            <hr style={{color:'#B0B0B0'}} />
            <div className="Pro">
                <RiFootballLine  fontSize="1.3rem" className={`${activeLink === 2 ? 'activeLink' : 'not-active'}`}/>
                <div onClick={() => handleNavLinkClick(2,'/clubs')} >Clubs</div>
            </div>
            <hr style={{color:'#B0B0B0'}} />
            <div className="Pro">
                <RiUserSearchLine  fontSize="1.3rem" className={`${activeLink === 3 ? 'activeLink' : 'not-active'}`}/>
                <div onClick={() => handleNavLinkClick(3,'/scouts')} >Scouts</div>
            </div>
            <hr style={{color:'#B0B0B0'}} />
            <div className="Pro">
                <PiLightbulbFilamentLight  fontSize="1.3rem"  className={`${activeLink === 4 ? 'activeLink' : 'not-active'}`}/>
                <div onClick={() => handleNavLinkClick(4,'/Opportunities')} style={{fontSize:'11px'}}>Opportunities</div>
            </div>
            <hr style={{color:'#B0B0B0'}} />
            <div className="Pro">
                <FaFlagCheckered  fontSize="1.3rem" className={`${activeLink === 5 ? 'activeLink' : 'not-active'}`}/>
                <div onClick={() => handleNavLinkClick(5,'/challenges')} >Challenges</div>
            </div>
            
            <hr style={{color:'#B0B0B0'}} />
            <div className="Pro">
                <CiSaveDown2  fontSize="1.3rem"  className={`${activeLink === 6 ? 'activeLink' : 'not-active'}`}/>
                <div onClick={() => handleNavLinkClick(6,'/saved')}>saved</div>
            </div>
           
            <br></br>
            

        </div>
        </div>
    )
}

export default LeftArea;
