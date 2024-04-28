import React,{useState,useContext,useEffect} from 'react'
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
import dropdownImg from '../../assets/imgs/dropdown.svg';
import ChallengesIcon from '../../assets/imgs/ChallengesIcon.svg';
import ClubIcon from '../../assets/imgs/clubIcon.svg';
import coach from '../../assets/imgs/coaches.png';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../LanguageContext/LanguageProvider';


function LeftArea({ isCollapsed, toggleCollapse }) {
    const [activeLink, setActiveLink] = useState(1);
    const navigate=useNavigate();
    const { user } = useContext(UserDataContext);
    const [isNavLinkVisible, setIsNavLinkVisible] = useState(false);

    const { language, changeLanguage } = useLanguage(); // Access language context
    const [direction, setDirection] = useState('ltr');
    const [t, i18n] = useTranslation();
  
    useEffect(() => {
      // Use the language obtained from the context
      if (language === 'ar') {
          setDirection('rtl');
      } else {
          setDirection('ltr');
      }
  }, [language]);

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
        {!isCollapsed && 
            <div className="Pro" onClick={() => handleNavLinkClick(1,'/home')} >
            <img src={HomeIcon} />
            <div>
            <div>{t('leftArea.home')}</div>
                </div>
            </div>}
            <hr style={{color:'#B0B0B0',width:'130%'}} />
            {!isCollapsed && 
            <div className="Pro" onClick={() => handleNavLinkClick(2,'/clubs/profiles/list')}>
                <img src={ClubIcon} />
                <div>
                {!isCollapsed && <div >{t('leftArea.clubs')}</div>}
                </div>
            </div>}
            <hr style={{color:'#B0B0B0',width:'130%'}} />
            {!isCollapsed && 
            <div className="Pro" onClick={() => handleNavLinkClick(3, '/scouts/profiles/list')}>
                <img src={scoutIcon} />
                <div>
                {!isCollapsed && <div >{t('leftArea.scouts')}</div>}
                </div>
            </div>}
            <hr style={{color:'#B0B0B0',width:'130%'}} />

            {!isCollapsed && 
            <div className="Pro" onClick={() => handleNavLinkClick(3, '/coaches/profiles/list')}>
                <img src={coach} />
                <div>
                {!isCollapsed && <div >{t('leftArea.coaches')}</div>}
                </div>
            </div>}
            <hr style={{color:'#B0B0B0',width:'130%'}} />

            {!isCollapsed && 
            <div className="Pro" onClick={() => handleNavLinkClick(3, '/talents/profiles/list')}>
                <img src={coach} />
                <div>
                {!isCollapsed && <div >{t('leftArea.talents')}</div>}
                </div>
            </div>}
            <hr style={{color:'#B0B0B0',width:'130%'}} />
            {!isCollapsed && 
            <div className="Pro" onClick={() => handleOppClick(4,'/Opportunities')} >
            <img src={OpportunitiesIcon} />
            <div style={{fontSize:'15px'}}>
                {user.userData.profile.type_name=="talent"?(!isCollapsed && <div > <span className='me-3'>{t('leftArea.opportunities')}</span> <img src={dropdownImg} /></div>):(!isCollapsed && <div >{t('leftArea.opportunities')} <img src={dropdownImg} /> </div>)}  
                </div>
            </div>}
            {isNavLinkVisible && (
        <div style={{marginLeft:'0.5rem'}} className='mt-3'>
       <div onClick={() => handleNavLinkClick(7,'/opportunity/list')} className={`Pro ${activeLink === 7 ? 'activeSubLink' : 'not-activeSub'}`}>
            
                <div>
                {!isCollapsed && <div >{t('leftArea.findOpportunities')}</div>}
                </div>
            </div>
            <hr style={{color:'#B0B0B0',width:'130%'}} />
            <div  onClick={() => handleNavLinkClick(8, '/applied/list')} className={`Pro ${activeLink === 8 ? 'activeSubLink' : 'not-activeSub'}`}>
                
                <div  >
                {!isCollapsed && <div >{t('leftArea.myOpportunities')}</div>}
                </div>
            </div>
        </div>
      )}
            <hr style={{color:'#B0B0B0',width:'130%'}} />
            {      !isCollapsed && 
            <div className="Pro" onClick={() => handleNavLinkClick(5,'/challenges')}>
                 <img src={ChallengesIcon} alt="Saved Icon" className="icon"  />
                <div  >
                {!isCollapsed && <div>{t('leftArea.challenges')}</div>}
                </div>
            </div>
}
            <hr style={{color:'#B0B0B0',width:'130%'}} />
            {      !isCollapsed && 
            <div className="Pro" onClick={() => handleNavLinkClick(6,'/saved')}>
                <img src={savedIcon} alt="Saved Icon" className="icon"  />
                <div>
                    {!isCollapsed && <div >{t('leftArea.saved')}</div>}</div>
              </div>
}
            <br></br>
            
        </div>
        </div>
    )
}

export default LeftArea;
