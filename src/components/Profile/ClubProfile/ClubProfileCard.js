import React,{useState,useContext,useEffect} from 'react';
import Card from 'react-bootstrap/Card';
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
import checkmark from '../../../assets/imgs/checkmark.svg'


function ClubProfileCard({id,profileData}) {

  const { user } = useContext(UserDataContext);
  const currentYear = new Date().getFullYear();


  const ClubData=[
    { title: 'Year Founded', value:`${profileData.profile.year_founded} (${ currentYear - profileData.profile.year_founded} years)`, svg: Calendar },
    { title: 'Country', value: profileData.profile.country.name, svg: Place },
    { title: 'Mobile Number', value: profileData.profile.mobile_number, svg: Call },
    { title: 'Email', value: profileData.email, svg: Email },
 
  ]
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (whichOne) => 
  {setShow(true)
    setActiveKey(whichOne)}

      const [activeKey,setActiveKey]=useState();
   

  return (
    <Card className='profile-card'style={{padding:'0'}} >
    <div className='images-container'>
      <Card.Img
        roundedCircle
        className='profile-img'
        src={profileData.profile.club_logo}
      />
      <Card.Img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ__AlJC7xkCAQituHiG5hIzlQWn-DbhiCj4g&usqp=CAU" 
        className='cover-img'
      />
    </div>
    <Card.Body className='mt-3'>
      <Card.Title className='card-title'>{profileData.profile.club_name} {id!=null?<img src={checkmark} />:null}</Card.Title>
      <Card.Subtitle className='card-subTitle'>{profileData.profile.type_name}</Card.Subtitle>
      <p className='followers-number'>
        <span className='followers-span me-2' onClick={() => handleShow('followers')}>{profileData.followers_count} followers</span>
        <span className='me-2'>.</span>
        <span className='followers-span' onClick={() => handleShow('following')}> {profileData.following_count} following</span>
      </p>
      
      {profileData.profile.type_name == 'club' ? 
        (ClubData.map((data, index) => (
          <div>
          <div key={index} className='d-flex  d-flex align-items-center justify-content-between '>
            <div  className="d-flex align-items-center">
            <img src={data.svg} alt={data.title} className='me-3' /> 
            <p className='data-title me-5 mt-3' >{data.title}</p>
            </div >
            <p className='data-value mt-3'>{data.value}</p>
            </div>
            {index !== ClubData.length - 1 && <hr className='line'/>}
          </div>
        ))) :null
      }
    </Card.Body>
    {show && <FollowersPopup show={show}  handleClose={handleClose} id={id} activeKey={activeKey}/>}
    
  </Card>
  );
}

export default ClubProfileCard;
