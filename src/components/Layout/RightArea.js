import React from 'react'
import { Button } from 'react-bootstrap';

function RightArea(){

    const profilesData = [
        {
          imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfE7-EeamPBHVBVAQL9N_H-Gc0XjmI9AktmA&usqp=CAU',
          username: 'Username',
          challengeType: 'Challenge Type',
        },
        {
          imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaN8kksOwben7WyX6Pws4AdKvcbho7wqgIzlIc8yrTGehS7aAJd6fPJGoSRbY6HxMphfA&usqp=CAU',
          username: 'Username',
          challengeType: 'Challenge Type',
        },
        {
          imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYiiMz1vmYE_WAxPaaThLOz7PbxjXeJmv2BRlgK14MlYVojGClOxXo1k4kJDlNfcOnPSM&usqp=CAU',
          username: 'Username',
          challengeType: 'Challenge Type',
        }
      ];
      const clubsData = [
        {
          imageSrc: 'https://marketplace.canva.com/EAFn79D1vQ4/1/0/1600w/canva-red-white-and-black-modern-football-club-logo-cyuklMnKVrQ.jpg',
          clubName: 'Club Name here',
        },
        {
          imageSrc: 'https://static.vecteezy.com/system/resources/previews/005/106/490/non_2x/soccer-logo-or-football-club-sign-badge-football-logo-with-shield-background-design-vector.jpg',
          clubName: 'Club Name here',
        },
        {
          imageSrc: 'https://img.freepik.com/free-vector/logo-template-design_1195-105.jpg',
          clubName: 'Club Name here',
        },
      ];
    return(
        <div>
       <div className="RightArea">
      <div className="RecommendedChallenges">
        <h5>Recommended Challenges</h5>
        <hr />
      </div>
      {profilesData.map((profile, index) => (
      <div className="Profile" key={index}>
      <img
        src={profile.imageSrc}
        alt="Profile Pic"
        style={{ height: '50px', width: '50px', borderRadius: '60%' }}
      />
      <div>
        <span className='username'>{profile.username}</span>
        <br />
        <span className='challenge-type' >{profile.challengeType}</span>
      </div>
    </div>
      ))}
      <Button className='discover-btn'>Discover more</Button>
    </div>

    <div className="RightArea">
      <div className="RecommendedChallenges">
        <h5>Clubs to Follow</h5>
        <hr />
      </div>
      {clubsData.map((club, index) => (
        <div className="Profile" key={index}>
          <img
            src={club.imageSrc}
            alt="Profile Pic"
            style={{ height: '60px', width: '50px', borderRadius: '60%' }}
          />
          <div>
            {club.clubName}
            <br />
            <Button variant="outline-success" className='mt-2' style={{borderRadius:'18px'}}>+ Follow</Button>
          </div>
        </div>
      ))}
       <Button className='discover-btn'>Discover more</Button>
    </div>
    <div className="RightArea">
      <div className="RecommendedChallenges">
        <h5>Scouts to Follow </h5>
        <hr />
      </div>
      {clubsData.map((club, index) => (
        <div className="Profile" key={index}>
          <img
            src={club.imageSrc}
            alt="Profile Pic"
            style={{ height: '60px', width: '50px', borderRadius: '60%' }}
          />
          <div>
            {club.clubName}
            <br />
            <Button variant="outline-success" className='mt-2' style={{borderRadius:'18px'}}>+ Follow</Button>
          </div>
        </div>
      ))}
       <Button className='discover-btn'>Discover more</Button>
    </div>
        </div>
    )
}

export default RightArea;