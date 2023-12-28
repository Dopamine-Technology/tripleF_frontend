import React from 'react'
import {FaMedrt,FaFontAwesomeFlag, FaFacebookMessenger, FaAngleDown, FaUserFriends, FaSearch, FaGrin, FaRegThumbsUp, FaCommentAlt, FaRegShareSquare} from 'react-icons/fa'
import {MdVideoCall, MdMoreHoriz} from 'react-icons/md'
import {AiFillFileImage} from 'react-icons/ai'
import { FaRegNewspaper,FaPeopleGroup } from "react-icons/fa6";
import { FaRegSquare } from "react-icons/fa";
import { CiSaveDown2 } from "react-icons/ci";

function LeftArea() {
    return(
        <div>
            
            <div className="Pro">
            <FaRegNewspaper  fontSize="1rem"/>
            <div>Feeds</div>
            </div>
            <div className="Pro">
                <FaPeopleGroup  fontSize="1rem"/>
                <div>Find Talent</div>
            </div>
            <div className="Pro">
                <FaRegSquare  fontSize="1rem"/>
                <div>Clubs</div>
            </div>
            <div className="Pro">
                <CiSaveDown2  fontSize="1rem"/>
                <div>saved</div>
            </div>

            {/* <div className="Pro">
                <FaAngleDown color="green" fontSize="2rem"/>
                <div>See More</div>
            </div> */}
            <br></br>
        </div>
    )
}

export default LeftArea;
