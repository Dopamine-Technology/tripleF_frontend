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

function ProfileCard({id,profileData}) {
  const { user } = useContext(UserDataContext);
  const axios  = useAxios();
  const currentYear = new Date().getFullYear();
  const TalentData= [
    { title: 'gender', value: profileData.profile.gender, svg: Heart },
    { title: 'Nationality', value: profileData.profile.country.name, svg: Positon },
    { title: 'position', value: profileData.profile.position.name, svg: Positon },
    { title: 'Preferred Foot', value: 'Left', svg: Positon },
    { title: 'Date Of Birth', value: profileData.profile.birth_date, svg: Calendar },
    { title: 'Height', value: profileData.profile.height, svg: Height },
    { title: 'Weight', value: profileData.profile.wight, svg: Weight },
    { title: 'Place of Residence', value: profileData.profile.country.name, svg: Place },
    { title: 'Mobile Number', value: profileData.profile.mobile_number, svg: Call },
] ;

  const ClubData=[
    { title: 'Year Founded', value: '18 Feb, 2023', svg: Calendar },
    { title: 'Country', value: 'Jordan', svg: Place },
    { title: 'Mobile Number', value: '+962 79 000 0000', svg: Call },
    { title: 'Email', value: 'example@domain.com', svg: Email },
  ]
  const [activeKey,setActiveKey]=useState();



  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (whichOne) =>
  { setShow(true)
  setActiveKey(whichOne)
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
  {profileData.first_name} ${profileData.last_name}
</Card.Title>
      <Card.Subtitle className='card-subTitle'>{user.userData.profile.type_name}</Card.Subtitle>
      <p className='followers-number'>
        <span className='followers-span me-2' onClick={() => handleShow('followers')}>9 followers</span>
        <span className='me-2'>.</span>
        <span className='followers-span' onClick={() => handleShow('following')}> 16 following</span>
      </p>
      {user.userData.profile.type_name === 'talent' && user.userData.profile.parent_position=='goalkeeper'&&
        <Card.Img src={GoalKeeper} className='mt-4' />
      }
         {user.userData.profile.type_name === 'talent' && user.userData.profile.position.name=='Sweeper'&&
        <Card.Img src={GoalKeeper} className='mt-4' />
      }
          {user.userData.profile.type_name === 'talent' && user.userData.profile.position.name=='Left Back'&&
        <Card.Img src={GoalKeeper} className='mt-4' />
      }
           {user.userData.profile.type_name === 'talent' && user.userData.profile.position.name=='Right Back'&&
        <Card.Img src={GoalKeeper} className='mt-4' />
      }
              {user.userData.profile.type_name === 'talent' && user.userData.profile.position.name=='Central Back'&&
        <Card.Img src={GoalKeeper} className='mt-4' />
      }
                    {user.userData.profile.type_name === 'talent' && user.userData.profile.position.name=='Left Wing Back'&&
        <Card.Img src={GoalKeeper} className='mt-4' />
      }
                    {user.userData.profile.type_name === 'talent' && user.userData.profile.position.name=='Right Wing Back'&&
        <Card.Img src={GoalKeeper} className='mt-4' />
      }
              {user.userData.profile.type_name === 'talent' && user.userData.profile.position.name=='Defending Mid Fielder'&&
        <Card.Img src={GoalKeeper} className='mt-4' />
      }
             {user.userData.profile.type_name === 'talent' && user.userData.profile.position.name=='Left Mid Fielder'&&
        <Card.Img src={GoalKeeper} className='mt-4' />
      }
            {user.userData.profile.type_name === 'talent' && user.userData.profile.position.name=='Right Mid Fielder'&&
        <Card.Img src={GoalKeeper} className='mt-4' />
      }
            {user.userData.profile.type_name === 'talent' && user.userData.profile.position.name=='Central Mid Fielder'&&
        <Card.Img src={GoalKeeper} className='mt-4' />
      }
            {user.userData.profile.type_name === 'talent' && user.userData.profile.position.name=='Attacking Mid Fielder'&&
        <Card.Img src={GoalKeeper} className='mt-4' />
      }
            {user.userData.profile.type_name === 'talent' && user.userData.profile.position.name=='Left Winger'&&
        <Card.Img src={GoalKeeper} className='mt-4' />
      }
             {user.userData.profile.type_name === 'talent' && user.userData.profile.position.name=='Right Winger'&&
        <Card.Img src={GoalKeeper} className='mt-4' />
      }
              {user.userData.profile.type_name === 'talent' && user.userData.profile.position.name=='Seconder Striker'&&
        <Card.Img src={GoalKeeper} className='mt-4' />
      }
              {user.userData.profile.type_name === 'talent' && user.userData.profile.position.name=='Central Forward'&&
        <Card.Img src={GoalKeeper} className='mt-4' />
      }
      {user.userData.profile.type_name == 'talent' ? 
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
