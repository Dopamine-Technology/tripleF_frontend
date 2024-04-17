import React from 'react';
import AccountCard from './AccountCard';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function CardsList({id,profileData,isSmallScreen}) {

    const DummyProfiles=[
        {userImg:'https://media.gettyimages.com/id/200280798-001/photo/front-profile-of-a-boy-playing-football-in-a-garden.jpg?s=170667a&w=gi&k=20&c=4XuSBXViKEU7blJ4C_1VASVKQGJii0_cC1K3ubxEuos=',
        CoverPhoto:'https://marketplace.canva.com/EAFMUqABEj8/1/0/1600w/canva-pink-minimalist-motivational-quote-facebook-cover-4i1_4CirhhQ.jpg',
         userName:'FarisJad',
         position:'Goal Keeper',
         },
         {userImg:'https://media.istockphoto.com/id/1400839503/photo/adorable-little-mixed-race-child-thinking-at-home-one-small-cute-hispanic-girl-sitting-alone.jpg?s=612x612&w=0&k=20&c=j17E794oSimfKA_BP55FWRuyl04hdnkoC0UnbJ4UYnc=',
         CoverPhoto:'https://marketplace.canva.com/EAFMUqABEj8/1/0/1600w/canva-pink-minimalist-motivational-quote-facebook-cover-4i1_4CirhhQ.jpg',
         userName:'FarisJad',
         position:'Goal Keeper',
         },
         { userImg:'https://img.freepik.com/free-photo/front-view-happy-little-girl-home-during-online-school-with-laptop_23-2148827496.jpg',
         CoverPhoto:'https://marketplace.canva.com/EAFMUqABEj8/1/0/1600w/canva-pink-minimalist-motivational-quote-facebook-cover-4i1_4CirhhQ.jpg',
         userName:'FarisJad',
         position:'Goal Keeper',
         },
         { userImg:'https://tmssl.akamaized.net/images/wappen/big/583.png?lm=1522312728',
         CoverPhoto:'https://marketplace.canva.com/EAFMUqABEj8/1/0/1600w/canva-pink-minimalist-motivational-quote-facebook-cover-4i1_4CirhhQ.jpg',
         userName:'FarisJad',
         position:'Goal Keeper',
         },
         { userImg:'https://tmssl.akamaized.net/images/wappen/big/583.png?lm=1522312728',
         CoverPhoto:'https://marketplace.canva.com/EAFMUqABEj8/1/0/1600w/canva-pink-minimalist-motivational-quote-facebook-cover-4i1_4CirhhQ.jpg',
         userName:'FarisJad',
         position:'Goal Keeper',
         },
         { userImg:'https://img.freepik.com/free-photo/front-view-happy-little-girl-home-during-online-school-with-laptop_23-2148827496.jpg',
         CoverPhoto:'https://marketplace.canva.com/EAFMUqABEj8/1/0/1600w/canva-pink-minimalist-motivational-quote-facebook-cover-4i1_4CirhhQ.jpg',
         userName:'FarisJad',
         position:'Goal Keeper',
         },
         { userImg:'https://img.freepik.com/free-photo/front-view-happy-little-girl-home-during-online-school-with-laptop_23-2148827496.jpg',
         CoverPhoto:'https://marketplace.canva.com/EAFMUqABEj8/1/0/1600w/canva-pink-minimalist-motivational-quote-facebook-cover-4i1_4CirhhQ.jpg',
         userName:'FarisJad',
         position:'Goal Keeper',
         },
         { userImg:'https://img.freepik.com/free-photo/front-view-happy-little-girl-home-during-online-school-with-laptop_23-2148827496.jpg',
         CoverPhoto:'https://marketplace.canva.com/EAFMUqABEj8/1/0/1600w/canva-pink-minimalist-motivational-quote-facebook-cover-4i1_4CirhhQ.jpg',
         userName:'FarisJad',
         position:'Goal Keeper',
         },
    ];
    const numColumns = 4;

  return(
    <Container>
    {DummyProfiles.map((profile, index) => (
        (index % numColumns === 0 || index === DummyProfiles.length - 1) && (
            <Row key={index} style={{marginLeft:isSmallScreen?'3rem':''}}>
                {DummyProfiles.slice(index, index + numColumns).map((profile, i) => (
                    <Col key={i} md={3}>
                        <AccountCard profile={profile} />
                    </Col>
                ))}
            </Row>
        )
    ))}
</Container>
    
  )
}

export default CardsList;