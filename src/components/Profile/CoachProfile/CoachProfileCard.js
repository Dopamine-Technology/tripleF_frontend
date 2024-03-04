import React,{useState,useContext,useEffect} from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import NavBar from '../../Layout/Navbar';
import Card from 'react-bootstrap/Card';
import GoalKeeper from '../../../assets/imgs/GoalKeeper.svg';
import Heart from '../../../assets/imgs/heart.svg';
import Positon from '../../../assets/imgs/position.svg';
import Calendar from '../../../assets/imgs/calendar.svg';
import Height from '../../../assets/imgs/Height.svg';
import Weight from '../../../assets/imgs/weight.svg';
import Place from '../../../assets/imgs/place.svg';
import Call from '../../../assets/imgs/call.svg';
import { Link } from 'react-router-dom';
import FollowersPopup from '../TalentProfile/FollowersPopup';
import { UserDataContext } from '../../UserContext/UserData.context';
import Email from '../../../assets/imgs/Email.svg';
import { RiFootballLine } from "react-icons/ri";
import nationlaity from '../../../assets/imgs/group-11@3x.webp';
import LanguageIcon from '../../../assets/imgs/languageIconProfile.svg';
import exp from '../../../assets/imgs/sport-filled-soccer.svg'



function CoachProfileCard({profileData,id}) {

  const { user } = useContext(UserDataContext);
 
  const CoachData=[
    { title: 'Gender', value:profileData.profile.gender, svg: Heart },
    { title: 'Nationality', value: profileData.profile.country.name, svg: nationlaity },
    { title: 'Languages', value: 'Arabic, English', svg: LanguageIcon },
    { title: 'Date Of Birth', value: profileData.profile.birth_date, svg: Calendar },
    { title: 'Years of experience ', value: profileData.profile.years_of_experience, svg:exp  },
    { title: 'Place of Residence', value: profileData.profile.country.name, svg: Place },
    { title: 'Mobile Number', value: profileData.profile.mobile_number, svg: Call },
 
  ]

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (whichOne) => 
  {setShow(true)
    setActiveKey(whichOne)}

    const [activeKey,setActiveKey]=useState();

  return (
    <Card className='profile-card' style={{padding:'0'}} >
      {console.log('profile',profileData)}
    <div className='images-container'>
      <Card.Img
        roundedCircle
        className='profile-img'
        src={profileData.image?profileData.image:profileData.social_image}
      />
      <Card.Img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ__AlJC7xkCAQituHiG5hIzlQWn-DbhiCj4g&usqp=CAU" 
        className='cover-img'
      />
    </div>
    <Card.Body className='mt-3'>
      <Card.Title className='card-title'>{profileData.name} {profileData.last_name}</Card.Title>
      <Card.Subtitle className='card-subTitle'>{profileData.profile.type_name}</Card.Subtitle>
      <p className='followers-number'>
        <span className='followers-span me-2' onClick={() => handleShow('followers')}>{profileData.followers_count} followers</span>
        <span className='me-2'>.</span>
        <span className='followers-span' onClick={() => handleShow('following')}> {profileData.following_count} following</span>
      </p>
      
      {profileData.profile.type_name == 'coach'||profileData.profile.type_name == 'scout' ? 
        (CoachData.map((data, index) => (
          <div>
          <div key={index} className='d-flex  d-flex align-items-center justify-content-between '>
            <div  className="d-flex align-items-center">
            <img src={data.svg} alt={data.title} className='me-3' /> 
            <p className='data-title me-5 mt-3' >{data.title}</p>
            </div>
            <p className='data-value mt-3'>{data.value}</p>
        
          </div>
         {index !== CoachData.length - 1 && <hr className='line'/>}
          </div>
        ))) :null
      }
    </Card.Body>
    {show && <FollowersPopup show={show}  handleClose={handleClose} id={id} activeKey={activeKey}/>}
  </Card>
  );
}

export default CoachProfileCard;
