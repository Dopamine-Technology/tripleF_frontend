import React from "react";
import './Navbar.css'
import { IoIosNotificationsOutline } from "react-icons/io";
import Logo from '../../assets/imgs/Logo.png'
import { AiOutlineSearch } from "react-icons/ai";
import { MdArrowDropDown } from "react-icons/md";
import { AiOutlineMessage } from "react-icons/ai";
import { Avatar, Dropdown, Space, message } from "antd";
import { Button, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
    AiFillEdit,
    AiOutlineDown,
    AiOutlineMenuFold,
    AiOutlineMenuUnfold,
  } from "react-icons/ai";
  import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavBar(){

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
<Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/home"><img src={Logo} width='13%' /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
  
            <div class="search-container">
          <input type="text" placeholder="Search" class="search-input" />
          <AiOutlineSearch className="search-icon" />
           </div>
         
          </Nav>
         <Nav>
         <Nav.Link href=""> <AiOutlineMessage fontSize ="1.5rem"  color='#979797' className="mt-3 me-2 " /> </Nav.Link>
         <Nav.Link href=""> <IoIosNotificationsOutline fontSize ="1.5rem"   color='#979797' className=" mt-3 me-4" /></Nav.Link>
         <Dropdown menu={{ items }} >
              <Space>
         
                  <Card.Img
                    variant='top'
                    src="https://thumbs.dreamstime.com/b/portrait-father-son-football-54984814.jpg"
                    style={{ width: "43px", height: "43px",marginTop:'1rem' }}
                    className='rounded-circle text-center object-fit-cover border border-2'
                  />

                <MdArrowDropDown fontSize={30} className="mt-3" style={{color:'#979797'}} />
              </Space>
            </Dropdown>
         </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    )
}
export default NavBar;