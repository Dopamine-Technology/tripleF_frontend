import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Modal } from 'react-bootstrap';
import useAxios from '../Auth/useAxiosHook.interceptor';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../LanguageContext/LanguageProvider';
import FollowBtn from '../Profile/FollowBtn';
import { useNavigate, Link } from 'react-router-dom';
import { useScreenWidth } from '../ScreenWidthContext/ScreenWidth.context';
import Stories from 'stories-react';

function RightArea() {
  const [clubData, setClubData] = useState([]);
  const [scoutData, setScoutData] = useState([]);
  const [talentData, setTalentData] = useState([]);
  const [show, setShow] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);

  const axios = useAxios();
  const { language } = useLanguage();
  const [direction, setDirection] = useState('ltr');
  const [t] = useTranslation();
  const [followersCount, setFollowersCount] = useState(0);
  const navigate = useNavigate();
  const { windowWidth, isSmallScreen } = useScreenWidth();

  const updateFollowersCount = (count) => {
    setFollowersCount((prevCount) => prevCount + count);
  };

  useEffect(() => {
    const fetchClubData = async () => {
      try {
        const requestBody = {
          type: 1,
          limit: 5,
          index: 0,
        };

        const response = await axios.post('profiles/clubs', requestBody);
        setClubData(response.data.result.slice(0, 5));
      } catch (error) {
        console.error('Error fetching club data:', error);
      }
    };

    const fetchScoutData = async () => {
      try {
        const requestBody = {
          type: 1,
          limit: 5,
          index: 0,
        };

        const response = await axios.post('profiles/scout', requestBody);
        setScoutData(response.data.result.slice(0, 5));
      } catch (error) {
        console.error('Error fetching scout data:', error);
      }
    };

    const fetchTalentData = async () => {
      try {
        const response = await axios.get('challenge/get_recommended');
        setTalentData(response.data.result.slice(0, 5));
      } catch (error) {
        console.error('Error fetching talent data:', error);
      }
    };

    fetchClubData();
    fetchScoutData();
    fetchTalentData();
  }, [axios]);

  const handleToggleFollow = async (id) => {
    try {
      const response = await axios.get(`follow/toggle/${id}`);
      console.log('Follow status toggled:', response.data);
      setClubData((prevData) => prevData.filter((club) => club.id !== id));
    } catch (error) {
      console.error('Error toggling follow:', error);
    }
  };

  const handleDiscoverClick = (navigationLink) => {
    navigate(navigationLink);
  };

  const renderDataSection = (sectionTitle, sectionData, isTalent, isClub, isScout, navigationLink) => (
    <div className="RightArea" key={sectionTitle}>
      <div className="RecommendedChallenges">
        <h5>{sectionTitle}</h5>
        <hr style={{ color: 'black' }} />
      </div>
      {sectionData && sectionData.length > 0 ? (
        sectionData.map((item, index) => (
          <div className="Profile" key={index}>
            <img
              src={isTalent ? item.user.image : item.image}
              alt="Profile Pic"
              className={!isClub ? `rightSide-img` : ''}
              style={{ height: '3rem', width: '3rem', borderRadius: '60%', backgroundColor: '#213555' }}
              onClick={isTalent ? () => { setCurrentVideo(item.video); setShow(true); } : undefined}
            />
            <div>
              <Link to={`/profile/${item.id}`} style={{ textDecoration: 'none', color: 'none' }}>
                <span className={isClub ? 'username' : 'username'}>
                  {isTalent ? item.user.user_name : isClub ? item.profile.club_name : item.user_name ? item.user_name : item.first_name + item.last_name}
                </span>
              </Link>
              <br />
              {isClub || isScout ? (
                <FollowBtn
                  id={item.id}
                  is_followed={item.isFollowed}
                  updateFollowersCount={updateFollowersCount}
                  updateIsFollowed={(isFollowed) => {
                    const updatedData = sectionData.map((dataItem) => {
                      if (dataItem.id === item.id) {
                        return { ...dataItem, isFollowed: !item.isFollowed };
                      }
                      return dataItem;
                    });
                    if (isClub) {
                      setClubData(updatedData);
                    } else if (isScout) {
                      setScoutData(updatedData);
                    }
                  }}
                />
              ) : (
                <span className="challenge-type">{item.challenge.name}</span>
              )}
            </div>
          </div>
        ))
      ) : (
        <p>No data available</p>
      )}
      <Button className="discover-btn" onClick={() => handleDiscoverClick(navigationLink)}>{t('mainarea.discoverBtn')}</Button>
    </div>
  );

  return (
    <div>
      {renderDataSection(t('mainarea.recommendedChallenges'), talentData, true, false, false, 'talents/profiles/list')}
      {renderDataSection(t('mainarea.followClubs'), clubData, false, true, false, 'clubs/profiles/list')}
      {renderDataSection(t('mainarea.followScouts'), scoutData, false, false, true, 'scouts/profiles/list')}
      
      <Modal show={show} onHide={() => setShow(false)} size="md">
        <Modal.Body style={{ backgroundColor: 'black', padding: 0 }}>
          <Row className='row-profiles' style={{ margin: 0 }}>
            <Col sm={6} lg={8} style={{ backgroundColor: 'black', display: 'flex', justifyContent: 'center', marginLeft: '5rem', marginTop: '0rem' }}>
              {currentVideo && (
                <Stories
                  width={isSmallScreen ? "300px" : "500px"}
                  height={isSmallScreen ? "500px" : "700px"}
                  stories={[{ url: currentVideo, type: 'video', duration: 30000 }]}
                />
              )}
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default RightArea;
