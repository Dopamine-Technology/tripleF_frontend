import React,{useState,useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import savedIcon from '../../assets/imgs/Saved.svg';
import scoutIcon from '../../assets/imgs/Scouts.svg';
import OpportunitiesIcon from '../../assets/imgs/OpportunitiesIcon.svg';
import '../Layout/Navbar.css';
import { UserDataContext } from '../../components/UserContext/UserData.context';
import HomeIcon from '../../assets/imgs/home.svg';
import dropdownImg from '../../assets/imgs/dropdown.svg';
import ChallengesIcon from '../../assets/imgs/ChallengesIcon.svg';
import ClubIcon from '../../assets/imgs/clubIcon.svg';
import myAccount from '../../assets/imgs/myAccount.svg';
import Change from '../../assets/imgs/change.svg';
import Notification from '../../assets/imgs/notificationProfile.svg'

function Sidebar({ isCollapsed, toggleCollapse }) {
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
        {!isCollapsed && 
            <div className="Pro" onClick={() => handleNavLinkClick(1,'/home')} >
            <img src={myAccount} />
            <div>
            <div>My Account </div>
                </div>
            </div>}
            <hr style={{color:'#B0B0B0',width:'130%'}} />
            {!isCollapsed && 
            <div className="Pro" onClick={() => handleNavLinkClick(2,'/clubs')}>
                <img src={Change} />
                <div>
                {!isCollapsed && <div >Change Password </div>}
                </div>
            </div>}
            <hr style={{color:'#B0B0B0',width:'130%'}} />
            {!isCollapsed && 
            <div className="Pro" onClick={() => handleNavLinkClick(3, '/scouts')}>
                <img src={Notification} />
                <div>
                {!isCollapsed && <div >Notifications </div>}
                </div>
            </div>}
            
        </div>
        </div>
    )
}

export default Sidebar;
