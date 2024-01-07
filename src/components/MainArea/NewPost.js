import React,{useContext} from 'react'
import { FaGrin, FaRegThumbsUp, FaCommentAlt, FaRegShareSquare} from 'react-icons/fa';
import {MdVideoCall, MdMoreHoriz} from 'react-icons/md';
import {AiFillFileImage} from 'react-icons/ai'
import { SlPicture } from "react-icons/sl";
import { Row,Col,Container } from 'react-bootstrap';
import asset2 from '../../assets/imgs/Asset2.svg'
import {Button} from 'react-bootstrap';
import { UserDataContext } from '../UserContext/UserData.context';

function NewPost(){
    const { user } = useContext(UserDataContext);
    return(
      <Container className='new-post'>
        {user.user_type=="talent"?(
        <Row className='me-3'>
            <Col><img src={asset2} width='90px' height='70px' className='m-3' /></Col>
            <Col>
            <Row className='content-container'>
            <p className='newPost-title'>Share your challenges</p>
            <p className='newPost-desc'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed</p>
            </Row>
       
            </Col>
            <Col className='btn-col' xs={12} md={4}>
            <Button className='share-btn'>Share</Button>
    </Col>
        </Row>):(
          <p>No</p>
        )}
        
      </Container>
    )
}
export default NewPost;