import React,{useContext,useEffect,useState} from 'react'
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
import { useParams,useNavigate } from 'react-router-dom';
import ProfileStrongView from './ProfileStrongView';
import LoadingScreen from '../../LoadingScreen/LoadingScreen';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../LanguageContext/LanguageProvider';

function WholeProfile(){
    const axios=useAxios();
    const { id } = useParams();
    const { user } = useContext(UserDataContext);
    const [profileData,setProfileData]=useState();
    const [loading, setLoading] = useState(true);
    const navigate=useNavigate();
    const { language, changeLanguage } = useLanguage(); // Access language context
    const [direction, setDirection] = useState('ltr');
    const [t, i18n] = useTranslation();

    useEffect(() => {
        // Programmatically reload the page when the `id` parameter changes
        navigate(`/profile/${id}`);
      }, [id]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                    const response = await axios.get(`user/get_profile/${id}`);
                    setProfileData(response.data.result);
            
                
            } catch (error) {
                console.error('aya', 'Error fetching user data:', error);
            }
            finally {
                setLoading(false); 
            }
        };
      
        fetchData();
       
    }, [id]);
    

    const License=[
        {
           img:'https://c8.alamy.com/comp/T9M6KX/soccer-club-emblem-design-element-for-logo-label-sign-poster-vector-illustration-T9M6KX.jpg',
           name:'License Name',
           IssuedBy:'Lorem by',
           details:['Issued by name here' , 'Expired Date Nov 2023','Issued Date Nov 2023',' License no 1234 098 444']
        }
    ];
    const Certification=[
        {
            img:'https://c8.alamy.com/comp/T9M6KX/soccer-club-emblem-design-element-for-logo-label-sign-poster-vector-illustration-T9M6KX.jpg',
            name:'Certificate Name',
            IssuedBy:'Lorem by',
            cerdentialID:'PNO2323mm',
            date:'14/7/2020',
            details:['Issued by name here' , 'Expired Date Nov 2023','Issued Date Nov 2023',' License no 1234 098 444']
         },
         {
            img:'https://c8.alamy.com/comp/T9M6KX/soccer-club-emblem-design-element-for-logo-label-sign-poster-vector-illustration-T9M6KX.jpg',
            name:'Certificate Name',
            IssuedBy:'Lorem by',
            date:'14/7/2021',
            cerdentialID:'PNO2323mm',
            details:['Issued by name here' , 'Expired Date Nov 2023','Issued Date Nov 2023',' License no 1234 098 444']
         },

    ]

    if (loading) {
        return (
         <LoadingScreen />
        );
    }

    return(
<div style={{overflowX:'hidden'}}>
        <NavBar />
        <Row style={{marginLeft:'3rem'}}>
            <Col md={6} lg={4} xs={12}>
            {profileData && profileData.profile && profileData.profile.type_name == 'talent' ?
                <ProfileCard id={id} profileData={profileData} />:
                profileData && profileData.profile && profileData.profile.type_name == 'club' ?
                <ClubProfileCard id={id} profileData={profileData} />:
                <CoachProfileCard profileData={profileData} id={id}  />
            }
            {profileData.profile.type_name =='coach'?
               <Certifications sectionName='Coaching License' data={License} id={id}/>:null
            }

            {profileData.profile.type_name =='coach'||profileData.profile.type_name =='scout'?
               <Certifications sectionName={t('Profile.certifications')} data={Certification} id={id}/>:null
            }
        {
     id == user.userData.id ? (
    <ProfileStrong profileData={profileData} />
     ) : (
        id != user.userData.id && profileData.profile.type_name === 'club' ? null : 


    <ProfileStrongView profileData={profileData} />
    )
   }
                  
         
            </Col>
            <Col md={6} lg={8} xs={12}>
           {id == user.userData.id ? 
                <NewPost profileData={profileData} />:null}
                {
                profileData.profile.type_name=='talent'? <Post />:
                profileData.profile.type_name=='scout'||profileData.profile.type_name=='club'? <OppProfileScout  profileData={profileData}/>:
                profileData.profile.type_name=='coach'?  <Post />:
                <OppProfileScout  profileData={profileData}/>
                }
            
            </Col>
        </Row>
       </div>
    )
}

export default WholeProfile;