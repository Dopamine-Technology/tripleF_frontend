import React,{useState,useEffect} from 'react';
import { MdMoreHoriz} from 'react-icons/md';
import { IoShareSocialOutline } from "react-icons/io5";
import { BsSave } from "react-icons/bs";
import { LiaMedalSolid } from "react-icons/lia";
import { Row,Col } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import SocialPopup from '../SharePost/Popup';
import useAxios from '../Auth/useAxiosHook.interceptor';
import ReactionPopup from '../Post/ReactionPopup';
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegCopy,FaRegEyeSlash } from "react-icons/fa";
import { RiUserUnfollowLine } from "react-icons/ri";
import { MdOutlineCancel } from "react-icons/md";
import savedIcon from '../../assets/imgs/Saved.svg';
import ShareIcon from '../../assets/imgs/Share.svg';
import OpportunityPost from '../Opportunities/OpportunityPost';
import TimlinePost from '../Post/TimlinePost';


function Post(){
    const [show, setShow] = useState(false);
    const [selectedMedal, setSelectedMedal] = useState(null);
    const [selectedMedalColor, setSelectedMedalColor] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [posts,setPosts]=useState();
    const [showReactionPopup,setShowReactionPop]=useState();
    const [showMedalPopups, setShowMedalPopups] = useState(Array(posts?.length).fill(false));
    const [selectedPostId, setSelectedPostId] = useState(null);
    
    const axios=useAxios();

    useEffect(() => {
    
        const fetchPostsData = async () => {
          try {
            const response = await axios.get('status/timeline');
            setPosts(response.data.result);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchPostsData()
        
      }, []);
    


      const likeHandle = (index) => {
        const newShowMedalPopups = [...showMedalPopups];
        newShowMedalPopups[index] = !newShowMedalPopups[index];
        setShowMedalPopups(newShowMedalPopups);
      
      };
    
    const handleSelectMedal = async (id, medal, is_reacted) => {
        const medalColors = {
            gold: 'gold',
            silver: 'silver',
            saddlebrown: 'saddlebrown',
        };
    
        const requestBody = {
            status_id: id,
            points: medal === 'gold' ? 3 : medal === 'silver' ? 2 : 1,
        };
    
        const response = await axios.post('status/react', requestBody);
        
        setSelectedMedal(medal);
        setSelectedMedalColor(medalColors[medal]);
        setShow(false);
    };
    
    const clearSelection = () => {
        setShowMedalPopups(Array(posts.length).fill(false));
    };

    const handleShare = (id) => {
       axios.post(`status/toggle_save/${id}`);
       console.log('post saved',id)
    }

    const handleClose = () => setShowPopup(false);
    const handleShow = () => setShowPopup(true);

    const handleShowPopup = (postId) => {
        setSelectedPostId(postId);
        setShowReactionPop(true);
      };
    
      const handleClosePopup = () => {
        setSelectedPostId(null);
        setShowReactionPop(false);
      };

    const handleReport=({id,report})=>{
        axios.post(`status/report/${id}`,report);
     
    }


    return(
        <div className='post-continer'>
             {posts &&
                posts.map((post, index) => (
        <div className='text'>
        <div className="poster">
        <div className="Simplilearn">
            <img src={post.user.image!=''?post.user.image:post.user.social_image} alt="Img" style={{height:"50px", width:"50px", borderRadius:"50%"}}/>
            <p className='post-username'>{post.user.user_name} <br /> <p className='post-time'>{post.created_at}</p></p> 
         
        </div>
        <Dropdown>
      <Dropdown.Toggle variant=""  className="edit">
         <BsThreeDotsVertical fontSize="1.5rem"  />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="" className='p-2' ><FaRegCopy className='me-2' />Copy link to Post</Dropdown.Item>
        <Dropdown.Item href="" className='mt-1 p-2'> <FaRegEyeSlash className='me-2' />I don’t want to see this</Dropdown.Item>
        <Dropdown.Item href="" className='mt-1 p-2'><RiUserUnfollowLine className='me-2' />Unfollow user</Dropdown.Item>
        <Dropdown.Item href="" className='mt-1 p-2' ><MdOutlineCancel className='me-2' />Report Post</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    </div>

    {post.is_opp?   <OpportunityPost post={post} />:<TimlinePost post={post}/>}


    
  

    <div>
    <hr style={{ color: '#A3A3A3' }} />
    <Row>
        <Col xs={6}>
            <div className="d-flex align-items-center  " style={{marginLeft:'2rem'}} onClick={() => handleShowPopup(post.id)}  >
            <LiaMedalSolid color="gold" className="" />
                <LiaMedalSolid color="saddlebrown" className="" />
                <LiaMedalSolid color="silver" className="" />

                <p className="share-time m-0" >{post.reaction_count}</p>
            </div>
        </Col>
        <Col xs={6}>
         
            <Row>
                <Col></Col>
    
                <Col className="share-time"> <span className='me-3'>{post.shares} Share</span>
                                             <span>{post.saves} Saved</span></Col>
            </Row>
        </Col>
    </Row>
</div>

{showMedalPopups[index] && (

    <div className="MedalOptions" onMouseLeave={clearSelection}>
        <div className="MedalOption" onClick={() => handleSelectMedal(post.id, 'gold', post.is_reacted)}>
            <LiaMedalSolid color="gold" className='me-2' size={40}/>
        </div>
        <div className="MedalOption" onClick={() => handleSelectMedal(post.id, 'silver', post.is_reacted)}>
            <LiaMedalSolid color="silver" className='me-2' size={40}/>
        </div>
        <div className="MedalOption" onClick={() => handleSelectMedal(post.id, 'saddlebrown', post.is_reacted)}>
            <LiaMedalSolid color="saddlebrown" className='me-2' size={40}/>
        </div>
    </div>
)}
        
    <div className="Comment">
    <div className="Like" onClick={() => likeHandle(index)}>
    <LiaMedalSolid color={selectedMedalColor || (post.is_reacted=='1' ? 'saddlebrown' : post.is_reacted=='2' ? 'silver' : post.is_reacted=='3' ? 'gold' : 'none')} className='me-2 2' size={20}/>
    Medal
</div>
        
        <div className="Like" onClick={handleShow}>
        <img src={ShareIcon} className='me-2'/>
            Share
        </div>
        {showPopup&& <SocialPopup handleClose={handleClose} show={showPopup} id={post.id}/>}
        <div className="Like" onClick={() => handleShare(post.id)}>
            <img src={savedIcon} className='me-2'/>
            Save
        </div>
    
    </div> 
           
    {selectedPostId === post.id && showReactionPopup && <ReactionPopup handleClose={handleClosePopup} show={showReactionPopup} id={post.id} />}
    </div>
    
                ))}
            
    </div>
    )
}
export default Post;
