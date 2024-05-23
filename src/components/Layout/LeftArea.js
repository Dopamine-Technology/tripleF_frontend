import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { UserDataContext } from "../../components/UserContext/UserData.context";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../LanguageContext/LanguageProvider";
import HomeIcon from "../../assets/imgs/home.svg";
import ClubIcon from "../../assets/imgs/clubIcon.svg";
import scoutIcon from "../../assets/imgs/Scouts.svg";
import coach from "../../assets/imgs/coaches.png";
import OpportunitiesIcon from "../../assets/imgs/OpportunitiesIcon.svg";
import dropdownImg from "../../assets/imgs/dropdown.svg";
import ChallengesIcon from "../../assets/imgs/ChallengesIcon.svg";
import savedIcon from "../../assets/imgs/Saved.svg";
import talents from "../../assets/imgs/telents.png";
import HomeActive from "../../assets/imgs/homeActive.svg";
import ClubsActive from "../../assets/imgs/ClubsActive.svg";
import ScoutsActive from "../../assets/imgs/scoutActive.svg";
import CoachActive from "../../assets/imgs/coachActive.svg";
import TalentActive from "../../assets/imgs/talentsActive.svg";
import oppActive from "../../assets/imgs/OpportunitiesActive.svg";
import SavedActive from "../../assets/imgs/savedActive.svg";

function LeftArea({ isCollapsed, toggleCollapse }) {
  const [activeLink, setActiveLink] = useState(1);
  const navigate = useNavigate();
  const { user } = useContext(UserDataContext);
  const [isNavLinkVisible, setIsNavLinkVisible] = useState(false);
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const { language, changeLanguage } = useLanguage(); // Access language context
  const [direction, setDirection] = useState("ltr");

  useEffect(() => {
    // Use the language obtained from the context
    if (language === "ar") {
      setDirection("rtl");
    } else {
      setDirection("ltr");
    }
  }, [language]);

  useEffect(() => {
    // Extract the current pathname and set the activeLink state based on it
    const pathname = location.pathname;
    if (pathname === "/home") {
      setActiveLink(1);
    } else if (pathname === "/clubs/profiles/list") {
      setActiveLink(2);
    } else if (pathname === "/scouts/profiles/list") {
      setActiveLink(3);
    } else if (pathname === "/coaches/profiles/list") {
      setActiveLink(4);
    } else if (pathname === "/talents/profiles/list") {
      setActiveLink(5);
    } else if (pathname === "/Opportunities") {
      setActiveLink(6);
    } else if (pathname === "/challenges") {
      setActiveLink(7);
    } else if (pathname === "/saved") {
      setActiveLink(8);
    }
  }, [location.pathname]);

  const handleNavLinkClick = (index, redirect) => {
    setActiveLink(index);
    navigate(redirect);
  };

  const handleOppClick = (index) => {
    setActiveLink(index);
    setIsNavLinkVisible(!isNavLinkVisible);
  };

  return (
    <div>
      <div className={`leftside-container ${isCollapsed ? "collapsed" : ""}`}>
        {!isCollapsed && (
          <div
            className={`Pro ${activeLink === 1 ? "activeLink" : ""}`}
            onClick={() => handleNavLinkClick(1, "/home")}
          >
            <img src={activeLink == 1 ? HomeActive : HomeIcon} />
            <div>
              <div style={{ color: "black" }}>{t("leftArea.home")}</div>
            </div>
          </div>
        )}
        <hr style={{ color: "#B0B0B0", width: "130%" }} />
        {!isCollapsed && (
          <div
            className={`Pro ${activeLink === 2 ? "activeLink" : ""}`}
            onClick={() => handleNavLinkClick(2, "/clubs/profiles/list")}
          >
            <img src={activeLink == 2 ? ClubsActive : ClubIcon} />
            <div>
              {!isCollapsed && (
                <div style={{ color: "black" }}>{t("leftArea.clubs")}</div>
              )}
            </div>
          </div>
        )}
        <hr style={{ color: "#B0B0B0", width: "130%" }} />
        {!isCollapsed && (
          <div
            className={`Pro ${activeLink === 3 ? "activeLink" : ""}`}
            onClick={() => handleNavLinkClick(3, "/scouts/profiles/list")}
          >
            <img src={activeLink == 3 ? ScoutsActive : scoutIcon} />
            <div>
              {!isCollapsed && (
                <div style={{ color: "black" }}>{t("leftArea.scouts")}</div>
              )}
            </div>
          </div>
        )}
        <hr style={{ color: "#B0B0B0", width: "130%" }} />
        {!isCollapsed && (
          <div
            className={`Pro ${activeLink === 4 ? "activeLink" : ""}`}
            onClick={() => handleNavLinkClick(4, "/coaches/profiles/list")}
          >
            <img src={activeLink == 4 ? CoachActive : coach} />
            <div>
              {!isCollapsed && (
                <div style={{ color: "black" }}>{t("leftArea.coaches")}</div>
              )}
            </div>
          </div>
        )}
        <hr style={{ color: "#B0B0B0", width: "130%" }} />
        {!isCollapsed && (
          <div
            className={`Pro ${activeLink === 5 ? "activeLink" : ""}`}
            onClick={() => handleNavLinkClick(5, "/talents/profiles/list")}
          >
            <img src={activeLink == 5 ? TalentActive : talents} />
            <div>
              {!isCollapsed && (
                <div style={{ color: "black" }}>{t("leftArea.talents")}</div>
              )}
            </div>
          </div>
        )}
        <hr style={{ color: "#B0B0B0", width: "130%" }} />
        {!isCollapsed && (
          <div
            className={`Pro ${activeLink === 6 ? "activeLink" : ""}`}
            onClick={() => handleOppClick(6, "/Opportunities")}
          >
            <img src={activeLink == 6 ? oppActive : OpportunitiesIcon} />
            <div style={{ fontSize: "15px" }}>
              {user.userData.profile.type_id === "1"
                ? !isCollapsed && (
                    <div >
                      <span className="me-3">
                        {t("leftArea.opportunities")}
                      </span>{" "}
                      <img src={dropdownImg} />
                    </div>
                  )
                : !isCollapsed && (
                    <div style={{ color: "black" }}>
                      {t("leftArea.opportunities")} <img src={dropdownImg} />{" "}
                    </div>
                  )}
            </div>
          </div>
        )}
        {isNavLinkVisible && (
          <div style={{ marginLeft: "0.5rem" }} className="mt-3">
            <div
              onClick={() => handleNavLinkClick(7, "/opportunity/list")}
              className={`Pro ${
                activeLink === 7 ? "activeSubLink" : "not-activeSub"
              }`}
            >
              <div>
                {!isCollapsed && <div>{t("leftArea.findOpportunities")}</div>}
              </div>
            </div>
            <hr style={{ color: "#B0B0B0", width: "130%" }} />
            <div
              onClick={() => handleNavLinkClick(8, "/applied/list")}
              className={`Pro ${
                activeLink === 8 ? "activeSubLink" : "not-activeSub"
              }`}
            >
              <div>
                {!isCollapsed && (
                  <div style={{ color: "black" }}>
                    {t("leftArea.myOpportunities")}
                  </div>
                )}
              </div>
          
            </div>
          </div>
        )}
        {/* <hr style={{ color: "#B0B0B0", width: "130%" }} />
        {!isCollapsed && (
          <div
            className={`Pro ${activeLink === 7 ? "activeLink" : ""}`}
            onClick={() => handleNavLinkClick(7, "/challenges")}
          >
            <img src={ChallengesIcon} alt="Saved Icon" className="icon" />
            <div>
              {!isCollapsed && (
                <div style={{ color: "black" }}>{t("leftArea.challenges")}</div>
              )}
            </div>
          </div>
        )} */}
        <hr style={{ color: "#B0B0B0", width: "130%" }} />
        {!isCollapsed && (
          <div
            className={`Pro ${activeLink === 8 ? "activeLink" : ""}`}
            onClick={() => handleNavLinkClick(8, "/saved")}
          >
            <img
              src={activeLink == 8 ? SavedActive : savedIcon}
              alt="Saved Icon"
              className="icon"
            />
            <div>
              {!isCollapsed && (
                <div style={{ color: "black" }}>{t("leftArea.saved")}</div>
              )}
            </div>
          </div>
        )}
        <br></br>
      </div>
    </div>
  );
}

export default LeftArea;
