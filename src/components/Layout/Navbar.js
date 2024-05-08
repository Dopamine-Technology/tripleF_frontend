import React, { useContext,useEffect,useState } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import Logo from '../../assets/imgs/LogoLastVersion.png'
import { AiOutlineSearch } from "react-icons/ai";
import { MdArrowDropDown } from "react-icons/md";
import { AiOutlineMessage } from "react-icons/ai";
import { Dropdown, Space, message, notification } from "antd";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { UserDataContext } from "../UserContext/UserData.context";
import Profile from '../../assets/imgs/profile.svg';
import Settings from '../../assets/imgs/settings.svg';
import Language from '../../assets/imgs/LangaugeIcon.svg';
import signOut from '../../assets/imgs/signout.svg';
import { Link ,useNavigate} from 'react-router-dom';
import Cookies from "js-cookie";
import useAxios from "../Auth/useAxiosHook.interceptor";
import { RxHamburgerMenu } from "react-icons/rx";
import messagesIcon from '../../assets/imgs/messages.svg';
import NotificationIcon from '../../assets/imgs/notificationIcon.svg';
import NotificationDropDown from "../Notification/NotificationDropDown";
import { SearchResultsList } from "./SearchResultsList";
import { useLanguage } from '../LanguageContext/LanguageProvider';
import { useTranslation } from 'react-i18next';
import Pusher from 'pusher-js'; 

function NavBar({ toggleCollapse,isSmallScreen,notifications ,isProScreen}) {
    const { user } = useContext(UserDataContext);
    const navigate=useNavigate();
    const axios=useAxios();
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [input, setInput] = useState("");
    const [results,setResults]=useState([])
    const { language, changeLanguage } = useLanguage(); 
    const [direction, setDirection] = useState('ltr');
    const [t, i18n] = useTranslation();
    const [messages,setMessages]=useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [hasUnreadMessages, setHasUnreadMessages] = useState(false);

    useEffect(() => {
      const pusher = new Pusher('323996d4cfab0016889a', {
          cluster: 'ap2',
      });

      console.log('Pusher connected2:', pusher.connection.state)

      const channel = pusher.subscribe('chat-channel');

      console.log('Subscribed to channel2:', channel.name);

      channel.bind('new-message', (data) => {
          setMessages((prevNotifications) => [...prevNotifications, data]);
          setUnreadCount((prevCount) => prevCount + 1);
          setHasUnreadMessages(true);
          console.log('data222')
          console.log('data 2223',data);
     
          if (user.userData.id === data.notifiable_id) { 
            setHasUnreadMessages(true);
          }
      });

      return () => {
          channel.unbind();
          pusher.unsubscribe('chat-channel');
          console.log('Disconnected from Pusher');
      };
  }, [messages]);

  useEffect(() => {
      console.log('messages', messages);
  }, [messages]);
   
    
  
    useEffect(() => {
      if (language === 'ar') {
          setDirection('rtl');
      } else {
          setDirection('ltr');
      }
  }, [language]);

    const fetchData = (value) => {
      fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => response.json())
        .then((json) => {
          const results = json.filter((user) => {
            return (
              value &&
              user &&
              user.name &&
              user.name.toLowerCase().includes(value)
            );
          });
          setResults(results);
        });
    };

    const handleChange = (value) => {
      setInput(value);
      fetchData(value);
    };

    const toggleDropdown = () => {
      setDropdownVisible(!dropdownVisible);
      console.log("Toggling dropdown visibility",dropdownVisible);
  };

  const handleProfileClick = () => {
    navigate(`/profile/${user.userData.id}`)
    window.location.reload();
  };
  
  function logout() {
    axios
      .delete("auth/logout")
      .then((response) => {
        window.location.reload();
        if (response.status == 200) {
          Cookies.remove("token");
          navigate('/');
          window.location.reload();
        } else {
          console.error("Failed to log out server-side:", response.data);
          message.error(
            "There was an issue logging you out. Please try again later."
          );
        }
      })
  }

  useEffect(() => {
    if (language === 'ar') {
        setDirection('rtl');
    } else {
        setDirection('ltr');
    }
}, [language]);

const changeLanguageHandler = () => {
  const newLanguage = language == 'en' ? 'ar' : 'en'; 
  changeLanguage(newLanguage); 
};
  
    const items = [
      {
        key: "1",
        label: (
          <>
          <Link
          className='d-flex' 
          style={{textDecoration:'none',width:'13rem'}}
          onClick={handleProfileClick}
        >
          <img src={Profile} className="me-2" />
          <p className='mt-3'>{t('LayoutNavbar.myProfile')}</p>
        </Link>
        <hr className='line-dropdown'/>
        </>
        ),
      },
  
      {
        key: "2",
        label: (
          <>
          <Link
          to='/settings/myAccount'
          className=' d-flex ' 
          style={{textDecoration:'none'}}
        >
          <img src={Settings}  className="me-2"/>
          <p className='mt-3'>{t('LayoutNavbar.settings')}</p>
        </Link>
        <hr className='line-dropdown'/>
        </>
        ),
      },
      {
        key: "3",
        label: (
          <>
          <div
          onClick={changeLanguageHandler}
          className=' d-flex ' 
          style={{textDecoration:'none'}}
        >
          <img src={Language} className="me-2" />
          <p className='mt-3'>{t('LayoutNavbar.language')}</p>
        </div>
        <hr className='line-dropdown'/>
        </>
        ),
      },
      {
        key: "4",
        label: (
          <>
          <Link
          className=' d-flex' 
          style={{textDecoration:'none'}}
          onClick={logout}
        >
          <img src={signOut} className="me-2" />
          <p className='mt-3'>{t('LayoutNavbar.signOut')} </p>
        </Link>
      
        </>
        ),
      },
     
    ];


    return (
      <div >
        <Navbar expand="lg" className="bg-body-tertiary"
         style={{ boxShadow: "0px 1px 10px rgba(181,181,181, 1)",direction:direction}}>
            <Container>
                <Navbar.Brand href="/home" className="me-5">
                    <img src={Logo} width='80%' alt="Logo " className="me-3"  />
                </Navbar.Brand>
                <Nav className={`${language=='ar'?'me-5':'me-auto'}`}>
                    <div className="search-container" style={{direction:direction}}>
                        <input type="text" placeholder={t('Opportunity.search')} className="search-input" onChange={(e) => handleChange(e.target.value)} />
                        <AiOutlineSearch className="search-icon" />
                       
                    </div>
                   
                </Nav>
       
                <Nav className="right-content">
                {(messages.some(notification => notification.notifiable_id === user.userData.id) && hasUnreadMessages) ? (
   <div className="icon-wrapper position-relative" onClick={()=>{navigate('/chatbox')}}>
   <img src={messagesIcon} className="icon me-2" />
    <div className="unread-spot"></div>
 </div>
) : (
    <img src={messagesIcon} className="icon me-2" onClick={()=>{navigate('/chatbox')}} />
)}

                    {isSmallScreen||isProScreen?<img src={NotificationIcon} className="icon me-2" onClick={toggleDropdown} />:
                          <NotificationDropDown notifications={notifications} />
                    }
                  
                
                    <Dropdown menu={{ items }} className="dropdown-responsive">
                        <Space>
                            <div className="image-container">
                                <img src={user.userData.profile.type_name=='club'?user.userData.profile.club_logo:user.userData.image} alt="Profile" width={isProScreen?'20px':'30px'} height={isProScreen?'20px':'30px'} style={{borderRadius:'30px',   backgroundColor:'rgb(224, 207, 186)'}}/>
                                <p className="me">Me</p>
                            </div>
                            <MdArrowDropDown fontSize={38} style={{ color: '#979797' }} />
                        </Space>
                    </Dropdown>
                   {isSmallScreen?<RxHamburgerMenu onClick={toggleCollapse} />:''} 
                </Nav>
                <Nav>
        
                </Nav>
            </Container>
            
        </Navbar>
     {results && results.length > 0 && <SearchResultsList results={results} />}
     </div>
    )
}

export default NavBar;
