import React,{useState,useEffect,useContext} from 'react'
import { MdMoreHoriz} from 'react-icons/md';
import { IoShareSocialOutline } from "react-icons/io5";
import { BsSave } from "react-icons/bs";
import { LiaMedalSolid } from "react-icons/lia";
import { Row,Col } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import SocialPopup from '../SharePost/Popup';
import { useParams,useNavigate } from 'react-router-dom';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import useAxios from '../Auth/useAxiosHook.interceptor';
import Bronze from '../../assets/imgs/bronze.svg';
import Silver from '../../assets/imgs/silver.svg';
import Gold from '../../assets/imgs/gold.svg';
import Medal from '../../assets/imgs/Medal.svg';
import SaveFilled from '../../assets/imgs/save-filled.svg';
import savedIcon from '../../assets/imgs/Saved.svg';
import { MdDeleteOutline } from "react-icons/md";
import { message } from 'antd';
import report from '../../assets/imgs/Report.svg';
import UnFollowUser from '../../assets/imgs/UnfollowUser.svg';
import notInterested from '../../assets/imgs/notInterested.svg';
import copyLink from '../../assets/imgs/copyLink.svg';
import ReportPostPopup from '../Post/ReportPostPopup';
import { UserDataContext } from '../UserContext/UserData.context';

function PostView() {
    const [show, setShow] = useState(false);
    const [selectedMedal, setSelectedMedal] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [loading, setLoading] = useState(true);
    const {id}=useParams();
    const axios=useAxios();
    const [post,setPost]=useState();
    const [copied, setCopied] = useState(false);
    const navigate=useNavigate();
    const [showReportPopup, setShowReportPopup] = useState(false);
    const { user } = useContext(UserDataContext);

    const handleCloseReportPopup = () => setShowReportPopup(false);
    const handleShowReportPopup = () => setShowReportPopup(true);

    useEffect(() => {
        axios
          .get(`status/get/${id}`)
          .then((response) => {
            setPost(response.data.result);
          })
          .catch((error) => {
            console.error("Error fetching status data:", error);
          })
          .finally(() => {
            setLoading(false);
          });
      }, []);

      if (loading) {
        return <LoadingScreen />;
      }

      if (!post || Object.keys(post).length === 0) {
        return <div className='text'>
        <div className="poster">
        <div className="Simplilearn">
          404 image 
            </div>
            </div>
            </div>;
    }
      const handleShare = () => {
        axios.get(`status/toggle_save/${id}`);
        console.log('post saved',id)
     }
    

    const likeHandle = (event) => {
        event.preventDefault();
        if (show) {
            setShow(false);
        } else {
            setShow(true);
        }
    }
    const handleDelete =(id)=>{
        axios.delete(`status/delete/${id}`);
        // setPosts(posts.filter(post => post.id !== id));
        message.success('post deleted successfully');
        navigate('/home');
        
      }
    const handleSelectMedal = (medal) => {
        setSelectedMedal(medal);
        setShow(false);
    };

    const unfollowUser = async (id) => {
        try {
          const response = await axios.get(`follow/toggle/${id}`);
          message.success(response.data.message);
    
      } catch (error) {
          console.error('Error toggling follow status:', error);
      }
      }

    const BlockPost = async (id) => {
        try {
          const response = await axios.get(`status/status/${id}`);
          message.success(response.data.message);
      } catch (error) {
          console.error('Error toggling follow status:', error);
      }
      }
    const handleCopyLink = (postId) => {
        const postLink = `${window.location.origin}/view/post/${postId}`;
        console.log("Copying link:", postLink);
        if (navigator.clipboard) {
            navigator.clipboard.writeText(postLink)
                .then(() => {
                    console.log("Link copied to clipboard:", postLink);
                    // Set state to indicate that the link has been copied
                    setCopied(true);
                    message.success('link copied')
                    // Reset the copied state after a short delay
                    setTimeout(() => {
                        setCopied(false);
                    }, 2000);
                })
                .catch((error) => {
                    console.error("Failed to copy link to clipboard:", error);
                });
        } else {
            console.error("Clipboard API not available");
        }
    };
    const clearSelection = () => {
        setShow(false);
    };

    const handleClose = () => setShowPopup(false);
    const handleShow = () => setShowPopup(true);

    return(
        <div className='text'>
        <div className="poster">
        <div className="Simplilearn">
            <img src={post.user.image!=''?post.user.image:post.user.social_image} alt="Img" style={{height:"50px", width:"50px", borderRadius:"50%"}}/>
            <p className='post-username'>{post.user.user_name} <br /> <p className='post-time'>{post.created_at}</p></p> 
         
        </div>
        <Dropdown>
      <Dropdown.Toggle variant=""  className="edit">
         <MdMoreHoriz fontSize="1.5rem"  />
      </Dropdown.Toggle>

      <Dropdown.Menu style={{width:'14rem'}}>
        <Dropdown.Item href="" className='p-2'  onClick={() => handleCopyLink(post.id)}  ><img src={copyLink} className='me-2'/>{copied ? 'Link Copied' : 'Copy post link'}</Dropdown.Item>
        <Dropdown.Item href="" className='mt-1 p-2' onClick={() => BlockPost(post.id)}> <img src={notInterested} className='me-2' />I don’t want to see <br /> this</Dropdown.Item>
        <Dropdown.Item href="" className='mt-1 p-2' onClick={() => unfollowUser(post.user.id)}><img src={UnFollowUser} className='me-2' />Unfollow user</Dropdown.Item>
        <Dropdown.Item href="" className='mt-1 p-2' onClick={() => handleShowReportPopup()} ><img src={report} className='me-2' />Report Post</Dropdown.Item>
   {post.user.id==user.userData.id && 
        <>
             <hr />
             <Dropdown.Item href="" className=' p-2' onClick={() => handleDelete(post.id)}  >
            <MdDeleteOutline color='#979797' size='24px' className='me-2' /> Delete Post</Dropdown.Item> 
         </>
          }
      </Dropdown.Menu>
    </Dropdown>
    </div>
    {post.video ? (
                    <div className="FacebookVideo">
                        <video controls style={{ height: "30rem", width: "93%", borderRadius: '30px', padding: '1rem' }}>
                            <source src={post.video} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                ) : post.image ? (
                    <div className="FacebookImg">
                        <img src={post.image} alt="dp" style={{ height: "30rem", width: "100%", borderRadius: '30px', padding: '1rem' }} />
                    </div>
                ) : null}
    <br></br>
    <div className="caption">
        <h5 className='post-title'>{post.title!=''?post.title:post.challenge.name}</h5>
        <p style={{color:'#6B6B6B'}}>{post.description}</p>
    </div>

    <div>
    <hr style={{ color: '#A3A3A3' }} />
    <Row>
        <Col xs={6}>
        <div className="d-flex align-items-center">
    <img className="stacked-image" src={Bronze} />
    <img className="stacked-image" src={Silver} />
    <img className="stacked-image" src={Gold} />
    <p className="share-time m-0">{post.reaction_count}</p>
</div>
        </Col>
        <Col xs={6}>
         
            <Row>
                <Col className="share-time">{post.shares} Share</Col>
                <Col className="share-time">{post.saves} Saved</Col>
            </Row>
        </Col>
    </Row>
</div>
    
         {show && (
                <div className="MedalOptions" onMouseLeave={clearSelection}>
                <div className="MedalOption" onClick={() => handleSelectMedal(post.id, 'gold', post.is_reacted)}>
                    {/* <LiaMedalSolid color="gold" className='me-2' size={40}/> */}
                    <img src={Gold} className='me-2' />
                </div>
                <div className="MedalOption" onClick={() => handleSelectMedal(post.id, 'silver', post.is_reacted)}>
                    {/* <LiaMedalSolid color="silver" className='me-2' size={40}/> */}
                    <img src={Silver} className='me-2' />
                </div>
                <div className="MedalOption" onClick={() => handleSelectMedal(post.id, 'saddlebrown', post.is_reacted)}>
                    {/* <LiaMedalSolid color="saddlebrown" className='me-2' size={40}/> */}
                    <img src={Bronze} className='me-2' />
                </div>
                </div>
            )}
        
    <div className="Comment">
    
    <div className="Like" onClick={() => likeHandle}>
    {post.is_reacted=='1' ?<img src={Bronze} />:
      post.is_reacted=='2'?<img src={Silver} />:
      post.is_reacted=='3'? <img src={Gold} />: <img src={Medal} />
    }
    Medal
    </div>
       
        <div className="Like" onClick={handleShow}>
            <IoShareSocialOutline color="grey" className='me-2' size={20}/>Share
        </div>
        {showPopup&& <SocialPopup handleClose={handleClose} show={showPopup} id={post.id}/>}
        <div className="Like" onClick={() => handleShare(post.id)}>
        <img src={post.is_saved?SaveFilled:savedIcon} className='me-2'/>
            Save
        </div>
    
    </div>
    {showReportPopup && <ReportPostPopup handleClose={handleCloseReportPopup} show={showReportPopup} id={post.id} setShow={setShowReportPopup} />} 
    </div>
    )
}
export default PostView;