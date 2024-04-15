import React, { useContext,useEffect,useState } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import Logo from '../../assets/imgs/Logo.png'
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
import messages from '../../assets/imgs/messages.svg';
import NotificationIcon from '../../assets/imgs/notificationIcon.svg';
import NotificationDropDown from "../Notification/NotificationDropDown";
import { SearchResultsList } from "./SearchResultsList";

function NavBar({ toggleCollapse,isSmallScreen,socket,notifications }) {
    const { user } = useContext(UserDataContext);
    const navigate=useNavigate();
    const axios=useAxios();
    // const [notifications,setNotifications]=useState([]);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [input, setInput] = useState("");
    const [results,setResults]=useState([])

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
    // useEffect(()=>{
    //   socket.on('getNotification',(data)=>{
    //    setNotifications((prev)=>[...prev,data]);
    //   })
    // },[socket])

    // const displayNotification=({senderName, type})=>{
    //   let action;

    //   if(type==1){
    //     action='liked';
    //   }
    //   return (
    //     <span className="notification">{`${senderName} ${action} your post`}</span>
    //   )
    // }

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
  
  
    const items = [
      {
        key: "1",
        label: (
          <>
          <Link
          // to={`/profile/${user.userData.id}`}
          className='d-flex' 
          style={{textDecoration:'none',width:'13rem'}}
          onClick={handleProfileClick}
        >
          <img src={Profile} className="me-2" />
          <p className='mt-3'>My Profile</p>
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
          <p className='mt-3'>Settings</p>
        </Link>
        <hr className='line-dropdown'/>
        </>
        ),
      },
      {
        key: "3",
        label: (
          <>
          <Link
          to='/profile'
          className=' d-flex ' 
          style={{textDecoration:'none'}}
        >
          <img src={Language} className="me-2" />
          <p className='mt-3'>Language (English)</p>
        </Link>
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
          <p className='mt-3'>Sing Out </p>
        </Link>
      
        </>
        ),
      },
     
    ];


    return (
      <div>
        <Navbar expand="lg" className="bg-body-tertiary" style={{ boxShadow: "0px 1px 10px rgba(181,181,181, 1)" }}>
            <Container>
                <Navbar.Brand href="/home">
                    <img src={Logo} width='40%' alt="Logo" />
                </Navbar.Brand>
                <Nav className="me-auto">
                    <div className="search-container">
                        <input type="text" placeholder="Search" className="search-input" onChange={(e) => handleChange(e.target.value)} />
                        <AiOutlineSearch className="search-icon" />
                       
                    </div>
                   
                </Nav>
       
                <Nav className="right-content">
                    <img src={messages} className="icon me-2" />
                    {isSmallScreen?<img src={NotificationIcon} className="icon me-2" onClick={toggleDropdown} />:
                          <NotificationDropDown notifications={notifications} />
                    }
                    {/* <img src={NotificationIcon} className="icon me-4" onClick={toggleDropdown} /> */}
      
         
              
                
                    <Dropdown menu={{ items }} className="dropdown-responsive">
                        <Space>
                            <div className="image-container">
                                <img src={user.userData.image} alt="Profile" width='30px' height='30px' style={{borderRadius:'30px'}}/>
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
