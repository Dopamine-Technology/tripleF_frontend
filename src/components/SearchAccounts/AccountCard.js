import React,{useState,useContext,useEffect} from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import FollowBtn from '../Profile/FollowBtn';

function AccountCard({id,profileData}) {
  const currentYear = new Date().getFullYear();


  const [activeKey,setActiveKey]=useState();
 
  const [isFollowed, setIsFollowed] = useState(false);


  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (whichOne) =>
  { setShow(true)
  setActiveKey(whichOne)
  };









  return (
    <Card className='account-card' style={{padding:'0'}} >
    <div className='images-container'>
      <Card.Img
        roundedCircle
        className='account-img'
        src='https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0='
      />
      <Card.Img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSUTrQQCHy49vdbx3hLlJqZHuzyw0NST783T1B4XqEtA&s" 
        className='cover-img'
      />
    </div>
    <Card.Body className='mt-3'>
    <Card.Title className='card-title'>
    Talent Name here
    </Card.Title>
      <Card.Subtitle className='card-subTitle'>
       <p>Talent</p> 
        
     <p> Goal Keeper</p>
</Card.Subtitle>
     
<FollowBtn id={id} is_followed={false}
        updateFollowersCount={1}
        updateFollowingCount={1}
        updateIsFollowed={false} />
   
      
    </Card.Body>
   
   
  </Card>
  );
}

export default AccountCard;
