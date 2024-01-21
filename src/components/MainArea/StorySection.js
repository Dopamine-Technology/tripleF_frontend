import React,{useState,useEffect} from 'react';
import { FaPlus } from "react-icons/fa6";
import useAxios from "../Auth/useAxiosHook.interceptor";
import Stories from 'stories-react';
import 'stories-react/dist/index.css';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

function StorySection() {
    const [stories,setStories]=useState();
    const [selectedStory, setSelectedStory] = useState(null);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const axios=useAxios();

    const stories2 = [
        { username: 'Username', imageUrl: 'https://a.storyblok.com/f/191576/1200x800/215e59568f/round_profil_picture_after_.webp' },
        { username: 'Username', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUKa8rdbebgLF1SzLQN71RnKi-vxiJrKCeSnvK3rxt-PNc732MAn6oSlgpNaB2hr2ppSw&usqp=CAU' },
        { username: 'Username', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUUlS3GCOdYAk0kRZ-9Z7jy1WS8tzCLcyGZ82ZBtGylPA-Lz3v7dbuJpPDQyFZWIBp0tc&usqp=CAU' },
        { username: 'Username', imageUrl: 'https://media.istockphoto.com/id/1386479313/photo/happy-millennial-afro-american-business-woman-posing-isolated-on-white.webp?b=1&s=170667a&w=0&k=20&c=ahypUC_KTc95VOsBkzLFZiCQ0VJwewfrSV43BOrLETM=' },
        { username: 'Username', imageUrl: 'https://media.istockphoto.com/id/1134378235/photo/side-view-of-one-young-woman.jpg?s=612x612&w=0&k=20&c=LT7aIbWRK7-rlDq7O4_7kZBw6m5YzvyTkc8NRwqh2Lc=' },
        { username: 'Username', imageUrl: 'https://i2-prod.leicestermercury.co.uk/sport/football/football-news/article4555526.ece/ALTERNATES/s1200c/0_Daniel-Amartey-22.jpg' },
        { username: 'Username', imageUrl: 'https://www.cricwindow.com/images/australia/michael-clarke.jpg' },

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

    // useEffect(() => {
    //     const fetchData = async () => {
    //       try {
    //         const response = await axios.get(``);
    //         setStories(response.data.result);
    //       } catch (error) {
    //         console.error('Error fetching Stories:', error);
    //       }
    //     };
      
    //     fetchData();
    //   }, [stories]);

      const handleStoryClick = (index) => {
        setSelectedStory(index); 
        setShow(true)
      };
    
    return (
        <div className="story-section">
            <div className="story-container">
            <div className="story" onClick={() => handleStoryClick(null)}>
                        <img src='https://thumbs.dreamstime.com/b/portrait-father-son-football-54984814.jpg' alt="Story" style={{border:'white'}} />
                        <div className="plus-sign"><FaPlus style={{marginBottom:'8px'}} /></div>
                    </div>
                {stories2.map((story, index) => (
                    <div className="story" key={index} onClick={() => handleStoryClick(index)}>
                        <img src={story.imageUrl} alt="Story" />
                        <span>{story.username}</span>
                    </div>
                ))}
            </div>
      <Modal show={show} onHide={handleClose} >

        <Modal.Body style={{backgroundColor:'#47484A'}} >
        <Stories
        width="450px"
        height="600px"
        stories={selectedStory !== null ? [stories2[selectedStory], ...stories3] : stories}
      />
        </Modal.Body>

      </Modal>
        </div>
    );
}

export default StorySection;
