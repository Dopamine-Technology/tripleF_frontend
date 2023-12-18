import React,{useState,useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { GrLanguage } from 'react-icons/gr';
import RegisterButton from './RegisterButton';
import { useTranslation } from 'react-i18next';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { GoPerson } from "react-icons/go";
import Cookies from 'js-cookie';
import LogoWhite from '../../assets/imgs/LogoWhite.svg'
import { IoPerson } from "react-icons/io5";
import './style.css'
import { Link } from 'react-router-dom';

const TopNavbar = ({content}) => {
  const currentLanguage = Cookies.get('language') || 'en';
  console.log('bbb',content)

  const changeLanguage = (lng) => {
    window.location.reload();
    Cookies.set('language', lng);
  };
  const availableLanguages = [
    { code: 'en', label: 'English' },
    { code: 'ar', label: 'Arabic' },
  ];

  return (
    <Navbar collapseOnSelect expand="xl" className="bg-body-transparent">
      <Container className="justify-content-start " >
        <Navbar.Brand href="#home" className='fs-4 text-white'><img src={LogoWhite} width='70%' /></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          </Nav>
          <Nav>
      
          <DropdownButton
  title={
    <div className='text-white d-flex align-items-center'>
      <GrLanguage color='white' />
      <span>{currentLanguage}</span>
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

            <p className='text-white mt-2'> <Link to='/login' style={{textDecoration:'none',color:'white'}}><IoPerson  />Login</Link></p>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

const BottomNavbar = () => {
  const [activeLink, setActiveLink] = useState(null);

  const handleNavLinkClick = (index) => {
    setActiveLink(index);
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-transparent">
      <Container >
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home" className='text-white' style={{textDecoration:'none'}}>  <p className={`text-white  ${activeLink === 1 ? 'active' : ''}`} onClick={() => handleNavLinkClick(1)} style={{ marginRight: '1rem' }}>Home</p></Nav.Link>
            <Nav.Link href="#about"className='text-white' style={{textDecoration:'none'}}> <p className={`text-white ${activeLink === 2 ? 'active' : ''}`} onClick={() => handleNavLinkClick(2)} style={{ marginRight: '1rem' }}>AboutUs</p></Nav.Link>
            <Nav.Link href="#Who"className='text-white' style={{textDecoration:'none'}}> <p className={`text-white ${activeLink === 3 ? 'active' : ''}`} onClick={() => handleNavLinkClick(3)} style={{ marginRight: '1rem' }} >Who is TripleF for</p></Nav.Link>
            <Nav.Link href="#How" className='text-white' style={{textDecoration:'none'}}> <p className={`text-white ${activeLink === 4 ? 'active' : ''}`} onClick={() => handleNavLinkClick(4)} style={{ marginRight: '1rem' }}>How it works</p></Nav.Link>
            <Nav.Link href="#Testimonial" className='text-white' style={{textDecoration:'none'}}><p className={`text-white ${activeLink === 5? 'active' : ''}`} onClick={() => handleNavLinkClick(5)} style={{ marginRight: '1rem' }}>Testimonial</p></Nav.Link>
            <Nav.Link href="#Contact" className='text-white' style={{textDecoration:'none'}}><p className={`text-white ${activeLink === 6 ? 'active' : ''}`} onClick={() => handleNavLinkClick(6)} style={{ marginRight: '1rem' }}>Contact Us</p></Nav.Link>
            <Nav.Link href="#News" className='text-white' style={{textDecoration:'none'}}><p className={`text-white ${activeLink === 7 ? 'active' : ''}`} onClick={() => handleNavLinkClick(7)} style={{ marginRight: '1rem' }}>News</p></Nav.Link>
          </Nav>
          <Nav>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

const CombinedNavbars = () => {
  return (
    <div>
      <TopNavbar />
      <BottomNavbar />
    </div>
  );
}

export default CombinedNavbars;
