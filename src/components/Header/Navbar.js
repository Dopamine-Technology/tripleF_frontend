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

const TopNavbar = () => {
  const [t, i18n] = useTranslation();
  const currentLanguage = Cookies.get('language') || 'en';

  const changeLanguage = (lng) => {
    window.location.reload();
    Cookies.set('language', lng);
  };
  const availableLanguages = [
    { code: 'en', label: 'English' },
    { code: 'ar', label: 'Arabic' },
  ];

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-transparent">
      <Container>
        <Navbar.Brand href="#home" className='fs-4 text-white'>TripleF</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          </Nav>
          <Nav>
      
          <DropdownButton title={<GrLanguage color='white' />} id="language-dropdown" variant="" className="text-white bg-transparent mr-5">
            {availableLanguages.map((lang) => (
              <Dropdown.Item key={lang.code} onClick={() => changeLanguage(lang.code)}>
                {lang.label}
              </Dropdown.Item>
            ))}
          </DropdownButton>
            <p className='text-white mt-2'> <GoPerson />Login</p>
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
      <Container>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#deets" className='text-white' style={{textDecoration:'none'}}>  <p className={`text-white ${activeLink === 1 ? 'active' : ''}`} onClick={() => handleNavLinkClick(1)}>Home</p></Nav.Link>
            <Nav.Link href="#deets"className='text-white' style={{textDecoration:'none'}}> <p className={`text-white ${activeLink === 2 ? 'active' : ''}`} onClick={() => handleNavLinkClick(2)}>AboutUs</p></Nav.Link>
            <Nav.Link href="#deets"className='text-white' style={{textDecoration:'none'}}> <p className={`text-white ${activeLink === 3 ? 'active' : ''}`} onClick={() => handleNavLinkClick(3)}>Who is TripleF for</p></Nav.Link>
            <Nav.Link href="#deets" className='text-white' style={{textDecoration:'none'}}> <p className={`text-white ${activeLink === 4 ? 'active' : ''}`} onClick={() => handleNavLinkClick(4)}>How it works</p></Nav.Link>
            <Nav.Link href="#deets" className='text-white' style={{textDecoration:'none'}}><p className={`text-white ${activeLink === 5? 'active' : ''}`} onClick={() => handleNavLinkClick(5)}>Testimonial</p></Nav.Link>
            <Nav.Link href="#deets" className='text-white' style={{textDecoration:'none'}}><p className={`text-white ${activeLink === 6 ? 'active' : ''}`} onClick={() => handleNavLinkClick(6)}>Contact Us</p></Nav.Link>
            <Nav.Link href="#deets" className='text-white' style={{textDecoration:'none'}}><p className={`text-white ${activeLink === 7 ? 'active' : ''}`} onClick={() => handleNavLinkClick(7)}>Blog</p></Nav.Link>
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
