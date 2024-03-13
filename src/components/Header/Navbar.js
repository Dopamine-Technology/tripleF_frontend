import React,{useState,useEffect} from 'react';
import {Container,Row,Col} from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { GrLanguage } from 'react-icons/gr';
import RegisterButton from './RegisterButton';
import { useTranslation } from 'react-i18next';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { GoPerson } from "react-icons/go";
import Cookies from 'js-cookie';
import LogoWhite from '../../assets/imgs/LogoWhite.png';
import { IoPerson } from "react-icons/io5";
import './style.css';
import { Link } from 'react-router-dom';
import { RxDividerVertical } from "react-icons/rx";
import {BiChevronDown} from "react-icons/bi";
import Ar from '../../assets/imgs/Ar.png';
import En from '../../assets/imgs/en.jpg';
import LanguageIcon from '../../assets/imgs/langauge-icon.png';
import profileIcon from '../../assets/imgs/profile-icon.svg';
import NavDropdown from 'react-bootstrap/NavDropdown';
import ArrowDownImage from '../../assets/imgs/dropdownWhite.svg';
import Logo from '../../assets/imgs/Logo.png'
import LanguageIconBlack from '../../assets/imgs/langauge-icon.svg';
import profileIconBlack from '../../assets/imgs/profile-black-icon.svg';

const TopNavbar = ({content}) => {
  const currentLanguage = Cookies.get('language') || 'En';

  const changeLanguage = (lng) => {
    window.location.reload();
    Cookies.set('language', lng);
  };
  const availableLanguages = [
    { code: 'En', label: 'English',img:En },
    { code: 'Ar', label: 'Arabic' ,img:Ar },
  ];

  const [isScrolled, setIsScrolled] = useState(false);

  

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight; // Height of the viewport
  
      // Calculate the threshold where you want to change the navbar
      const threshold = windowHeight * 1; // For example, change the navbar when the user scrolls past half of the viewport height
  
      if (scrollTop > threshold) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
  
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
    {isScrolled?
<Navbar expand="lg" className='scroll-navbar' >
  <Container className='navbar-container'>
    <Navbar.Brand href="#home" className="d-flex align-items-center">
      <img src={Logo} className='logo-register' />
      <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ borderColor: 'transparent' }} className=" ms-1" />
    </Navbar.Brand>
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ms-auto mt-2">
        <DropdownButton
          title={
            <div className='d-flex align-items-center'>
              <img src={LanguageIconBlack} width='24px' height='24px' className='me-1 mb-4' />
              <span className='mb-4'>{currentLanguage}</span>
              <img src={ArrowDownImage} width='24px' height='24px' className='ms-1 mb-4' />
            </div>
          }
          id="language-dropdown"
          variant=""
          className=" bg-transparent mr-5 custom-dropdown mt-1 "
        >
          {availableLanguages.map((lang) => (
            <Dropdown.Item key={lang.code} onClick={() => changeLanguage(lang.code)}>
              <img src={lang.img} style={{ height: '1.5rem', width: '1.5rem' }} className='me-2' />
              {lang.label}
            </Dropdown.Item>
          ))}
        </DropdownButton>
        <RxDividerVertical color="gray" size={30} className='mt-2' />
        <Link to='/login' className='text-black d-flex mt-2' style={{ textDecoration: 'none', }}>
          <img src={profileIconBlack} width='24px' height='24px' className='me-1' />
          Login
        </Link>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>:
<Navbar expand="lg" >
  <Container style={{ marginLeft: '-1rem' }}>
    <Navbar.Brand href="#home" className="d-flex align-items-center">
      <img src={LogoWhite} className='logo-header' />
      <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ borderColor: 'transparent' }} className="custom-toggler ms-5" />
    </Navbar.Brand>
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ms-auto">
        <DropdownButton
          title={
            <div className='d-flex align-items-center'>
              <img src={LanguageIcon} width='24px' height='24px' className='me-1 mb-4' />
              <span className='text-white mb-4'>{currentLanguage}</span>
              <img src={ArrowDownImage} width='24px' height='24px' className='ms-1 mb-4' />
            </div>
          }
          id="language-dropdown"
          variant=""
          className="text-white bg-transparent mr-5 custom-dropdown  "
        >
          {availableLanguages.map((lang) => (
            <Dropdown.Item key={lang.code} onClick={() => changeLanguage(lang.code)}>
              <img src={lang.img} style={{ height: '1.5rem', width: '1.5rem' }} className='me-2' />
              {lang.label}
            </Dropdown.Item>
          ))}
        </DropdownButton>
        <RxDividerVertical color="gray" size={30} className='mt-2' />
        <Link to='/login' className='text-white d-flex mt-2' style={{ textDecoration: 'none', }}>
          <img src={profileIcon} width='24px' height='24px' className='me-1' />
          Login
        </Link>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
}

</>
  );
}

const BottomNavbar = () => {
  
  const [activeLink, setActiveLink] = useState(1);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight; // Height of the viewport
  
      // Calculate the threshold where you want to change the navbar
      const threshold = windowHeight * 1; // For example, change the navbar when the user scrolls past half of the viewport height
  
      if (scrollTop > threshold) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
  
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavLinkClick = (index,sectionId) => {
    setActiveLink(index);
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };
  


  return (
    <>
    {isScrolled?<Navbar expand="lg" className='scroll-navbar2'>
    <Container >
    
      <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ borderColor: 'transparent',marginLeft:'14.5rem'}} className=""/>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
        <Nav.Link href='/#section1' className='' style={{textDecoration:'none'}} onClick={() => handleNavLinkClick('about')}>  <p className={`  ${activeLink === 1 ? 'activeButton' : ''}`} onClick={() => handleNavLinkClick(1)} style={{ marginRight: '2rem' }}>Home</p></Nav.Link>
            <Nav.Link href="/#about"className='' style={{textDecoration:'none'}}> <p className={` ${activeLink === 2 ? 'activeButton' : ''}`} onClick={() => handleNavLinkClick(2)} style={{ marginRight: '2rem' }}>AboutUs</p></Nav.Link>
            <Nav.Link href="/#Who"className='' style={{textDecoration:'none'}}> <p className={` ${activeLink === 3 ? 'activeButton' : ''}`} onClick={() => handleNavLinkClick(3)} style={{ marginRight: '2rem' }} >Who is TripleF for</p></Nav.Link>
             <Nav.Link href="/#How" className='' style={{textDecoration:'none'}}> <p className={` ${activeLink === 4 ? 'activeButton' : ''}`} onClick={() => handleNavLinkClick(4)} style={{ marginRight: '2rem' }}>How it works</p></Nav.Link>
             <Nav.Link href="/#Testimonial" className='' style={{textDecoration:'none'}}><p className={` ${activeLink === 5? 'activeButton' : ''}`} onClick={() => handleNavLinkClick(5)} style={{ marginRight: '2rem' }}>Testimonial</p></Nav.Link>
             <Nav.Link href="/#Contact" className='' style={{textDecoration:'none'}}><p className={` ${activeLink === 6 ? 'activeButton' : ''}`} onClick={() => handleNavLinkClick(6)} style={{ marginRight: '2rem' }}>Contact Us</p></Nav.Link>
             <Nav.Link href="/#News" className='' style={{textDecoration:'none'}}><p className={` ${activeLink === 7 ? 'activeButton' : ''}`} onClick={() => handleNavLinkClick(7)} style={{ marginRight: '2rem' }}>News</p></Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>:<Navbar expand="lg"  >
    <Container style={{marginLeft:'1rem'}}>
    
      <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ borderColor: 'transparent',marginLeft:'13rem'}} className="custom-toggler"/>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
        <Nav.Link href="#section1"className='text-white' style={{textDecoration:'none'}}> <p className={`text-white ${activeLink === 1 ? 'activeButton' : ''}`} onClick={() => handleNavLinkClick(1)} style={{ marginRight: '2rem' }}>Home</p></Nav.Link>
            <Nav.Link href="#about"className='text-white' style={{textDecoration:'none'}}> <p className={`text-white ${activeLink === 2 ? 'activeButton' : ''}`} onClick={() => handleNavLinkClick(2)} style={{ marginRight: '2rem' }}>AboutUs</p></Nav.Link>
            <Nav.Link href="#Who"className='text-white' style={{textDecoration:'none'}}> <p className={`text-white ${activeLink === 3 ? 'activeButton' : ''}`} onClick={() => handleNavLinkClick(3)} style={{ marginRight: '2rem' }} >Who is TripleF for</p></Nav.Link>
             <Nav.Link href="#How" className='text-white' style={{textDecoration:'none'}}> <p className={`text-white ${activeLink === 4 ? 'activeButton' : ''}`} onClick={() => handleNavLinkClick(4)} style={{ marginRight: '2rem' }}>How it works</p></Nav.Link>
             <Nav.Link href="#Testimonial" className='text-white' style={{textDecoration:'none'}}><p className={`text-white ${activeLink === 5? 'activeButton' : ''}`} onClick={() => handleNavLinkClick(5)} style={{ marginRight: '2rem' }}>Testimonial</p></Nav.Link>
             <Nav.Link href="#Contact" className='text-white' style={{textDecoration:'none'}}><p className={`text-white ${activeLink === 6 ? 'activeButton' : ''}`} onClick={() => handleNavLinkClick(6)} style={{ marginRight: '2rem' }}>Contact Us</p></Nav.Link>
             <Nav.Link href="#News" className='text-white' style={{textDecoration:'none'}}><p className={`text-white ${activeLink === 7 ? 'activeButton' : ''}`} onClick={() => handleNavLinkClick(7)} style={{ marginRight: '2rem' }}>News</p></Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>}
    
  </>
  );
}

const CombinedNavbars = () => {
  return (
    <div>
    <Container  style={{marginLeft:'2.2rem'}}>
      <TopNavbar />
      <BottomNavbar />
    </Container>
     
    </div>
  );
}

export default CombinedNavbars;