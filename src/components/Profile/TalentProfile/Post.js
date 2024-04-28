import React,{useState,useEffect,useContext} from 'react';
import { Row,Col } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import SocialPopup from '../../SharePost/Popup';
import useAxios from '../../Auth/useAxiosHook.interceptor';
import ReactionPopup from '../../Post/ReactionPopup';
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegCopy,FaRegEyeSlash } from "react-icons/fa";
import { RiUserUnfollowLine } from "react-icons/ri";
import { MdOutlineCancel } from "react-icons/md";
import ShareIcon from '../../../assets/imgs/Share.svg';
import OpportunityPost from '../../Opportunities/OpportunityPost';
import TimlinePost from '../../Post/TimlinePost';
import Bronze from '../../../assets/imgs/bronze.svg';
import Silver from '../../../assets/imgs/silver.svg';
import Gold from '../../../assets/imgs/gold.svg';
import Medal from '../../../assets/imgs/Medal.svg';
import { useParams } from 'react-router-dom';
import savedIcon from '../../../assets/imgs/Saved.svg';
import SaveFilled from '../../../assets/imgs/save-filled.svg';
import { MdDeleteOutline } from "react-icons/md";
import ReportPostPopup from '../../Post/ReportPostPopup';
import { UserDataContext } from '../../UserContext/UserData.context';
import { message } from 'antd';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../LanguageContext/LanguageProvider';
import report from '../../../assets/imgs/Report.svg';
import UnFollowUser from '../../../assets/imgs/UnfollowUser.svg';
import notInterested from '../../../assets/imgs/notInterested.svg';
import copyLink from '../../../assets/imgs/copyLink.svg';

function Post(){
    const [show, setShow] = useState(false);
    const [selectedMedal, setSelectedMedal] = useState(null);
    const [selectedMedalColor, setSelectedMedalColor] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [posts,setPosts]=useState();
    const [showReactionPopup,setShowReactionPop]=useState();
    const [showMedalPopups, setShowMedalPopups] = useState(Array(posts?.length).fill(false));
    const [selectedPostId, setSelectedPostId] = useState(null);
    const [hasMore, setHasMore] = useState(true);
    const axios=useAxios();
    const [copied, setCopied] = useState(false);
    const { user } = useContext(UserDataContext);
    const { id } = useParams();
    const [showReportPopup, setShowReportPopup] = useState(false);
    const { language, changeLanguage } = useLanguage(); 
    const [direction, setDirection] = useState('ltr');
    const [t, i18n] = useTranslation();

    useEffect(() => {
    
        const fetchPostsData = async () => {
          try {
            const response = await axios.get(`status/user_statuses/${id}`);
            setPosts(response.data.result);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchPostsData()
        
      }, []);

      // useEffect(() => {
      //   const fetchData = async () => {
      //     setLoading(true);
      //     try {
      //       const response = await axios.get(`status/user_statuses/${id}?page=${page}`);
      //       const newPosts = response.data.result;
      //       setPosts(prevPosts => [...prevPosts, ...newPosts]);
      //       setHasMore(newPosts.length > 0);
      //     } catch (error) {
      //       console.error('Error fetching data:', error);
      //     }
      //     setLoading(false);
      //   };
    
      //   if (hasMore && !loading) {
      //     fetchData();
      //   }
      // }, [page, id, loading, hasMore]);
    
      // const handleScroll = () => {
      //   if (
      //     window.innerHeight + document.documentElement.scrollTop ===
      //     document.documentElement.offsetHeight
      //   ) {
      //     setPage(prevPage => prevPage + 1);
      //   }
      // };
    
      // useEffect(() => {
      //   window.addEventListener('scroll', handleScroll);
      //   return () => {
      //     window.removeEventListener('scroll', handleScroll);
      //   };
      // }, []);
    
      const handleCopyLink = (postId) => {
        const postLink = `${window.location.origin}/view/post/${postId}`;
        console.log("Copying link:", postLink);
    
        // Check if the Clipboard API is available
        if (navigator.clipboard) {
            // Copy the link to the clipboard
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
      const likeHandle = (index) => {
        const newShowMedalPopups = [...showMedalPopups];
        newShowMedalPopups[index] = !newShowMedalPopups[index];
        setShowMedalPopups(newShowMedalPopups);
      
      };

      const unfollowUser = async (id) => {
        try {
          const response = await axios.get(`follow/toggle/${id}`);
          message.success(response.data.message);
    
      } catch (error) {
          console.error('Error toggling follow status:', error);
      }
      }

     
    
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
    const BlockPost = async (id) => {
      try {
        const response = await axios.get(`status/status/${id}`);
        message.success(response.data.message);
    } catch (error) {
        console.error('Error toggling follow status:', error);
    }
    }
    const handleShare = (id) => {
        
      axios.get(`status/toggle_save/${id}`);
      console.log('post saved',id)
      setPosts(prevPosts => {
       return prevPosts.map(post => {
         if (post.id === id) {
           return { ...post, is_saved: !post.is_saved }; // Toggle is_saved
         }
         return post;
       });
     });
   }
   const handleCloseReportPopup = () => setShowReportPopup(false);
   const handleShowReportPopup = () => setShowReportPopup(true);
   const handleDelete =(id)=>{
    axios.delete(`status/delete/${id}`);
    setPosts(posts.filter(post => post.id !== id));
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
        <div className='mt-4'>
             {posts &&
                posts.map((post, index) => (
        <div className='text2'>
        <div className="poster">
        <div className="Simplilearn">
            <img src={post.user.image!=''?post.user.image:post.user.social_image} alt="Img" style={{height:"50px", width:"50px", borderRadius:"50%"}}/>
            <p className='post-username'>{post.user.user_name} <br /> <p className='post-time'>{post.created_at}</p></p> 
         
        </div>
        <Dropdown>
      <Dropdown.Toggle variant=""  className="edit">
         <BsThreeDotsVertical fontSize="1.5rem"  />
      </Dropdown.Toggle>

      <Dropdown.Menu style={{width:'14rem'}}>
        <Dropdown.Item href="" className='p-2'  onClick={() => handleCopyLink(post.id)}  ><img src={copyLink} className='me-2'/>{copied ? t('PostActions.copiedLink') : t('PostActions.copyLink')}</Dropdown.Item>
        {post.user.id!=user.userData.id &&
        <>
        <Dropdown.Item href="" className='mt-1 p-2' onClick={() => BlockPost(post.id)}> <img src={notInterested} className='me-2' />{t('PostActions.notInterested')}</Dropdown.Item>
        <Dropdown.Item href="" className='mt-1 p-2' onClick={() => unfollowUser(post.user.id)} ><img src={UnFollowUser} className='me-2' />{t('PostActions.unfollow')}</Dropdown.Item>
        <Dropdown.Item href="" className='mt-1 p-2' onClick={() => handleShowReportPopup()} ><img src={report} className='me-2' />{t('PostActions.reportPost')}</Dropdown.Item>
        </> }
        
   
        {post.user.id==user.userData.id && 
        <>
             <hr />
             <Dropdown.Item href="" className=' p-2' onClick={() => handleDelete(post.id)}  >
            <MdDeleteOutline color='#979797' size='24px' className='me-2' />{t('PostActions.deletePost')}</Dropdown.Item> 
         </>
          }
      
      </Dropdown.Menu>
    </Dropdown>
    </div>

    {post.is_opp?   <OpportunityPost post={post} />:<TimlinePost post={post}/>}


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
    <div className="Like" onClick={() => likeHandle(index)}>
    {post.is_reacted=='1' ?<img src={Bronze} />:
      post.is_reacted=='2'?<img src={Silver} />:
      post.is_reacted=='3'? <img src={Gold} />: <img src={Medal} />
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
           
    {selectedPostId === post.id && showReactionPopup && <ReactionPopup handleClose={handleClosePopup} show={showReactionPopup} id={post.id}  />}
    {showReportPopup && <ReportPostPopup handleClose={handleCloseReportPopup} show={showReportPopup} id={post.id} setShow={setShowReportPopup} />}
    </div>
    
                ))}
            
    </div>
    )
}
export default Post;
