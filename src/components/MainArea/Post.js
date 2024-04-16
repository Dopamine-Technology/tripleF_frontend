import React,{useState,useEffect,useContext} from 'react';
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
import copyLink from '../../assets/imgs/copyLink.svg';
import notInterested from '../../assets/imgs/notInterested.svg';
import report from '../../assets/imgs/Report.svg';
import Bronze from '../../assets/imgs/bronze.svg';
import Silver from '../../assets/imgs/silver.svg';
import Gold from '../../assets/imgs/gold.svg';
import Medal from '../../assets/imgs/Medal.svg';
import UnFollowUser from '../../assets/imgs/UnfollowUser.svg';
import { UserDataContext } from '../UserContext/UserData.context';
import SaveFilled from '../../assets/imgs/save-filled.svg';
import { MdDeleteOutline } from "react-icons/md";


function Post({socket,newPostCreated}){
    const [show, setShow] = useState(false);
    const [selectedMedal, setSelectedMedal] = useState(null);
    const [selectedMedalColor, setSelectedMedalColor] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [posts,setPosts]=useState();
    const [showReactionPopup,setShowReactionPop]=useState();
    const [showMedalPopups, setShowMedalPopups] = useState(Array(posts?.length).fill(false));
    const [selectedPostId, setSelectedPostId] = useState(null);
    const [fetchPosts, setFetchPosts] = useState(true);
    const { user } = useContext(UserDataContext);
    
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
  
      // if (newPostCreated) {
      //   fetchPostsData();
      // }
      fetchPostsData();
    }, []);
    
      const likeHandle = (index,type) => {
        // socket.emit('sendNotification',{
        //     senderName:user,
        //     RecieverName:user,
        //     type:type
        // })
        const newShowMedalPopups = [...showMedalPopups];
        newShowMedalPopups[index] = !newShowMedalPopups[index];
        setShowMedalPopups(newShowMedalPopups);
      };
    
      const handleSelectMedal = async (id, medal, is_reacted) => {
        const medalPoints = {
            gold: 3,
            silver: 2,
            saddlebrown: 1, // Assuming saddlebrown represents bronze
        };
    
        const requestBody = {
            status_id: id,
            points: medal === 'gold' ? 3 : medal === 'silver' ? 2 : 1,
        };
    
        const response = await axios.post('status/react', requestBody);
        const updatedPosts = posts.map(post => {
            if (post.id === id) {
              
                return {
                    ...post,
                    is_reacted: medalPoints[medal], 
                    reaction_count: is_reacted=='0'?post.reaction_count+1:post.reaction_count
                    

                };
                
            }
            return post;
        });
    
        setSelectedMedal(medal);
        setSelectedMedalColor(medalPoints[medal]);
        setPosts(updatedPosts);
        setShow(false);
    };
    
    
    const clearSelection = () => {
        setShowMedalPopups(Array(posts.length).fill(false));
    };

    const handleDelete =(id)=>{
      axios.delete(`status/delete/${id}`);
      setPosts(posts.filter(post => post.id !== id));
    }

    const handleShare = (id) => {
        
       axios.get(`status/toggle_save/${id}`);
       console.log('post saved',id)
       setPosts(prevPosts => {
        return prevPosts.map(post => {
          if (post.id === id) {
            return { ...post, is_saved: !post.is_saved }; 
          }
          return post;
        });
      });
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
        <Dropdown >
      <Dropdown.Toggle variant=""  className="edit">
         <BsThreeDotsVertical fontSize="1.5rem"  />
      </Dropdown.Toggle>

      <Dropdown.Menu style={{width:'14rem'}}>
        <Dropdown.Item href="" className='p-2' ><img src={copyLink} className='me-2' />Copy link to Post</Dropdown.Item>
        <Dropdown.Item href="" className='mt-1 p-2'> <img src={notInterested} className='me-2' />I don’t want to see <br /> this</Dropdown.Item>
        <Dropdown.Item href="" className='mt-1 p-2'><img src={UnFollowUser} className='me-2' />Unfollow user</Dropdown.Item>
        <Dropdown.Item href="" className='mt-1 p-2' ><img src={report} className='me-2' />Report Post</Dropdown.Item>
        <hr />
        <Dropdown.Item href="" className=' p-2' onClick={() => handleDelete(post.id)}  ><MdDeleteOutline color='#979797' size='24px' className='me-2' /> Delete Post</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    </div>

    {post.is_opp? <OpportunityPost post={post} />:<TimlinePost post={post}/>}

    <div>
    <hr style={{ color: '#A3A3A3' }} />
    <Row>
        <Col xs={6}>
        <div className="d-flex align-items-center"  onClick={() => handleShowPopup(post.id)}>
    <img className="stacked-image" src={Bronze} />
    <img className="stacked-image" src={Silver} />
    <img className="stacked-image" src={Gold} />
    <p className="share-time m-0">{post.reaction_count}</p>
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
            <img src={Gold} className='me-2' />
        </div>
        <div className="MedalOption" onClick={() => handleSelectMedal(post.id, 'silver', post.is_reacted)}>
            <img src={Silver} className='me-2' />
        </div>
        <div className="MedalOption" onClick={() => handleSelectMedal(post.id, 'saddlebrown', post.is_reacted)}>
            <img src={Bronze} className='me-2' />
        </div>
    </div>
)}
        
    <div className="Comment">
    
<div className="Like" onClick={() => likeHandle(index,1)}>
    {post.is_reacted=='1' ?<img src={Bronze} />:
      post.is_reacted=='2'?<img src={Silver} />:
      post.is_reacted=='3'? <img src={Gold} />: 
      <img src={Medal} />
    }
   
    
    Medal
    </div>
        
        <div className="Like" onClick={handleShow}>
        <img src={ShareIcon} className='me-2'/>
            Share
        </div>
        {showPopup&& <SocialPopup handleClose={handleClose} show={showPopup} id={post.id}/>}
        <div className="Like" onClick={() => handleShare(post.id)}>
        <img src={post.is_saved?SaveFilled:savedIcon} className='me-2'/>
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
