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
import exp from '../../../assets/imgs/sport-filled-soccer.svg';
import FollowBtn from '../FollowBtn';
import { useLanguage } from '../../LanguageContext/LanguageProvider';
import { useTranslation } from 'react-i18next';
import MessageBtn from '../MessageBtn';


function CoachProfileCard({profileData,id}) {

  const { language, changeLanguage } = useLanguage(); // Access language context
  const [direction, setDirection] = useState('ltr');
  const [t, i18n] = useTranslation();
  const { user } = useContext(UserDataContext);

  const birthDate = new Date(profileData.profile.birth_date);
const today = new Date();
const age = today.getFullYear() - birthDate.getFullYear();

const hasBirthdayOccurred = today.getMonth() >= birthDate.getMonth() &&
  today.getDate() >= birthDate.getDate();

const finalAge = hasBirthdayOccurred ? age : age - 1;
 
  const CoachData=[
    { title: t('Profile.gender'), value:profileData.profile.gender, svg: Heart },
    { title: t('Profile.nationality'), value: profileData.profile.country.name, svg: nationlaity },
    { title: t('Profile.languages'), value: 'Arabic, English', svg: LanguageIcon },
    { title: t('Profile.birthDate'), value: `${profileData.profile.birth_date} (${finalAge} years) `, svg: Calendar },
    { title: t('Profile.exp_years'), value: profileData.profile.years_of_experience, svg:exp  },
    { title: t('Profile.residencePlace'), value: profileData.profile.country.name, svg: Place },
    { title: t('Profile.mobileNumber'), value: profileData.profile.mobile_number, svg: Call },
 
  ]

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (whichOne) => 
  {setShow(true)
    setActiveKey(whichOne)
  }

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
        <span className='followers-span me-2' onClick={() => handleShow('followers')}>{profileData.followers_count} {t('Profile.followers')}</span>
        <span className='me-2'>.</span>
        <span className='followers-span' onClick={() => handleShow('following')}> {profileData.following_count} {t('Profile.following')}</span>
      </p>
      {profileData.id!=user.userData.id?   <FollowBtn id={id}  is_followed={profileData.is_followed}/>:null}
      {profileData.id!=user.userData.id?   <MessageBtn />:null}
      
      {profileData.profile.type_id == '2'||profileData.profile.type_id == '4' ? 
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
