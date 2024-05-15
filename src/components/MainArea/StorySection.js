import React, { useState, useEffect, useContext, useRef,useLayoutEffect } from 'react';
import { FaPlus } from "react-icons/fa6";
import useAxios from "../Auth/useAxiosHook.interceptor";
import Stories from 'stories-react';
import 'stories-react/dist/index.css';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { Col, Row } from 'react-bootstrap';
import close from '../../assets/imgs/close.svg';
import { UserDataContext } from '../UserContext/UserData.context';
import { IoIosArrowForward } from "react-icons/io";
import { IoOpenOutline } from "react-icons/io5";
import { FcApproval } from "react-icons/fc";
import { Link } from 'react-router-dom';
import { useScreenWidth } from '../ScreenWidthContext/ScreenWidth.context';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../LanguageContext/LanguageProvider';

function StorySection() {
    const [timelineStories, setTimelineStories] = useState([]);
    const [myStories, setMyStories] = useState([]);
    const [selectedStory, setSelectedStory] = useState(null);
    const [show, setShow] = useState(false);
    const [showUserList, setShowUserList] = useState(true);
    const { user } = useContext(UserDataContext);
    const [currentUserIndex, setCurrentUserIndex] = useState(0); 
    const [currentStoryIndex, setCurrentStoryIndex] = useState(0); 
    const [seenStories, setSeenStories] = useState([]);
    const [viewedWithinModal, setViewedWithinModal] = useState(false);
    const [myStoryTime,setMyStoryTime]=useState('');
    const storyContainerRef = useRef(null);
    const { windowWidth, isSmallScreen, isTabletScreen, isProScreen } = useScreenWidth();
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


    const axios = useAxios();

    useEffect(() => {
        const fetchStoriesData = async () => {
            try {
                const response = await axios.get('status/stories');
                setTimelineStories(response.data.result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchStoriesData();
    }, []);

    useEffect(() => {
        const fetchMyStoriesData = async () => {
            try {
                const response = await axios.get(`status/user_stories/${user.userData.id}`);
                setMyStories(response.data.result);
                if (response.data.result.length > 0) {
                    const lastStoryCreatedAt = response.data.result[response.data.result.length - 1].created_at;
                    setMyStoryTime(lastStoryCreatedAt);
                    console.log('Last story time:', lastStoryCreatedAt);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchMyStoriesData();
    }, []);

    useEffect(() => {
        const currentUser = timelineStories[currentUserIndex];
        if (currentUser && currentStoryIndex >= currentUser.userStories?.length) {
            if (currentUserIndex < timelineStories?.length - 1) {
                setCurrentUserIndex(currentUserIndex + 1);
                setCurrentStoryIndex(0); 
                setSeenStories(prevSeenStories => [...prevSeenStories, user.userData.id]); 
            } else {
                if (currentStoryIndex === currentUser.userStories.length - 1) {
                    setShow(false); 
                }
            }
        } else {
            const timer = setTimeout(() => {
                goToNextStory();
            }, 30000); 
            return () => clearTimeout(timer);
        }
    }, [currentStoryIndex, currentUserIndex, timelineStories]);
    

    
    const handleStoryClick = (userIndex, storyIndex) => {
        if (userIndex === null) {
            setShow(true);
            setSelectedStory(userIndex); 
            setCurrentUserIndex(user.userData.id); 
            setSeenStories(prevSeenStories => [...prevSeenStories, user.userData.id]);
        } else {
            setCurrentUserIndex(userIndex); 
            setCurrentStoryIndex(storyIndex); 
            setShow(true);
            setSelectedStory(storyIndex);
            const userId = timelineStories[userIndex].id;
            setSeenStories(prevSeenStories => [...prevSeenStories, userId]);
        }
    };

   

    const goToNextStory = () => {
        const currentUser = timelineStories[currentUserIndex];
        if (currentUser && currentUser.userStories && currentStoryIndex < currentUser.userStories.length - 1) {
            setCurrentStoryIndex(currentStoryIndex + 1);
            setSeenStories(prevSeenStories => [...prevSeenStories, currentUser.id]); // Use currentUser.id
        } else if (currentUserIndex < timelineStories.length - 1) {
            setCurrentUserIndex(currentUserIndex + 1);
            setCurrentStoryIndex(0);
            setSeenStories(prevSeenStories => [...prevSeenStories, timelineStories[currentUserIndex + 1].id]); // Use the next user's ID
        } else {
            setShow(false);
        }
    };
    
    const handleCloseList = () => {
        setShowUserList(false);
    };
    const handleOpenList=()=>{
        setShowUserList(true);
    }
    return (
        <div className="story-section">
            <div className="story-container" ref={storyContainerRef}>
                <div className="story" onClick={() => handleStoryClick(null, null)}>
                    <img src={user.userData.profile.type_name=='club'?user.userData.profile.club_logo:user.userData.image} alt="Story" style={{ border: 'white',backgroundColor:'#213555',boxShadow:
                        seenStories.includes(user.userData.id) || myStories.is_seen
                            ? 'none'
                            : '', }} />
                    <span>Me</span>
                </div>
                {timelineStories.map((user2, userIndex) => (
                    <div key={userIndex}>
                        <div className="story" onClick={() => handleStoryClick(userIndex, 0)}>
                            <img src={user2.image} alt="Story"  style={{
                    boxShadow:
                        seenStories.includes(user2.id) || user2.is_seen
                            ? 'none'
                            : ''
                            ,backgroundColor:'#979797'
                }} />
                            <span >{user2.user_name}</span>
                        </div>
                    </div>
                ))}
            </div>
            <Modal show={show} onHide={() => setShow(false)} size={showUserList ? "xl" : "md"}>
                <Modal.Body style={{ backgroundColor: showUserList ? "white" : "black", padding: 0 }}> 
                {!showUserList&&<IoOpenOutline onClick={handleOpenList} color='white' size={28} />}
                    <Row className='row-profiles' style={{ margin: 0 }}>
                   
                        {showUserList && (
                            <Col sm={6} lg={4} className='bg-white h-100 m-0 p-0'  style={{ display: isSmallScreen ? 'none' : 'block' }}>
                                <div className="user-list" >
                                    <img src={close} className='mb-4' style={{ marginLeft: '1.5rem', marginTop: '2rem' }} onClick={handleCloseList} />
                                    <p className='all-challenges'>{t('mainarea.allChallenges')}</p>
                                    <div className="profiles-stories d-flex" >
                                          
                                          <img src={user.userData.profile.type_name=='club'?user.userData.profile.club_logo:user.userData.image} alt="Story"  style={{
                  boxShadow:
                      seenStories.includes(user.userData.id) 
                          ? 'none'
                          : ''
                          ,backgroundColor:'#979797'
              }}/>
               <Link to={`/profile/${user.userData.id}`} style={{textDecoration:'none'}}>
                                          <div className='time-username'>
                                              <span className='username'>{t('mainarea.me')}</span>
                                              <span className='time'>{myStoryTime}</span>
                                          </div>
                  </Link>
                                      
                                      </div>
                                      {timelineStories.map((user2, userIndex) => (
    <Link to={`/profile/${user2.id}`} style={{ textDecoration: 'none' }} key={userIndex}>
        <div className="profiles-stories d-flex" style={userIndex === currentUserIndex && currentStoryIndex > 0 ? { backgroundColor: '#ebeaed' } : null}>
            <img src={user2.image} alt="Story" style={{
                boxShadow: seenStories.includes(user2.id) || user2.seen ? 'none' : '',
                backgroundColor: '#979797'
            }} />
            <div className='time-username'>
                <span className='username'>{user2.user_name}</span>
                <span className='time' style={{ whiteSpace: 'nowrap' }}>
                {user2.stories[currentStoryIndex] && user2.stories[currentStoryIndex].created_at}
                </span>
            </div>
            {seenStories.includes(user2.id) || user2.seen ? <p className='seen'><FcApproval />{t('mainarea.seen')}</p> : null}
        </div>
    </Link>
))}

                                </div>
                            </Col>
                        )}
                        <Col sm={6} lg={8} style={{ backgroundColor: 'black', display: 'flex', justifyContent: 'center', marginLeft: showUserList ? "" : "5rem", marginTop: '0rem' }}>
                            {selectedStory !== null && (
                                <div className="owner-stories d-flex" style={{
                                    position: 'absolute',
                                    left: showUserList?'32rem':'2rem',
                                    top: '70px',
                                    zIndex: '2'
                                }}>
                                  <img src={timelineStories[currentUserIndex].image} alt="Story" />                   
                                    <div className='time-username'>
                                        <span className='username'>{timelineStories[currentUserIndex].user_name}</span>
                                        <span className='time' style={{ whiteSpace: 'nowrap' }}>
                                        {timelineStories[currentUserIndex].stories[currentStoryIndex].created_at}
                                            </span>
                                    </div>
                                </div>
                            )}
                            <div style={{
                                zIndex: '1',
                                padding:'2rem',
                                overflowX: 'auto', 
                                whiteSpace: 'nowrap' 
                            }}>
                                {selectedStory === null ? (
                                    <Stories
                                        width="500px"
                                        height="700px"
                                        stories={myStories.map(story => ({
                                            url: story.video,
                                            type: 'video', 
                                            duration: 30000,
                                        })) || []}
                                    />
                                ) : (
                                    <Stories
                                        width="500px"
                                        height="700px"
                                        stories={timelineStories[currentUserIndex]?.stories?.map(story => ({
                                            url: story.video,
                                            type: 'video', 
                                            duration: 30000,
                                        })) || []}
                                    />
                                )}
                            </div>
                            <div className='challenge-Story-arrow' onClick={goToNextStory}>
                                <IoIosArrowForward size={20} />
                            </div>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default StorySection;
