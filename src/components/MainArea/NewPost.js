import React,{useContext,useState} from 'react'
import { Row,Col,Container } from 'react-bootstrap';
import asset2 from '../../assets/imgs/Asset2.svg'
import {Button} from 'react-bootstrap';
import { UserDataContext } from '../UserContext/UserData.context';
import ChallengesList from '../CreateChallenge/ChallengesList';
import { useNavigate } from 'react-router-dom';

function NewPost(){
    const { user } = useContext(UserDataContext);
    const [show, setShow] = useState(false);
    const navigate=useNavigate();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    return(
      <Container className='new-post '>
        {user.userData.profile.type_name=="talent"?(
        <Row className='me-3'>
            <Col><img src={asset2} width='90px' height='70px' className='m-3' /></Col>
            <Col xs={12} md={5}>
            <Row className='content-container'>
            <p className='newPost-title'>Share your challenges</p>
            <p className='newPost-desc'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed</p>
            </Row>

            </Col>
            <Col className='btn-col' xs={12} md={2}>
            <Button className='share-btn' onClick={handleShow}>Share</Button>
            {show&& <ChallengesList handleClose={handleClose} show={show} />}
    </Col>
        </Row>

        ):(
          <Row className='me-3'>
    <Col></Col>
    <Col xs={12} md={5}>
    <Row className='newpost-container'>
    <p className='newPost-title'>Post your Opportunities</p>
    <p className='newPost-desc'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed</p>
    </Row>

    </Col>
    <Col className='btn-col' xs={12} md={2}>
    <Button className='share-btn' onClick={()=>{navigate('add/opportunity')}}>Add</Button>
    {show&& <ChallengesList handleClose={handleClose} show={show} />}
</Col>
</Row>
        )}
        
      </Container>
    )
}
export default NewPost;