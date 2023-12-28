import React from "react";
import './MainArea.css';
import RightArea from "./RightArea";
import Post from "./Post";
import NewPost from "./NewPost";
import StorySection from "./StorySection";
import LeftArea from "./LeftArea";

function MainArea(){
    return (
        <div className="Main">
            <div className="Rside">
          <LeftArea />
            </div>
            <div className="MainArea">
                    <StorySection />
                    <div className="message">    
                    <NewPost />
                    <div className="Posted">
                    <Post />
                    </div>
                </div>
            </div>
            <div className ="Lside">
             <RightArea />
            </div>
        </div>
    )
}
export default MainArea