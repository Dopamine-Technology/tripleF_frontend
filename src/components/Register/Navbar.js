import React,{useState,useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { GrLanguage } from 'react-icons/gr';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { GoPerson } from "react-icons/go";
import Cookies from 'js-cookie';
import Logo from '../../assets/imgs/Logo.svg'
import { IoPerson } from "react-icons/io5";
import './style.css'
import { Link,useLocation } from 'react-router-dom';
import { RxDividerVertical } from "react-icons/rx";


const NavBar = () => {
  const currentLanguage = Cookies.get('language') || 'En';
  const location =useLocation();
  const path = location.pathname;

  const buttonText = path === '/login' ? 'signup' : 'Login';
  const linkPath = path === '/login' ? '/register' : '/login';

  const changeLanguage = (lng) => {
    window.location.reload();
    Cookies.set('language', lng);
  };
  const availableLanguages = [
    { code: 'En', label: 'English' },
    { code: 'Ar', label: 'Arabic' },
  ];
    return (      <Navbar collapseOnSelect expand="xl" className="">
    <Container className="justify-content-start " style={{marginLeft:'3.5rem'}} > 
    {/* <Container className="justify-content-start navbar-container " >  */}
      <Navbar.Brand href="#home" className='fs-4 text-white'><img src={Logo} width='70%' /></Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto" style={{marginRight:'-6rem'}}>
        </Nav>
        <Nav className='right-nav' >
    
        <DropdownButton
title={
  <div className='text-white d-flex align-items-center'>
    <GrLanguage color='black' className='me-1' />
    <span className='text-black'>{currentLanguage}</span>
  </div>
}
id="language-dropdown"
variant=""
className="text-white bg-transparent mr-5 custom-dropdown"
>
{availableLanguages.map((lang) => (
  <Dropdown.Item key={lang.code} onClick={() => changeLanguage(lang.code)}>
    {lang.label}
  </Dropdown.Item>
))}
</DropdownButton>
<RxDividerVertical color="gray" size={30} className='mt-1' />
          <p className='text-black mt-2'> <Link to={linkPath} style={{textDecoration:'none',color:'black'}}><IoPerson  />{buttonText}</Link></p>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar> );
}
 
export default NavBar;