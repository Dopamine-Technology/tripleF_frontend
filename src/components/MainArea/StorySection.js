import React,{useState,useEffect} from 'react';
import { FaPlus } from "react-icons/fa6";
import useAxios from "../Auth/useAxiosHook.interceptor";

function StorySection() {
    const [stories,setStories]=useState();
    const axios=useAxios();

    const stories2 = [
        { username: 'Username', imageUrl: 'https://a.storyblok.com/f/191576/1200x800/215e59568f/round_profil_picture_after_.webp' },
        { username: 'Username', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUKa8rdbebgLF1SzLQN71RnKi-vxiJrKCeSnvK3rxt-PNc732MAn6oSlgpNaB2hr2ppSw&usqp=CAU' },
        { username: 'Username', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUUlS3GCOdYAk0kRZ-9Z7jy1WS8tzCLcyGZ82ZBtGylPA-Lz3v7dbuJpPDQyFZWIBp0tc&usqp=CAU' },
        { username: 'Username', imageUrl: 'https://media.istockphoto.com/id/1386479313/photo/happy-millennial-afro-american-business-woman-posing-isolated-on-white.webp?b=1&s=170667a&w=0&k=20&c=ahypUC_KTc95VOsBkzLFZiCQ0VJwewfrSV43BOrLETM=' },
        { username: 'Username', imageUrl: 'https://media.istockphoto.com/id/1134378235/photo/side-view-of-one-young-woman.jpg?s=612x612&w=0&k=20&c=LT7aIbWRK7-rlDq7O4_7kZBw6m5YzvyTkc8NRwqh2Lc=' },
        { username: 'Username', imageUrl: 'https://www.gaaroscommon.ie/wp-content/uploads/2021/08/Aengus-Lyons-300x300.jpg' },
        { username: 'Username', imageUrl: 'https://www.cricwindow.com/images/australia/michael-clarke.jpg' },

    ];

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(``);
            setStories(response.data.result);
          } catch (error) {
            console.error('Error fetching Stories:', error);
          }
        };
      
        fetchData();
      }, [stories]);

    return (
        <div className="story-section">
            <div className="story-container">
            <div className="story">
                        <img src='https://thumbs.dreamstime.com/b/portrait-father-son-football-54984814.jpg' alt="Story" style={{border:'white'}} />
                        <div className="plus-sign"><FaPlus style={{marginBottom:'8px'}} /></div>
                    </div>
                {stories2.map((story, index) => (
                    <div className="story" key={index}>
                        <img src={story.imageUrl} alt="Story" />
                        <span>{story.username}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default StorySection;
