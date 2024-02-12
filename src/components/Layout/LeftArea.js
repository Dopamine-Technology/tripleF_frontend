import React,{useState,useContext} from 'react'
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
import OpportunitiesIcon from '../../assets/imgs/OpportunitiesIcon.svg';
import './Navbar.css';
import { UserDataContext } from '../../components/UserContext/UserData.context';
import { NavLink } from 'react-bootstrap';
import HomeIcon from '../../assets/imgs/home.svg';
import dropdownImg from '../../assets/imgs/dropdown.svg'

function LeftArea({ isCollapsed }) {
    const [activeLink, setActiveLink] = useState(1);
    const navigate=useNavigate();
    const { user } = useContext(UserDataContext);
    const [isNavLinkVisible, setIsNavLinkVisible] = useState(false);

    const handleNavLinkClick = (index,redirect) => {
        setActiveLink(index);
        
        navigate(redirect);
      };

      const handleOppClick = (index) => {
        setActiveLink(index);
        setIsNavLinkVisible(!isNavLinkVisible);
      };


    return(
        <div>
      
        <div className={`leftside-container  ${isCollapsed ? 'collapsed' : ''}`}>
            
            <div className="Pro" onClick={() => handleNavLinkClick(1,'/home')} >
            <img src={HomeIcon} />
            <div>
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
                <div>
                {!isCollapsed && <div >Scouts</div>}
                </div>
            </div>
            <hr style={{color:'#B0B0B0',width:'130%'}} />
            <div className="Pro" onClick={() => handleOppClick(4,'/Opportunities')} >
            <img src={OpportunitiesIcon} />
                <div style={{fontSize:'15px'}}>
                {user.userData.profile.type_name=="talent"?(!isCollapsed && <div > <span className='me-3'>Opportunities</span> <img src={dropdownImg} /></div>):(!isCollapsed && <div >My Opportunities </div>)}
    
                
                </div>

            </div>

            
            {isNavLinkVisible && (
        <div style={{marginLeft:'0.5rem'}} className='mt-3'>
       <div onClick={() => handleNavLinkClick(7,'/opportunity/list')} className={`Pro ${activeLink === 7 ? 'activeSubLink' : 'not-activeSub'}`}>
            
                <div>
                {!isCollapsed && <div >Find Opportunity</div>}
                </div>
            </div>
            <hr style={{color:'#B0B0B0',width:'130%'}} />
            <div  onClick={() => handleNavLinkClick(8, '/applied/list')} className={`Pro ${activeLink === 8 ? 'activeSubLink' : 'not-activeSub'}`}>
                
                <div  >
                {!isCollapsed && <div >My Opportunities</div>}
                </div>
            </div>
        </div>
      )}
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
