import React from "react";
import './Navbar.css'
import { RiMessage3Line } from "react-icons/ri";
import { IoIosNotificationsOutline } from "react-icons/io";
import {FaRegFlag, FaUsers, FaPlusCircle, FaFacebookMessenger, FaBell} from 'react-icons/fa'
import Logo from '../../assets/imgs/Logo.svg'
import { AiOutlineSearch } from "react-icons/ai";
import { FiHome } from "react-icons/fi";
import { RiFootballLine } from "react-icons/ri";
import { AiOutlineMessage } from "react-icons/ai";
import { Avatar, Dropdown, Space, message } from "antd";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
    AiFillEdit,
    AiOutlineDown,
    AiOutlineMenuFold,
    AiOutlineMenuUnfold,
  } from "react-icons/ai";

function Navbar(){

    const items = [
        {
          key: "1",
          label: (
            <Container>
            </Container>
          ),
        },
    
        {
          key: "2",
          label: (
            <Link
              to='/profile'
              className='fw-medium fs-2 d-flex justify-content-between'
            >
           
            </Link>
          ),
        },
        {
          key: "3",
          label: (
            <Link
              to='/profile'
              className='fw-medium fs-2 d-flex justify-content-between'
            >
             
            </Link>
          ),
        },
      ];

    return(
        <div className="HomePage">
            <div className="header">

            <div className="first-header">
                <div className="logo">
                    <img src={Logo} alt="logo" style={{height:"67px" ,padding:"1rem"}}/>
                </div>
               
            </div>
            <div className="middle-header">
            <div class="search-container">
          <input type="text" placeholder="Search" class="search-input" />
          <AiOutlineSearch className="search-icon" />
           </div>
            </div>
            <div className="third-header">
            <div className="plus">
                    <FiHome fontSize ="1.5rem"  color='#979797' className="mt-5 me-5" />
                    <p className="plus-p">Home</p>
                    
                </div>

                <div className="plus">
                    <RiFootballLine fontSize ="1.5rem"  color='#979797' className="mt-5 me-5 " />
                    <p className="plus-p">Clubs</p>
                    
                </div>
                
                <div className="plus">
                    <AiOutlineMessage fontSize ="1.5rem"  color='#979797' className="mt-5 me-5 " />
                    <p className="plus-p">Messages</p>
                    
                </div>
        
                <div className="plus">
                    <IoIosNotificationsOutline fontSize ="1.5rem"   color='#979797' className="mt-5 me-5 " />
                    <p className="plus-p">Notifications</p>
                    
                </div>
               
                <div className="Pluss">
                    {/* <img src="https://thumbs.dreamstime.com/b/portrait-father-son-football-54984814.jpg" alt="dp" style={{height:"40px",width:'40px'}}/>
                    <p className="profile-p">Rafi Mazen</p> */}
                     <Dropdown menu={{ items }} >
              <Space>
         
                  <Card.Img
                    variant='top'
                    src="https://thumbs.dreamstime.com/b/portrait-father-son-football-54984814.jpg"
                    style={{ width: "40px", height: "40px",marginTop:'1rem' }}
                    className='rounded-circle text-center object-fit-cover border border-2'
                  />

                <AiOutlineDown />
              </Space>
            </Dropdown>
                </div>
            </div>
            </div>
        </div>
    )
}
export default Navbar;