import React,{useState,useEffect,useContext} from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import Followed from '../../../assets/imgs/Followed.svg';
import useAxios from '../../Auth/useAxiosHook.interceptor';
import { UserDataContext } from '../../UserContext/UserData.context';
import LoadingScreen from '../../LoadingScreen/LoadingScreen';
import { Link } from 'react-router-dom';


function FollowersPopup({ users, handleClose,id, show, activeKey, followingUsers, handleCloseFollowingPopup }) {
    
    const axios=useAxios();
    const { user } = useContext(UserDataContext);

    const [following, setFollowing] = useState([]);
    const [followers,setFollowers]=useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchData = async () => {
            try {
                let userId = id; 
                if (userId == null) {
                  userId = user.userData.id;
                }
                const response = await axios.get(`user/followers/${userId}`);
                setFollowers(response.data.result);
                console.log('followers',followers);
            } catch (error) {
                console.error('Error fetching followers:', error);
            }
            finally {
                setLoading(false); // Set loading to false after the request is complete
            }
        };

        if (show) {
            fetchData();
        }
    }, [show]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let userId = id; 
                if (userId == null) {
                  userId = user.userData.id;
                }
                const response = await axios.get(`user/following/${userId}`);
                setFollowing(response.data.result);
                console.log('following',following);
            } catch (error) {
                console.error('Error fetching Following:', error);
            }
            finally {
                setLoading(false); 
            }
        };

        if (show) {
            fetchData();
        }
    }, [show]);

    const ToggleFollow = (id) =>{
        axios.get(`follow/toggle/${id}`);
    }

    if (loading) {
        return (
         <LoadingScreen />
        );
    }
    return (
        <Modal show={show} onHide={handleClose} size='lg'>
            <Modal.Header>
                <Modal.Title className=''>
                    {activeKey=='followers' ? <p className='followersModal-title mb-0'>Followers (9)</p> : <p>Following (19)</p>}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ListGroup as="ol" numbered className='w-100'>
                    {activeKey=='followers'  ? (
                        followers.map((user, index) => (
                            <div key={index} >
                                 <Link to={`/profile/${user.id}`} style={{textDecoration:'none'}}>
                                <ListGroup.Item
                                    as="li"
                                    className="d-flex justify-content-between align-items-start"
                                >
                                    <div className="ms-2 me-5 d-flex" >
                                        <div className="fw-bold me-3">
                                            <img src={user.image} className='user-img' />
                                        </div>
                                        <p className='followersModal-username mt-3'>{user.user_name}</p>
                                    </div>
                                    {
                                        user.is_followed ?  <Button variant="" className="following" onClick={()=>ToggleFollow(user.id)} >
                                        
                                        <img src={Followed} /> Following
                                    </Button>  :
                                            <Button variant="" className="follow"  onClick={()=>ToggleFollow(user.id)}>
                                                + Follow
                                            </Button>
                                    }
                                 
                                </ListGroup.Item>
                                </Link>
                            </div>
                        ))
                    ) : (
                        activeKey=='following'  ? (
                            following.map((user, index) => (
                                <div key={index}>
                                      <Link to={`/profile/${user.id}`}  style={{textDecoration:'none'}}>
                                    <ListGroup.Item
                                        as="li"
                                        className="d-flex justify-content-between align-items-start"
                                    >
                                        <div className="ms-2 me-5 d-flex " >
                                            <div className="fw-bold me-3">
                                                <img src={user.image} className='user-img' />
                                            </div>
                                            <p className='user-name'>{user.user_name}</p>
                                        </div>
                                        {
                                            user.is_followed ? 
                                            <Button variant="outline-success"  onClick={()=>ToggleFollow(user.id)} className="" style={{ borderRadius: '18px', float: 'right',backgroundColor:'rgba(228, 248, 242, 0.5)' }}>
                                        
                                            <img src={Followed} /> Following
                                        </Button>  
                                         :
                                                <Button variant="outline-success"  onClick={()=>ToggleFollow(user.id)} className="" style={{ borderRadius: '18px', float: 'right' }}>
                                                    + Follow
                                                </Button>
                                        }
                                    </ListGroup.Item>
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <p>There are no followers</p>
                        )
                    )}
                </ListGroup>
            </Modal.Body>
        </Modal>
    );
}

export default FollowersPopup;
