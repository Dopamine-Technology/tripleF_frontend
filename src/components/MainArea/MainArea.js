import React from "react";
import './MainArea.css';
import RightArea from "./RightArea";
import Post from "./Post";
import NewPost from "./NewPost";
import StorySection from "./StorySection";
import LeftArea from "./LeftArea";
import { Row, Col } from 'react-bootstrap';

function MainArea() {
  return (
    <div className="Main">
   <Row>
    <StorySection />
   <NewPost />
   <Post />
   </Row>
   
    </div>
  );
}

export default MainArea;
