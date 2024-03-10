import React,{useState,useEffect} from 'react'
import { MdMoreHoriz} from 'react-icons/md';
import { IoShareSocialOutline } from "react-icons/io5";
import { BsSave } from "react-icons/bs";
import { LiaMedalSolid } from "react-icons/lia";
import { Row,Col } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import SocialPopup from '../SharePost/Popup';
import { useParams } from 'react-router-dom';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import useAxios from '../Auth/useAxiosHook.interceptor';
import Bronze from '../../assets/imgs/bronze.svg';
import Silver from '../../assets/imgs/silver.svg';
import Gold from '../../assets/imgs/gold.svg';
import Medal from '../../assets/imgs/Medal.svg';


function PostView() {
    const [show, setShow] = useState(false);
    const [selectedMedal, setSelectedMedal] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [loading, setLoading] = useState(true);
    const {id}=useParams();
    const axios=useAxios();
    const [post,setPost]=useState();

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
        axios.post(`status/toggle_save/${id}`);
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
    const handleSelectMedal = (medal) => {
        setSelectedMedal(medal);
        setShow(false);
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

      <Dropdown.Menu>
        <Dropdown.Item href="" className='p-2' >Copy link to Post</Dropdown.Item>
        <Dropdown.Item href="" className='mt-1 p-2'>I don’t want to see this</Dropdown.Item>
        <Dropdown.Item href="" className='mt-1 p-2'>Unfollow user</Dropdown.Item>
        <Dropdown.Item href="" className='mt-1 p-2'>Report Post</Dropdown.Item>
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
        <div className="Like">
            <BsSave color="grey" className='me-2' size={20} onClick={() => handleShare()} />Save
        </div>
    
    </div> 
    </div>
    )
}
export default PostView;