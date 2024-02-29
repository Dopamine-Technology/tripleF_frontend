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



function CoachProfileCard() {

  const { user } = useContext(UserDataContext);
 
  


  const CoachData=[
    { title: 'Gender', value:user.userData.profile.gender, svg: Heart },
    { title: 'Date Of Birth', value: user.userData.profile.birth_date, svg: Calendar },
    { title: 'Years of experience ', value: user.userData.profile.years_of_experience, svg:Calendar  },
    { title: 'Place of Residence', value: user.userData.profile.country.name, svg: Place },
    { title: 'Mobile Number', value: user.userData.profile.mobile_number, svg: Call },
 
  ]

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



    const [showFollowing, setShowFollowing] = useState(false);
    const handleCloseFollowingPopup = () => setShowFollowing(false);
      const handleShowFollowingPopup = () => setShowFollowing(true);

    const users=[
        {
            img:'https://media.istockphoto.com/id/1336646860/photo/teenage-boy-kicking-soccer-ball-in-field.jpg?s=612x612&w=0&k=20&c=yGZ7Wpd84_MhP9Ll6ol0DysGo_GUly-RQrrUmGiXSUI=',
            username:'username',
            isFollowed:false

        },
        {
            img:'https://thumbs.dreamstime.com/b/two-children-playing-soccer-training-session-happy-boys-practicing-football-summer-camp-kids-club-wearing-blue-jersey-240352926.jpg',
            username:'username',
            isFollowed:false

        },
        {
            img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREO17hg6KvLlweeZWN0LCEdi-OXM9qGpbQ9w&usqp=CAU',
            username:'username',
            isFollowed:false

        },
        {
            img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-6IvAK6rubu5Yl2MzuDBuQWUeHULHZ2MGJ6NeHQ4ToCkakMqmVSlzCyuPKo9m2vjNfcw&usqp=CAU',
            username:'username',
            isFollowed:true

        },
        {
            img:'https://media.istockphoto.com/id/1327776849/photo/dark-skinned-boy-knee-up-soccer-ball.jpg?s=612x612&w=0&k=20&c=mpgwqYf2HNOOIFztqT0_J5cTBScVgqKSJoSycnBWsdM=',
            username:'username',
            isFollowed:false

        },
        {
            img:'https://media.istockphoto.com/id/1342037702/photo/happy-little-asian-boy-with-football-ball-in-hand-over-blue-background.jpg?s=612x612&w=0&k=20&c=iYHt7GoyPIDs92mgrUUMZ5WFNNnzqtGIy6dY10vNWFY=',
            username:'username',
            isFollowed:true

        },
        
      ]

      const FollowingUsers=[
        {
            img:'https://pics.craiyon.com/2023-07-21/484a4f8e720b4353a49e0e3135e85b6b.webp',
            username:'username',
            isFollowed:true

        },
        {
            img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvEnmv8w9jWepciYHXvU3UqoNCb5ZnaWfHYge9lCsuLVy5E52Ufn8OTr30CyrcukZrTtM&usqp=CAU',
            username:'username',
            isFollowed:true

        },
        {
            img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREO17hg6KvLlweeZWN0LCEdi-OXM9qGpbQ9w&usqp=CAU',
            username:'username',
            isFollowed:true

        },
        {
            img:'https://w7.pngwing.com/pngs/613/212/png-transparent-children-player-kids-boy-young-football-soccer-thumbnail.png',
            username:'username',
            isFollowed:true

        },
        {
            img:'https://media.istockphoto.com/id/1327776849/photo/dark-skinned-boy-knee-up-soccer-ball.jpg?s=612x612&w=0&k=20&c=mpgwqYf2HNOOIFztqT0_J5cTBScVgqKSJoSycnBWsdM=',
            username:'username',
            isFollowed:true

        },
        {
            img:'https://media.istockphoto.com/id/1342037702/photo/happy-little-asian-boy-with-football-ball-in-hand-over-blue-background.jpg?s=612x612&w=0&k=20&c=iYHt7GoyPIDs92mgrUUMZ5WFNNnzqtGIy6dY10vNWFY=',
            username:'username',
            isFollowed:true

        },
        
      ]

  return (
    <Card className='profile-card' style={{padding:'0'}} >
    <div className='images-container'>
      <Card.Img
        roundedCircle
        className='profile-img'
        src={user.userData.image?user.userData.image:user.userData.social_image}
      />
      <Card.Img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ__AlJC7xkCAQituHiG5hIzlQWn-DbhiCj4g&usqp=CAU" 
        className='cover-img'
      />
    </div>
    <Card.Body className='mt-3'>
      <Card.Title className='card-title'>{user.userData.name} {user.userData.last_name}</Card.Title>
      <Card.Subtitle className='card-subTitle'>{user.userData.profile.type_name}</Card.Subtitle>
      <p className='followers-number'>
        <span className='followers-span me-2' onClick={handleShow}>9 followers</span>
        <span className='me-2'>.</span>
        <span className='followers-span' onClick={handleShowFollowingPopup}> 16 following</span>
      </p>
      
      {user.userData.profile.type_name == 'couch'||user.userData.profile.type_name == 'scout' ? 
        (CoachData.map((data, index) => (
          <div>
          <div key={index} className='d-flex mt-2 d-flex align-items-center justify-content-between mt-3'>
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
    {show && <FollowersPopup show={show} users={users} handleClose={handleClose} />}
    {showFollowing && <FollowersPopup show={showFollowing} followingUsers={FollowingUsers} handleClose={handleCloseFollowingPopup}/>}
  </Card>
  );
}

export default CoachProfileCard;
