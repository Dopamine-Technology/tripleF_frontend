import React,{useState,useContext,useEffect} from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import FollowBtn from '../Profile/FollowBtn';
import { useLocation } from 'react-router-dom';

function AccountCard({id,profileData,profile}) {
  const currentYear = new Date().getFullYear();
  const location = useLocation();

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
        src={profile.image?profile.image:profile.social_image}
      />
      <Card.Img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSUTrQQCHy49vdbx3hLlJqZHuzyw0NST783T1B4XqEtA&s" 
        className='cover-img'
      />
    </div>
    <Card.Body className='mt-3'>
    <Card.Title className='card-title'>
      
     {profile.first_name} {profile.last_name} 
    </Card.Title>
    {location.pathname === '/clubs/profiles/list'?( 
        <Card.Subtitle className='card-subTitle'>
          <p>{profile?.profile.country.name}</p>
</Card.Subtitle>):(
  location.pathname === '/scouts/profiles/list'?(
    <Card.Subtitle className='card-subTitle'>
    <p>{profile?.profile.years_of_experience} Years Experience</p>
</Card.Subtitle>
  ):(
    location.pathname === '/coaches/profiles/list'?(
      <Card.Subtitle className='card-subTitle'>
     <p>{profile?.profile.years_of_experience} ears Experience</p>
 </Card.Subtitle>
    ):(
      <Card.Subtitle className='card-subTitle'>
      <p>Talent</p> 
       
    <p> {profile?.profile.parent_position?.name}</p>
 </Card.Subtitle>
    )
  
  )
     
)}
   
     
<FollowBtn id={id} is_followed={false}
        updateFollowersCount={1}
        updateFollowingCount={1}
        updateIsFollowed={false} />
   
      
    </Card.Body>
   
   
  </Card>
  );
}

export default AccountCard;
