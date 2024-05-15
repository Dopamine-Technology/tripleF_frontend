import React,{useEffect,useState} from 'react'
import { Button } from 'react-bootstrap';
import useAxios from '../Auth/useAxiosHook.interceptor';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../LanguageContext/LanguageProvider';
import FollowBtn from '../Profile/FollowBtn';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function RightArea(){

  const [clubData,setClubData]=useState();
  const [scoutData,setScoutData]=useState();
  const [talentData,setTalentData]=useState();
  const [challenges,setChallenges]=useState();
  const axios=useAxios();
  const [isFollowed, setIsFollowed] = useState(false);
  const { language, changeLanguage } = useLanguage(); // Access language context
    const [direction, setDirection] = useState('ltr');
    const [t, i18n] = useTranslation();
    const [followersCount, setFollowersCount] = useState();
    const navigate=useNavigate();

    const updateFollowersCount = (count) => {
      setFollowersCount(prevCount => prevCount + count);
  
  };

  useEffect(() => {

    const fetchClubData = async () => {
      try {
        const requestBody = {
          type: 1,
          limit: 5, // Limiting to five accounts
          index: 0,
        };
    
        const response = await axios.post('profiles/clubs', requestBody);
        const fetchedData = response.data.result;
    
        // Check if the fetched data contains less than five accounts
        if (fetchedData.length < 5) {
          setClubData(fetchedData);
        } else {
          // If the fetched data contains five accounts, stop fetching
          const firstFiveAccounts = fetchedData.slice(0, 4);
          setClubData(firstFiveAccounts);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchScoutData = async () => {
      try {
        const requestBody = {
          type: 1,
          limit: 5, // Limiting to five accounts
          index: 0,
        };
    
        const response = await axios.post('profiles/scout', requestBody);
        const fetchedData = response.data.result;
    
        // Check if the fetched data contains less than five accounts
        if (fetchedData.length < 5) {
          setScoutData(fetchedData);
        } else {
          // If the fetched data contains five accounts, stop fetching
          const firstFiveAccounts = fetchedData.slice(0, 4);
          setScoutData(firstFiveAccounts);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    

    const fetchTalentData = async () => {
      try {
        const requestBody = {
          type: 1,
          limit: 5, // Limiting to five accounts
          index: 0,
        };
    
        const response = await axios.post('profiles/talents', requestBody);
        const fetchedData = response.data.result;
    
        // Check if the fetched data contains less than five accounts
        if (fetchedData.length < 5) {
          setTalentData(fetchedData);
        } else {
          // If the fetched data contains five accounts, stop fetching
          const firstFiveAccounts = fetchedData.slice(0, 4);
          setTalentData(firstFiveAccounts);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchClubData();
    fetchScoutData();
    fetchTalentData();
    
  }, []);

  const handleToggleFollow = async (id)=>{
    try {
      const response = await axios.get(`follow/toggle/${id}`);
      console.log('Follow status toggled:', response.data);
      setClubData((prevData) => prevData.filter((club) => club.id !== id));
    } catch (error) {
      console.error('Error toggling follow:', error);
    }
  }

  const handleDiscoverClick = (navigationLink) => {
    navigate(navigationLink);
  };
  
    const profilesData = [
        {
          imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfE7-EeamPBHVBVAQL9N_H-Gc0XjmI9AktmA&usqp=CAU',
          username: 'Username',
          challengeType: 'Challenge Type',
        },
        {
          imageSrc: 'https://media.istockphoto.com/id/544358500/photo/soccer-player-man-isolated.jpg?s=612x612&w=0&k=20&c=oSE09fJUpl0H1XMgK8J9NNpwmcYAoEFfNxm-mthM1-w=',
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
        },
        {
          imageSrc: 'https://i.pinimg.com/236x/97/43/ec/9743ecac80966a95e9d328c08b995c04.jpg',
          username: 'Username',
          challengeType: 'Challenge Type',
        }
      ];
      const clubsData = [
        {
          imageSrc: 'https://marketplace.canva.com/EAFn79D1vQ4/1/0/1600w/canva-red-white-and-black-modern-football-club-logo-cyuklMnKVrQ.jpg',
          clubName: 'Club Name ',
          id:1,
          isFollowed:false
        },
        {
          imageSrc: 'https://static.vecteezy.com/system/resources/previews/005/106/490/non_2x/soccer-logo-or-football-club-sign-badge-football-logo-with-shield-background-design-vector.jpg',
          clubName: 'Club Name ',
          isFollowed:false,
          id:2
        },
        {
          imageSrc: 'https://static.vecteezy.com/system/resources/previews/005/106/490/non_2x/soccer-logo-or-football-club-sign-badge-football-logo-with-shield-background-design-vector.jpg',
          clubName: 'Club Name ',
          isFollowed:false,
          id:4
        },
        {
          imageSrc: 'https://img.freepik.com/free-vector/logo-template-design_1195-105.jpg',
          clubName: 'Club Name ',
          id:3,
          isFollowed:true
        },
      ];
      const scoutData2 = [
        {
          imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv608YcU3z4oPtBsdEL4Pm3kpFLR98sZBtQg&usqp=CAU',
          clubName: 'Scout Name ',
          id:1,
          isFollowed:false
        },
        {
          imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRue5VRdL19XyjM8xrWGW_Pe_avRMuuvOkZtA&usqp=CAU',
          clubName: 'Scout Name ',
          isFollowed:false,
          id:2
        },
        {
          imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYzDV9oMHp7mVm2XIKVfgIoVBUrIcNnBgzgw&usqp=CAU',
          clubName: 'Scout Name ',
          isFollowed:false,
          id:4
        },
        {
          imageSrc: 'https://img.freepik.com/free-photo/portrait-young-man-with-glasses_641386-302.jpg',
          clubName: 'Scout Name ',
          id:3,
          isFollowed:true
        },
      ];
      


      const renderDataSection = (sectionTitle, sectionData, isClub, isScout,navigationLink) => (
        <div className="RightArea" key={sectionTitle}>
          <div className="RecommendedChallenges">
            <h5>{sectionTitle}</h5>
            <hr style={{ color: 'black' }} />
          </div>
          {sectionData && sectionData.length > 0 ? (
            sectionData.map((item, index) => (
          
              <div className="Profile" key={index}>
                <img
                  src={item.image}
                  alt="Profile Pic"
                  className={!isClub ? `rightSide-img` : ''}
                  style={{ height: '3rem', width: '3rem', borderRadius: '60%', backgroundColor: '#213555' }}
                />
                <div>
                <Link to={`/profile/${item.id}`} style={{textDecoration:'none',color:'none'}}>
                  <span className={isClub ? 'username' : 'username'}>{isClub ? item.profile.club_name : item.user_name ? item.user_name : item.first_name + item.last_name}</span>
                </Link>
                  <br />
                  {isClub || isScout ? (
                    <FollowBtn
                      id={item.id}
                      is_followed={item.isFollowed} // Pass the correct is_followed value from the data
                      updateFollowersCount={updateFollowersCount}
                      updateIsFollowed={(isFollowed) => {
                        // Update the specific item's isFollowed in the data
                        const updatedData = sectionData.map((dataItem) => {
                          if (dataItem.id === item.id) {
                            return { ...dataItem, isFollowed: !item.isFollowed };
                          }
                          return dataItem;
                        });
                        // Update the state with the updated data
                        if (isClub) {
                          setClubData(updatedData);
                        } else if (isScout) {
                          setScoutData(updatedData);
                        }
                      }}
                    />
                  ) : (
                    <span className="challenge-type">{item.challengeType}</span>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>No data available</p>
          )}
          <Button className="discover-btn" onClick={()=>{handleDiscoverClick(navigationLink)}}>{t('mainarea.discoverBtn')}</Button>
        </div>
      );
      
      
    
    return(
      <div  >
      {renderDataSection(t('mainarea.recommendedChallenges'), talentData,false,false,'talents/profiles/list')}
      {renderDataSection(t('mainarea.followClubs'), clubData,true,false,'clubs/profiles/list')}
      {renderDataSection(t('mainarea.followScouts'), scoutData,false,true,'scouts/profiles/list')}
    </div>
    )
}

export default RightArea;

