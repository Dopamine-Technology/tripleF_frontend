import React,{useState,useContext,useEffect} from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import FollowBtn from '../Profile/FollowBtn';
import { useLocation } from 'react-router-dom';

function AccountCard({profile}) {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const [activeKey,setActiveKey]=useState();
  const [followersCount, setFollowersCount] = useState(profile.followers_count);
  const [followingCount, setFollowingCount] = useState(profile.following_count);
  const [isFollowed, setIsFollowed] = useState(profile.is_followed);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (whichOne) =>
  { setShow(true)
  setActiveKey(whichOne)
  };
  const updateFollowersCount = (count) => {
    setFollowersCount(prevCount => prevCount + count);

};
const updateFollowingCount = (count) => {
  setFollowersCount(prevCount => prevCount + count);

};

  return (
   
    <Card className='account-card' style={{padding:'0'}}>
    <div className='images-container'>
      <Card.Img
        roundedCircle
        className='account-img'
        src={profile.image?profile.image:profile.social_image}
      />
      <Card.Img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHAQtNjjewe_ekXHvG5oZ4W7bOAt6qpk3LQzx-bkO6WGg3oJlZakcAB6DL3jG76IHFZfU&usqp=CAU" 
        className='cover-img'
        style={{height:'8rem'}}
      />
    </div>
    <Card.Body className='mt-3'>
    <Card.Title className='card-title'>
    <Link to={`/profile/${profile.id}`} style={{ textDecoration: 'none', cursor: 'pointer',color:'black' }}>
    {location.pathname === '/clubs/profiles/list' ? (
  profile.profile.club_name
) : (
  profile.first_name + ' ' + profile.last_name
)}
  </Link>
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
     <p>{profile?.profile.years_of_experience} years Experience</p>
 </Card.Subtitle>
    ):(
      <Card.Subtitle className='card-subTitle'>
      <p>Talent</p> 
       
    <p> {profile?.profile.parent_position?.name}</p>
 </Card.Subtitle>
    )
  
  )
     
)}
   
     
<FollowBtn id={profile.id} is_followed={isFollowed}
        updateFollowersCount={updateFollowersCount}
        updateFollowingCount={updateFollowingCount}
        updateIsFollowed={setIsFollowed} />
   
      
    </Card.Body>
   
   
  </Card>

  );
}

export default AccountCard;
