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
import FollowersPopup from './FollowersPopup';
import { UserDataContext } from '../../UserContext/UserData.context';
import Email from '../../../assets/imgs/Email.svg';
import useAxios from '../../Auth/useAxiosHook.interceptor';
import nationlaity from '../../../assets/imgs/group-11@3x.webp';
import prefferedFoot from '../../../assets/imgs/run-outlined.svg';
import FollowBtn from '../FollowBtn';
import { useLanguage } from '../../LanguageContext/LanguageProvider';
import { useTranslation } from 'react-i18next';

function ProfileCard({id,profileData}) {
  const axios  = useAxios();
  const { language, changeLanguage } = useLanguage(); // Access language context
  const [direction, setDirection] = useState('ltr');
  const [t, i18n] = useTranslation();
  const currentYear = new Date().getFullYear();
  const {user}=useContext(UserDataContext);
  const TalentData= [
    { title: t('Profile.gender'), value: profileData.profile.gender, svg: Heart },
    { title: t('Profile.nationality'), value: profileData.profile.country.name, svg: nationlaity },
    { title: t('Profile.position'), value: profileData.profile.position.name, svg: Positon },
    { title: t('Profile.preferredFoot'), value: 'Left', svg: prefferedFoot },
    { title: t('Profile.birthDate'), value: profileData.profile.birth_date, svg: Calendar },
    { title: t('Profile.height'), value: profileData.profile.height, svg: Height },
    { title: t('Profile.weight'), value: profileData.profile.wight, svg: Weight },
    { title: t('Profile.residencePlace'), value: profileData.profile.country.name, svg: Place },
    { title: t('Profile.mobileNumber'), value: profileData.profile.mobile_number, svg: Call },
];

  const [activeKey,setActiveKey]=useState();
  const [followersCount, setFollowersCount] = useState(profileData.followers_count);
  const [followingCount, setFollowingCount] = useState(profileData.following_count);
  const [isFollowed, setIsFollowed] = useState(profileData.is_followed);
 

  useEffect(() => {
    // Use the language obtained from the context
    if (language === 'ar') {
        setDirection('rtl');
    } else {
        setDirection('ltr');
    }
}, [language]);


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

const handleUpdateIsFollowed = (value) => {
  setIsFollowed(value);
};




  return (
    <Card className='profile-card' style={{padding:'0'}} >
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
    <Card.Title className='card-title'>
  {profileData.first_name} {profileData.last_name}
</Card.Title>
      <Card.Subtitle className='card-subTitle'>{profileData.profile.type_name}</Card.Subtitle>
      <p className='followers-number'>
        <span className='followers-span me-2' onClick={() => handleShow('followers')}>{followersCount} {t('Profile.followers')}</span>
        <span className='me-2'>.</span>
        <span className='followers-span' onClick={() => handleShow('following')}> {followingCount} {t('Profile.following')}</span>
      </p>
      {profileData.id!=user.userData.id?  
       <FollowBtn id={id} is_followed={isFollowed}
        updateFollowersCount={updateFollowersCount}
        updateFollowingCount={updateFollowingCount}
        updateIsFollowed={setIsFollowed} />:null}
   
      {profileData.profile.type_name == 'talent' && profileData.profile.parent_position.name=='goalkeeper'&&
        <Card.Img src={GoalKeeper} className='mt-4' />
      }

        {profileData.profile.type_name == 'talent'&& profileData.profile.position.name=='Sweeper'&&
        <Card.Img src={GoalKeeper} className='mt-4' />
      }
          {profileData.profile.type_name == 'talent' && profileData.profile.position.name=='Left Back'&&
        <Card.Img src={GoalKeeper} className='mt-4' />
      }
           {profileData.profile.type_name === 'talent' && profileData.profile.position.name=='Right Back'&&
        <Card.Img src={GoalKeeper} className='mt-4' />
      }
              {profileData.profile.type_name == 'talent' && profileData.profile.position.name=='Central Back'&&
        <Card.Img src={GoalKeeper} className='mt-4' />
      }
                    {profileData.profile.type_name == 'talent' && profileData.profile.position.name=='Left Wing Back'&&
        <Card.Img src={GoalKeeper} className='mt-4' />
      }
                    {profileData.profile.type_name  == 'talent' && profileData.profile.position.name=='Right Wing Back'&&
        <Card.Img src={GoalKeeper} className='mt-4' />
      }
              {profileData.profile.type_name == 'talent' && profileData.profile.position.name=='Defending Mid Fielder'&&
        <Card.Img src={GoalKeeper} className='mt-4' />
      }
             {profileData.profile.type_name == 'talent' && profileData.profile.position.name=='Left Mid Fielder'&&
        <Card.Img src={GoalKeeper} className='mt-4' />
      }
            {profileData.profile.type_name == 'talent' && profileData.profile.position.name=='Right Mid Fielder'&&
        <Card.Img src={GoalKeeper} className='mt-4' />
      }
            {profileData.profile.type_name == 'talent' && profileData.profile.position.name=='Central Mid Fielder'&&
        <Card.Img src={GoalKeeper} className='mt-4' />
      }
            {profileData.profile.type_name == 'talent' && profileData.profile.position.name=='Attacking Mid Fielder'&&
        <Card.Img src={GoalKeeper} className='mt-4' />
      }
            {profileData.profile.type_name == 'talent' && profileData.profile.position.name=='Left Winger'&&
        <Card.Img src={GoalKeeper} className='mt-4' />
      }
             {profileData.profile.type_name == 'talent' && profileData.profile.position.name=='Right Winger'&&
        <Card.Img src={GoalKeeper} className='mt-4' />
      }
              {profileData.profile.type_name == 'talent' && profileData.profile.position.name=='Seconder Striker'&&
        <Card.Img src={GoalKeeper} className='mt-4' />
      }
              {profileData.profile.type_name == 'talent' && profileData.profile.position.name=='Central Forward'&&
        <Card.Img src={GoalKeeper} className='mt-4' />
      }
      {profileData.profile.type_name == 'talent' ? 
        (TalentData.map((data, index) => (
          <div>
          <div key={index} className=' d-flex align-items-center justify-content-between mt-1'>
            <div  className="d-flex align-items-center">
            <img src={data.svg} alt={data.title} className='me-3' /> 
            <p className='data-title me-5 mt-3' >{data.title}</p>
            </div >
            <p className='data-value mt-3'>{data.value}</p>
            </div>
            {index !== TalentData.length - 1 && <hr className='line'/>}
          </div>
          
        ))) :null
      }
    </Card.Body>
    {show && <FollowersPopup show={show}  handleClose={handleClose} id={id} activeKey={activeKey}/>}
   
  </Card>
  );
}

export default ProfileCard;
