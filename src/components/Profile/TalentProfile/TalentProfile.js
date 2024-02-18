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

function TalentProfile(){
    const axios=useAxios();
    const { user } = useContext(UserDataContext);
    return(
<div style={{overflowX:'hidden'}}>
        <NavBar />
        <Row style={{marginLeft:'3rem'}}>

            <Col md={6} lg={4} xs={12}>
                <ProfileCard />
            </Col>
            <Col md={6} lg={8} xs={12}>
                <NewPost />
                {

user.userData.profile.type_name=='talent'? <Post />:null
                }
            
                </Col>
        </Row>
       </div>
    )
}

export default TalentProfile;