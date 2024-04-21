import React,{useState} from "react";
import './MainArea.css';
import Post from "./Post";
import NewPost from "./NewPost";
import StorySection from "./StorySection";
import { Row, Col } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

function MainArea({socket}) {
  const [newPostCreated, setNewPostCreated] = useState(false);
  const location=useLocation();
  const isSavedPath = location.pathname.startsWith('/saved');

  const handleNewPostCreated = () => {
    setNewPostCreated(true);
  };


  return (
    <div className="Main">
   <Row>
    {!isSavedPath&&
    <>
    <StorySection />
   <NewPost onNewPostCreated={handleNewPostCreated} />
   </>}
    
   <Post newPostCreated={newPostCreated}  />
   </Row>
   
    </div>
  );
}

export default MainArea;
