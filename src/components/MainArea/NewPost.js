import React from 'react'
import { FaGrin, FaRegThumbsUp, FaCommentAlt, FaRegShareSquare} from 'react-icons/fa';
import {MdVideoCall, MdMoreHoriz} from 'react-icons/md';
import {AiFillFileImage} from 'react-icons/ai'
import { SlPicture } from "react-icons/sl";

function NewPost(){
    return(
        <div>
            <div className="text">
                            <div className="Post">
                                <img src="https://thumbs.dreamstime.com/b/portrait-father-son-football-54984814.jpg" alt="PIC"/>
                                <input type="Mind" placeholder="Add New Challenge "/>
                            </div>
                            <div className="Call">
                                <div className="ico">
                                    <div className="icone">
                                    <SlPicture fontSize="2rem"/>
                                      
                                    </div>
                            
                            </div>
                        </div>
                    </div> 
        </div>
    )
}
export default NewPost;