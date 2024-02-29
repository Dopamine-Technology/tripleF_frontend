import React,{useContext} from 'react'
import { Row,Col,Container } from 'react-bootstrap';
import NavBar from '../../Layout/Navbar';
import ProfileCard from './ProfileCard';
import '../style.css';
import Post from './Post';
import NewPost from '../../MainArea/NewPost';
import { UserDataContext } from '../../UserContext/UserData.context';
import OpportunityList from '../../Opportunities/OpportunityList';
import useAxios from '../../Auth/useAxiosHook.interceptor';
import ProfileStrong from './ProfileStrong';
import ClubProfileCard from '../ClubProfile/ClubProfileCard';
import OppPost from '../ClubProfile/OppPost';
import CoachProfileCard from '../CoachProfile/CoachProfileCard';
import OppProfileScout from '../ScoutProfile/OppProfileScout';
import Certifications from '../CoachProfile/Certifications';
import { useParams } from 'react-router-dom';
import ProfileStrongView from './ProfileStrongView';

function WholeProfile(){
    const axios=useAxios();
    const { id } = useParams();
    const { user } = useContext(UserDataContext);
    const License=[
        {
           img:'https://c8.alamy.com/comp/T9M6KX/soccer-club-emblem-design-element-for-logo-label-sign-poster-vector-illustration-T9M6KX.jpg',
           name:'License Name',
           details:['Issued by name here' , 'Expired Date Nov 2023','Issued Date Nov 2023',' License no 1234 098 444']
        }
    ];
    const Certification=[
        {
            img:'https://c8.alamy.com/comp/T9M6KX/soccer-club-emblem-design-element-for-logo-label-sign-poster-vector-illustration-T9M6KX.jpg',
            name:'Certificate Name',
            details:['Issued by name here' , 'Expired Date Nov 2023','Issued Date Nov 2023',' License no 1234 098 444']
         },
         {
            img:'https://c8.alamy.com/comp/T9M6KX/soccer-club-emblem-design-element-for-logo-label-sign-poster-vector-illustration-T9M6KX.jpg',
            name:'Certificate Name',
            details:['Issued by name here' , 'Expired Date Nov 2023','Issued Date Nov 2023',' License no 1234 098 444']
         },

    ]

    return(
<div style={{overflowX:'hidden'}}>
        <NavBar />
        <Row style={{marginLeft:'3rem'}}>

            <Col md={6} lg={4} xs={12}>
            {user.userData.profile.type_name=='talent'?
                <ProfileCard />:
                user.userData.profile.type_name=='club'?
                <ClubProfileCard id={id}/>:
                
                <CoachProfileCard />
            }
            {user.userData.profile.type_name=='couch'?
               <Certifications sectionName='Coaching License' data={License} id={id}/>:null
            }

            {user.userData.profile.type_name=='couch'||user.userData.profile.type_name=='scout'?
               <Certifications sectionName='Certifications' data={Certification} id={id}/>:null
            }
        {
  id == null ? (
    <ProfileStrong />
  ) : (
    id != null && user.userData.profile.type_name === 'club' ? null : 


    <ProfileStrongView />
  )
}
                  
         
            </Col>
            <Col md={6} lg={8} xs={12}>
                <NewPost />
                {
                user.userData.profile.type_name=='talent'? <Post />:
                user.userData.profile.type_name=='scout'? <OppProfileScout />:
                <OppPost />
                }
            
            </Col>
        </Row>
       </div>
    )
}

export default WholeProfile;