import React,{useState,useEffect,useContext} from 'react';
import { Row,Col } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import SocialPopup from '../SharePost/Popup';
import useAxios from '../Auth/useAxiosHook.interceptor';
import ReactionPopup from '../Post/ReactionPopup';
import { BsThreeDotsVertical } from "react-icons/bs";
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
import { message } from 'antd';
import ReportPostPopup from '../Post/ReportPostPopup';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../LanguageContext/LanguageProvider';
import { useScreenWidth } from '../ScreenWidthContext/ScreenWidth.context';

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
    const [copied, setCopied] = useState(false);
    const { user } = useContext(UserDataContext);
    const [showReportPopup, setShowReportPopup] = useState(false);
    const location = useLocation();
    const { language, changeLanguage } = useLanguage(); 
    const [direction, setDirection] = useState('ltr');
    const [t, i18n] = useTranslation();
    const { windowWidth, isSmallScreen, isTabletScreen, isProScreen } = useScreenWidth();
  
    useEffect(() => {
      if (language === 'ar') {
          setDirection('rtl');
      } else {
          setDirection('ltr');
      }
  }, [language]);
    
    const axios=useAxios();

    useEffect(() => {
      const fetchPostsData = async () => {
          try {
              let endpoint = 'status/timeline';
              if (location.pathname === '/saved') {
                  endpoint = 'status/get_saved';
              }

              const response = await axios.get(endpoint);
              setPosts(response.data.result);
          } catch (error) {
              console.error('Error fetching data:', error);
          }
      };

      fetchPostsData();
  }, [location]); 
    
      const likeHandle = (index,type) => {
     
        const newShowMedalPopups = [...showMedalPopups];
        newShowMedalPopups[index] = !newShowMedalPopups[index];
        setShowMedalPopups(newShowMedalPopups);
      };
    
      const handleSelectMedal = async (id, medal, is_reacted) => {
        const medalPoints = {
            gold: 3,
            silver: 2,
            saddlebrown: 1, 
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

    const handleCloseReportPopup = () => setShowReportPopup(false);
    const handleShowReportPopup = () => setShowReportPopup(true);

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
            <img src={post.user.image!=''?post.user.image:post.user.social_image} alt="Img" style={{height:"50px", width:"50px", borderRadius:"50%",backgroundColor:'#213555'}}/>
            <p className='post-username'>{post.user.user_name} <br /> <p className='post-time'>{post.created_at}</p></p> 
         
        </div>
        <Dropdown >
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

    {post.is_opp? <OpportunityPost post={post} />:<TimlinePost post={post}/>}

    <div>
    <hr style={{ color: '#A3A3A3' }} />
    <Row>
        <Col xs={6} md={6} lg={4} xl={6}>
        <div className="d-flex align-items-center"  onClick={() => handleShowPopup(post.id)}>
    <img className="stacked-image" src={Bronze} />
    <img className="stacked-image" src={Silver} />
    <img className="stacked-image" src={Gold} />
    <p className="share-time m-0">{post.reaction_count}</p>
</div>
        </Col>
        <Col xs={6} md={6} lg={8} xl={6}>
         
            <Row>
                {isSmallScreen?null:<Col></Col>}
                
    
                <Col className="share-time" > <span className={'me-3'}>{post.shares} {t('mainarea.share')}</span>
                                             <span>{post.saves} {t('mainarea.save')}</span></Col>
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
   
    
   {t('mainarea.medal')}
    </div>
        
        <div className="Like" onClick={handleShow}>
        <img src={ShareIcon} className='me-2'/>
        {t('mainarea.share')}
        </div>
        {showPopup&& <SocialPopup handleClose={handleClose} show={showPopup} id={post.id}/>}
        <div className="Like" onClick={() => handleShare(post.id)}>
        <img src={post.is_saved?SaveFilled:savedIcon} className='me-2'/>
        {t('mainarea.save')}
        </div>
    
    </div> 
           
    {selectedPostId === post.id && showReactionPopup && <ReactionPopup handleClose={handleClosePopup} show={showReactionPopup} id={post.id} />}
    {showReportPopup && <ReportPostPopup handleClose={handleCloseReportPopup} show={showReportPopup} id={post.id} setShow={setShowReportPopup} />}
    </div>
    
                ))}
            
    </div>
    )
}
export default Post;
