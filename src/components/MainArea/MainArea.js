import React,{useState} from "react";
import './MainArea.css';
import Post from "./Post";
import NewPost from "./NewPost";
import StorySection from "./StorySection";
import { Row, Col } from 'react-bootstrap';

function MainArea({socket}) {
  const [newPostCreated, setNewPostCreated] = useState(false);

  const handleNewPostCreated = () => {
    setNewPostCreated(true);
  };


  return (
    <div className="Main">
   <Row>
    <StorySection />
   <NewPost onNewPostCreated={handleNewPostCreated} />
   <Post newPostCreated={newPostCreated}  />
   </Row>
   
    </div>
  );
}

export default MainArea;
