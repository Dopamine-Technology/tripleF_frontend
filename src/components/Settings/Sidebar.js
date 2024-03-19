import React, { useState, useContext } from 'react';
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
import Notification from '../../assets/imgs/notificationProfile.svg';

function Sidebar({ isCollapsed, toggleCollapse }) {
  const [activeLink, setActiveLink] = useState(1);
  const navigate = useNavigate();
  const { user } = useContext(UserDataContext);
  const [isNavLinkVisible, setIsNavLinkVisible] = useState(false);

  const handleNavLinkClick = (index, redirect) => {
    setActiveLink(index);
    navigate(redirect);
  };

  const handleOppClick = (index) => {
    setActiveLink(index);
    setIsNavLinkVisible(!isNavLinkVisible);
  };

  // Define a function to render the appropriate icon based on the active link
  const renderIcon = (index) => {
    switch (index) {
      case 1:
        return activeLink === index ? myAccount : Change;
      case 2:
        return activeLink === index ? Change : myAccount;
      case 3:
        return activeLink === index ? Notification : Change;
      // Add more cases as needed for additional sidebar items
      default:
        return null;
    }
  };
  return (
    <div>
      <div className={`leftside-container  ${isCollapsed ? 'collapsed' : ''}`}>
        {!isCollapsed && (
          <div className="Pro" onClick={() => handleNavLinkClick(1, '/settings/myAccount')}>
            <img src={renderIcon(1)} /> {/* Render icon based on active link */}
            <div>
              <div>My Account </div>
            </div>
          </div>
        )}
        <hr style={{ color: '#B0B0B0', width: '130%' }} />
        {!isCollapsed && (
          <div className="Pro" onClick={() => handleNavLinkClick(2, '/settings/changePassword')}>
            <img src={renderIcon(2)} /> {/* Render icon based on active link */}
            <div>
              {!isCollapsed && <div>Change Password </div>}
            </div>
          </div>
        )}
        <hr style={{ color: '#B0B0B0', width: '130%' }} />
        {!isCollapsed && (
          <div className="Pro" onClick={() => handleNavLinkClick(3, '/settings/ControlNofification')}>
            <img src={renderIcon(3)} /> {/* Render icon based on active link */}
            <div>
              {!isCollapsed && <div>Notifications </div>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
