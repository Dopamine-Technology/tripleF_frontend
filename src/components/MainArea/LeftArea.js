import React from 'react'
import {FaMedrt,FaFontAwesomeFlag, FaFacebookMessenger, FaAngleDown, FaUserFriends, FaSearch, FaGrin, FaRegThumbsUp, FaCommentAlt, FaRegShareSquare} from 'react-icons/fa'
import {MdVideoCall, MdMoreHoriz} from 'react-icons/md'
import {AiFillFileImage} from 'react-icons/ai'
import { FaRegNewspaper,FaPeopleGroup } from "react-icons/fa6";
import { FaRegSquare } from "react-icons/fa";
import { CiSaveDown2 } from "react-icons/ci";
import { Button } from 'react-bootstrap';
import asset2 from '../../assets/imgs/Asset2.svg'

function LeftArea() {
    return(
        <div className='m-4'>
            
            {/* <div className="Pro">
            <FaRegNewspaper  fontSize="1rem"/>
            <div>Feeds</div>
            </div>
            <hr style={{color:'#E1E1E1'}} />
            <div className="Pro">
                <FaPeopleGroup  fontSize="1rem"/>
                <div>Find Talent</div>
            </div>
            <hr style={{color:'#E1E1E1'}} />
            <div className="Pro">
                <FaRegSquare  fontSize="1rem"/>
                <div>Clubs</div>
            </div>
            <hr style={{color:'#E1E1E1'}} />
            <div className="Pro">
                <CiSaveDown2  fontSize="1rem"/>
                <div>saved</div>
            </div>
            <hr style={{color:'#E1E1E1'}} />
            <br></br> */}
            
        <div className="RightArea">
     <img src={asset2} style={{marginLeft:'2rem'}} />
     <p className='challenges-p'>Share your challenges</p>
     <p className='challenges-desc'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed</p>
     <Button className='share-btn'>Share your videos</Button>

</div>
        </div>
    )
}

export default LeftArea;
