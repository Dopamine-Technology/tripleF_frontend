import React, { useState, useEffect, useContext, useRef } from 'react';
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
import ListImage from '../../assets/imgs/listImg.svg';
import { FcApproval } from "react-icons/fc";
import { Link } from 'react-router-dom';

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
    const storyContainerRef = useRef(null);

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
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchMyStoriesData();
    }, []);

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

    const handleCloseList = () => {
        setShowUserList(false);
    };

    const goToNextStory = () => {
        const currentUser = timelineStories[currentUserIndex];
        if (currentUser && currentUser.userStories && currentStoryIndex < currentUser.userStories.length - 1) {
            setCurrentStoryIndex(currentStoryIndex + 1);
        } else if (currentUserIndex < timelineStories.length - 1) {
            setCurrentUserIndex(currentUserIndex + 1);
            setCurrentStoryIndex(0);
        } else {
            setShow(false);
        }
    };

    return (
        <div className="story-section">
            <div className="story-container" ref={storyContainerRef}>
                <div className="story" onClick={() => handleStoryClick(null, null)}>
                    <img src={user.userData.image} alt="Story" style={{ border: 'white',boxShadow:
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
                            : '',
                }} />
                            <span>{user2.user_name}</span>
                        </div>
                    </div>
                ))}
            </div>
            <Modal show={show} onHide={() => setShow(false)} size={showUserList ? "xl" : "md"}>
                <Modal.Body style={{ backgroundColor: showUserList ? "white" : "black", padding: 0 }}> 
                    <Row className='row-profiles' style={{ margin: 0 }}>
                        {showUserList && (
                            <Col sm={6} lg={4} className='bg-white h-100 m-0 p-0'>
                                <div className="user-list" >
                                    <img src={close} className='mb-4' style={{ marginLeft: '1.5rem', marginTop: '2rem' }} onClick={handleCloseList} />
                                    <p className='all-challenges'>All Challenges</p>
                                    <div className="profiles-stories d-flex" >
                                          
                                          <img src={user.userData.image} alt="Story"  style={{
                  boxShadow:
                      seenStories.includes(user.userData.id) 
                          ? 'none'
                          : '', 
              }}/>
               <Link to={`/profile/${user.userData.id}`} style={{textDecoration:'none'}}>
                                          <div className='time-username' >
                                              <span className='username'>Me</span>
                                              <span className='time'>2 Hours ago</span>
                                          </div>
                  </Link>
                                      
                                      </div>
                                    {timelineStories.map((user2, userIndex) => (
                                        <>
                                        <Link to={`/profile/${user2.id}`} style={{textDecoration:'none'}}>
  <div className="profiles-stories d-flex" key={userIndex} style={userIndex === currentUserIndex && currentStoryIndex > 0 ? {backgroundColor: '#ebeaed'} : null}>
                                          
  <img src={user2.image} alt="Story"  style={{
  boxShadow:
 seenStories.includes(user2.id) || user2.seen
                            ? 'none'
                            : '', 
                }}/>
                                            <div className='time-username' >
                                                <span className='username'>{user2.user_name}</span>
                                                <span className='time'>2 Hours ago</span>
                                            </div>
                                            {seenStories.includes(user2.id) || user2.seen ?  <p className='seen'><FcApproval />seen</p> :null}
                                 
                                        </div>
                                        </Link>
                                        </>
                                        
                                    ))}
                                </div>
                            </Col>
                        )}
                        <Col sm={6} lg={8} style={{ backgroundColor: 'black', display: 'flex', justifyContent: 'center', marginLeft: showUserList ? "" : "5rem", marginTop: '0rem' }}>
                            {selectedStory !== null && (
                                <div className="owner-stories d-flex" style={{
                                    position: 'absolute',
                                    left: '32rem',
                                    top: '70px',
                                    zIndex: '2'
                                }}>
                                  <img src={timelineStories[currentUserIndex].image} alt="Story" />                   
                                    <div className='time-username'>
                                        <span className='username'>{timelineStories[currentUserIndex].user_name}</span>
                                        <span className='time'>2 Hours ago</span>
                                    </div>
                                </div>
                            )}
                            <div style={{
                                zIndex: '1',
                                padding:'2rem',
                                overflowX: 'auto', // Allow horizontal scrolling
                                whiteSpace: 'nowrap' // Prevent wrapping of story elements
                            }}>
                                {selectedStory === null ? (
                                    <Stories
                                        width="500px"
                                        height="700px"
                                        stories={myStories.map(story => ({
                                            url: story.video,
                                            type: 'video', 
                                        })) || []}
                                    />
                                ) : (
                                    <Stories
                                        width="500px"
                                        height="700px"
                                        stories={timelineStories[currentUserIndex]?.stories?.map(story => ({
                                            url: story.video,
                                            type: 'video', 
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
