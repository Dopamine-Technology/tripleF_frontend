import React from "react";
import './Navbar.css'
import { IoIosNotificationsOutline } from "react-icons/io";
import Logo from '../../assets/imgs/Logo.svg'
import { AiOutlineSearch } from "react-icons/ai";
import { MdArrowDropDown } from "react-icons/md";
import { AiOutlineMessage } from "react-icons/ai";
import {  Dropdown, Space, message } from "antd";
import {  Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
  import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavBar(){

    const items = [
        {
          key: "1",
          label: (
            <Container>
              <Col className='w-100 text-center'>
              <Card.Img
                variant='top'
                src='https://thumbs.dreamstime.com/b/portrait-father-son-football-54984814.jpg'
                style={{ width: "3.5rem", height: "3.5rem" }}
                className='rounded-circle object-fit-cover border border-2 '
              />
              <p>@AyaJoudeh</p>
          
            </Col>
            </Container>
          ),
        },
    
        {
          key: "2",
          label: (
            <Link
            to='/profile'
            className=' d-flex justify-content-between' 
            style={{textDecoration:'none'}}
          >
            All challanges <strong className='fw-semibold '>30</strong>
          </Link>
          ),
        },
        {
          key: "3",
          label: (
            <Link
            to='/profile'
            className='d-flex justify-content-between'
            style={{textDecoration:'none'}}
          >
           Followers <strong className='fw-semibold '>90</strong>
          </Link>
          ),
        },
        {
          key: "3",
          label: (
            <Link
            to='/profile'
            className='d-flex justify-content-between'
            style={{textDecoration:'none'}}
          >
           Following <strong className='fw-semibold '>120</strong>
          </Link>
          ),
        },
      ];

    return(
<Navbar expand="lg" className="bg-body-tertiary " style={{boxShadow:" 0px 1px 10px rgba(181,181,181, 1)"}}>
      <Container>
        <Navbar.Brand href="/home" ><img src={Logo} width='70%' /></Navbar.Brand>
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