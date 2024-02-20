import React,{useState,useEffect,useContext} from 'react';
import { FaPlus } from "react-icons/fa6";
import useAxios from "../Auth/useAxiosHook.interceptor";
import Stories from 'stories-react';
import 'stories-react/dist/index.css';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import {Col,Row} from 'react-bootstrap';
import close from '../../assets/imgs/close.svg';
import { UserDataContext } from '../UserContext/UserData.context';

function StorySection() {
    const [timlineStories,setTimelineStories]=useState();
    const [selectedStory, setSelectedStory] = useState(null);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [showUserList, setShowUserList] = useState(true);
    const { user } = useContext(UserDataContext);

    const axios=useAxios();

    const stories2 = [
        { user_name: 'Username', image: 'https://a.storyblok.com/f/191576/1200x800/215e59568f/round_profil_picture_after_.webp' },
        { user_name: 'Username', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUKa8rdbebgLF1SzLQN71RnKi-vxiJrKCeSnvK3rxt-PNc732MAn6oSlgpNaB2hr2ppSw&usqp=CAU' },
        { user_name: 'Username', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUUlS3GCOdYAk0kRZ-9Z7jy1WS8tzCLcyGZ82ZBtGylPA-Lz3v7dbuJpPDQyFZWIBp0tc&usqp=CAU' },
        { user_name: 'Username', image: 'https://media.istockphoto.com/id/1386479313/photo/happy-millennial-afro-american-business-woman-posing-isolated-on-white.webp?b=1&s=170667a&w=0&k=20&c=ahypUC_KTc95VOsBkzLFZiCQ0VJwewfrSV43BOrLETM=' },
        { user_name: 'Username', image: 'https://media.istockphoto.com/id/1134378235/photo/side-view-of-one-young-woman.jpg?s=612x612&w=0&k=20&c=LT7aIbWRK7-rlDq7O4_7kZBw6m5YzvyTkc8NRwqh2Lc=' },
        { user_name: 'Username', image: 'https://i2-prod.leicestermercury.co.uk/sport/football/football-news/article4555526.ece/ALTERNATES/s1200c/0_Daniel-Amartey-22.jpg' },
        { user_name: 'Username', image: 'https://www.cricwindow.com/images/australia/michael-clarke.jpg' },
    ];
    const stories3 = [
      {
        type: 'image',
        url: 'https://dynamic.brandcrowd.com/template/preview/design/cc3bb9c7-ed16-42e9-8f48-864d361c3caf?v=4&designTemplateVersion=1&size=design-preview-standalone-1x',
        duration: 5000,
      },
      {
        type: 'image',
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCA5NFHB1iBgm_6SIgB_LfWO6DkhQcEELgxUhNabVWROLmORIXy3cmbFODWnjJwUInzwo&usqp=CAU',
        duration: 5000,
      },
      {
        type: 'image',
        duration: 6000,
        url: 'https://i2-prod.leicestermercury.co.uk/sport/football/football-news/article4555526.ece/ALTERNATES/s1200c/0_Daniel-Amartey-22.jpg',
      },
      {
        duration: 7000,
        type: 'image',
        url: 'https://img.freepik.com/free-psd/final-match-football-social-media-story-template_47987-16194.jpg',
      },
    ];

    useEffect(() => {
    
      const fetchStoriesData = async () => {
        try {
          const response = await axios.get('status/stories');
          setTimelineStories(response.data.result);
         
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchStoriesData()
      
    }, []);


      const handleStoryClick = (index) => {
        setSelectedStory(index); 
        setShow(true)
      };
      const handleCloseList = () => {
        setShowUserList(false);
    };
    
    return (
      <div className="story-section">
      <div className="story-container">
          <div className="story" onClick={() => handleStoryClick(null)}>
              <img src={user.userData.image} alt="Story" style={{ border: 'white' }} />
              <span>Me</span>
          </div>
          {stories2?.map((story, index) => (
              <div className="story" key={index} onClick={() => handleStoryClick(index)}>
                  <img src={story.image != '' ? story.image : story.social_image} alt="Story" />
                  <span>{story.user_name}</span>
              </div>
          ))}
      </div>
      <Modal show={show} onHide={() => setShow(false)} size={showUserList ? "xl" : "md"}>
          <Modal.Body style={{ backgroundColor: 'black' }}>
              <Row className='row-profiles'>
                  {showUserList && (
                      <Col sm={6} lg={4} className='bg-white h-100 m-0 p-0'>
                          <div className="user-list" >
                              <img src={close} className='mb-4' style={{ marginLeft: '1.5rem', marginTop: '2rem' }} onClick={handleCloseList} />
                              <p className='all-challenges'>All Challenges</p>
                              {stories2.map((story, index) => (
                                  <div className="profiles-stories d-flex" key={index}>
                                      <img src={story.image} alt="Story" />
                                      <div className='time-username'>
                                          <span className='username'>{story.user_name}</span>
                                          <span className='time'>2 Hours ago</span>
                                      </div>
                                  </div>
                              ))}
                          </div>
                      </Col>
                  )}
                  <Col sm={6} lg={8} style={{ backgroundColor: 'black', display: 'flex', justifyContent: 'center', marginTop: '2rem',marginLeft:showUserList ? "" : "5rem" }}>
                      <Stories
                          width="500px"
                          height="700px"
                          stories={selectedStory !== null ? [stories2[selectedStory], ...stories3] : timlineStories}
                
                      />
                  </Col>
              </Row>
          </Modal.Body>
      </Modal>
  </div>
    );
}

export default StorySection;

