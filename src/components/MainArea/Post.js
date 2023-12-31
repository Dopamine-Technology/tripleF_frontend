import React from 'react'
import {FaMedrt,FaFontAwesomeFlag, FaFacebookMessenger, FaAngleDown, FaUserFriends, FaSearch, FaGrin, FaRegThumbsUp, FaCommentAlt, FaRegShareSquare} from 'react-icons/fa';
import {MdVideoCall, MdMoreHoriz} from 'react-icons/md';
import { PiTrophyThin } from "react-icons/pi";
import { IoShareSocialOutline } from "react-icons/io5";
import { BsSave } from "react-icons/bs";

function Post(){
    return(
        <div className='text'>
        <div className="poster">
        <div className="Simplilearn">
            <img src="https://www.shutterstock.com/image-photo/portrait-boy-child-football-player-260nw-2077543435.jpg" alt="Img" style={{height:"50px", width:"50px", borderRadius:"50%"}}/>
            <p className='post-username'>Username here </p> 
         
        </div>
        <div className="edit"><MdMoreHoriz fontSize="1.5rem"/></div>
    </div>
    <div className="FacebookImg">
        <img src="https://www.shutterstock.com/image-photo/portrait-boy-child-football-player-260nw-2077543435.jpg" alt="dp" style={{height:"auto",width:"100%",borderRadius:'30px',padding:'1rem'}}/>
    </div>
    <br></br>
    <div className="caption">
        <h5>Challenge Type</h5>
        <p style={{color:'#6B6B6B'}}>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit</p>
    </div>
    
   
    <div className="Comment">
        <div className="Like">
            <PiTrophyThin color="grey"/>Medal 
        </div>
        <div className="Like">
            <IoShareSocialOutline color="grey"/>Share
        </div>
        <div className="Like">
            <BsSave color="grey"/>Save
        </div>
    
    </div> 
    </div>
    )
}
export default Post;