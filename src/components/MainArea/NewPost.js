import React,{useContext,useState,useLayoutEffect} from 'react'
import { Row,Col,Container } from 'react-bootstrap';
import asset2 from '../../assets/imgs/Asset2.svg'
import {Button} from 'react-bootstrap';
import { UserDataContext } from '../UserContext/UserData.context';
import ChallengesList from '../CreateChallenge/ChallengesList';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

function NewPost({onNewPostCreated  }){
  
    const [show, setShow] = useState(false);
    const location=useLocation();
    const navigate=useNavigate();
    const {user}=useContext(UserDataContext);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const isProfilePath = location.pathname.startsWith('/profile');

    useLayoutEffect(() => {
        const handleResize = () => {
          setWindowWidth(window.innerWidth);
        };
    
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, []);
    
      const isSmallScreen = windowWidth <= 600;
      const isTabletScreen = windowWidth > 600 && windowWidth <= 820;
      const isProScreen = windowWidth > 820 && windowWidth <= 1025;


return(
<Container className='new-post' style={{ marginLeft: isProScreen&&isProfilePath? '6rem' : isProScreen? '0rem':'4rem' }}>
    {user.userData.profile.type_name === "talent" ? (
        <Row>
        <Col xs={6} sm={8} md={6} lg={9} xl={10}>
            <div className='d-flex'>
                <div>
                    <img src={asset2} width='90px' height='70px' className='m-3 shareChallenge-img' />
                </div>
                <div>
                    <p className='newPost-title'>Share your challenges</p>
                    <p className='newPost-desc'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed</p>
                </div>
            </div>
        </Col>
        <Col xs={6} sm={4} md={12} lg={3} xl={2}>
            <Button className='share-btn' onClick={handleShow}>Share</Button>
            {show && <ChallengesList handleClose={handleClose} show={show}  onNewPostCreated={onNewPostCreated}   />}
        </Col>
    </Row>
    ) : (
        user.userData.profile.type_name === "coach" ? (
          <Row>
            <Col xs={6} sm={6} md={6} lg={10} >
                <div className='d-flex'>
                    <div>
                        <img src={asset2} width='90px' height='70px' className='m-3' />
                    </div>
                    <div>
                        <p className='newPost-title'>Share your Training sessions</p>
                        <p className='newPost-desc'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed</p>
                    </div>
                </div>
            </Col>
            <Col  xs={6} sm={6} md={12} lg={2}>
                <Button className='share-btn' onClick={handleShow}>Share</Button>
                {show && <ChallengesList handleClose={handleClose} show={show} />}
            </Col>
        </Row>
        ) : (
            <Row >
                <Col xs={6} sm={6} md={12} lg={10}>
                    <div  className='add-post'>
                        <p className='newPost-title'>Post your Opportunities</p>
                        <p className='newPost-desc'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed</p>
                    </div>
                </Col>
                <Col xs={6} sm={6} md={6} lg={2}><Button className='share-btn' onClick={() => { navigate('/home/add/opportunity') }}>Add</Button></Col>
            </Row>
        )
    )}
</Container>
    )
}
export default NewPost;