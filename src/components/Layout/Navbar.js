import React,{useContext} from "react";
// import './Navbar.css'
import { IoIosNotificationsOutline } from "react-icons/io";
import Logo from '../../assets/imgs/Logo.png'
import { AiOutlineSearch } from "react-icons/ai";
import { MdArrowDropDown } from "react-icons/md";
import { AiOutlineMessage } from "react-icons/ai";
import {  Dropdown, Space, message } from "antd";
import {  Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
  import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { CiMenuBurger } from "react-icons/ci";
import {
  AiFillEdit
} from "react-icons/ai";
import {Button} from "react-bootstrap";
import Cookies from "js-cookie";
import useAxios from "../Auth/useAxiosHook.interceptor";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../UserContext/UserData.context";
import Profile from '../../assets/imgs/profile.svg';
import Settings from '../../assets/imgs/settings.svg';
import Language from '../../assets/imgs/LangaugeIcon.svg';
import signOut from '../../assets/imgs/signout.svg';
import ChatIcon from '../../assets/imgs/chatIcon.png'

function NavBar({ toggleLeftSidebar }){

  const { user } = useContext(UserDataContext);
  console.log('useroneone',user)
  const axios=useAxios();
  const navigate=useNavigate();
  function logout() {
    axios
      .delete("auth/logout")
      .then((response) => {
        if (response.status === 200) {
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
      .catch((error) => {
        if (error.response) {
          console.error("Failed to log out client-side:", error);
          message.error(
            "An error occurred while logging out. Please try again later."
          );
        } else {
          message.error(
            "Failed to log out. Please check your internet connection and try again later."
          );
        }
      });
  }

    const items = [
        {
          key: "1",
          label: (
            <>
            <Link
            to={`/profile/${user.userData.id}`}
            className='d-flex' 
            style={{textDecoration:'none',width:'13rem'}}
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
            to='/profile'
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
            to='/profile'
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

    return(
<Navbar expand="lg" className="bg-body-tertiary " style={{boxShadow:" 0px 1px 10px rgba(181,181,181, 1)"}} >

      <Container style={{marginRight:'8.6rem'}}>
        <Navbar.Brand href="/home"><img src={Logo} width='40%' /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
  
            <div class="search-container">
          <input type="text" placeholder="Search" class="search-input" />
          <AiOutlineSearch className="search-icon" />
           </div>
         
          </Nav>
         <Nav>
     <AiOutlineMessage style={{width: '24px',height: '24px'}}  color='#979797' className="mt-3 me-4 " /> 
        <IoIosNotificationsOutline style={{width: '24px',height: '24px'}}  color='#979797' className=" mt-3 me-4" />
         <Dropdown menu={{ items }}  >
              <Space>
                 
              <div class="image-container">
    <img
        variant='top'
        src={user.userData.image}
        style={{ width: "36px", height: "36px" }}
        className='rounded-circle text-center object-fit-cover'
    />
    <p className="me">Me</p>
</div>

                <MdArrowDropDown fontSize={38} className="mt-3" style={{color:'#979797'}} />
              </Space>
  
            </Dropdown>
      
         </Nav>
        </Navbar.Collapse>
       
      </Container>
    </Navbar>
    )
}
export default NavBar;