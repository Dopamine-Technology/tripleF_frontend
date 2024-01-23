import React,{useState} from 'react'
import { CiSaveDown2 } from "react-icons/ci";
import { IoMdHome } from "react-icons/io";
import { RiFootballLine } from "react-icons/ri";
import { RiUserSearchLine } from "react-icons/ri";
import { PiLightbulbFilamentLight } from "react-icons/pi";
import { FaFlagCheckered } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { CiMenuBurger } from "react-icons/ci";
import savedIcon from '../../assets/imgs/Saved.svg';
import scoutIcon from '../../assets/imgs/Scouts.svg';

function LeftArea({ isCollapsed }) {
    const [activeLink, setActiveLink] = useState(1);
    // const [isCollapsed, setIsCollapsed] = useState(false);
    const navigate=useNavigate();

    const handleNavLinkClick = (index,redirect) => {
        setActiveLink(index);
        navigate(redirect);
      };

    //   const toggleSidebar = () => {
    //     setIsCollapsed(!isCollapsed);
    //   };


    return(
        <div>
      
      {/* <CiMenuBurger onClick={toggleSidebar} className="burger-button" /> */}
        <div className={`leftside-container ${isCollapsed ? 'collapsed' : ''}`}>
            
            <div className="Pro" onClick={() => handleNavLinkClick(1,'/home')} >
            <IoMdHome  fontSize="1.5rem" className={`${activeLink === 1 ? 'activeLink' : 'not-active'}`}/>
            <div >
            {!isCollapsed && <div>Home</div>}
                </div>
            </div>
            <hr style={{color:'#B0B0B0',width:'130%'}} />
            <div className="Pro" onClick={() => handleNavLinkClick(2,'/clubs')}>
                <RiFootballLine  fontSize="1.3rem" className={`${activeLink === 2 ? 'activeLink' : 'not-active'}`}/>
                <div  >
                {!isCollapsed && <div >Clubs</div>}
                </div>
            </div>
            <hr style={{color:'#B0B0B0',width:'130%'}} />
            <div className="Pro" onClick={() => handleNavLinkClick(3, '/scouts')}>
                <img src={scoutIcon} />
                <div >
                {!isCollapsed && <div >Scouts</div>}
                </div>
            </div>
            <hr style={{color:'#B0B0B0',width:'130%'}} />
            <div className="Pro" onClick={() => handleNavLinkClick(4,'/Opportunities')} >
                <PiLightbulbFilamentLight  fontSize="1.3rem"  className={`${activeLink === 4 ? 'activeLink' : 'not-active'}`}/>
                <div style={{fontSize:'11px'}}>
                {!isCollapsed && <div >Opportunities</div>}
                </div>
            </div>
            <hr style={{color:'#B0B0B0',width:'130%'}} />
            <div className="Pro" onClick={() => handleNavLinkClick(5,'/challenges')}>
                <FaFlagCheckered  fontSize="1.3rem" className={`${activeLink === 5 ? 'activeLink' : 'not-active'}`}/>
                <div  >
                {!isCollapsed && <div>Challenges</div>}
                </div>
            </div>
            
            <hr style={{color:'#B0B0B0',width:'130%'}} />
            <div className="Pro" onClick={() => handleNavLinkClick(6,'/saved')}>
                {/* <CiSaveDown2  fontSize="1.3rem"  className={`${activeLink === 6 ? 'activeLink' : 'not-active'}`}/> */}
                <img src={savedIcon} />
                <div>
                    {!isCollapsed && <div >Saved</div>}</div>
            </div>
           
            <br></br>
            

        </div>
        </div>
    )
}

export default LeftArea;
