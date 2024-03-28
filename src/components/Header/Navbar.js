import React,{useState,useEffect,useLayoutEffect} from 'react';
import {Container,Row,Col} from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { GrLanguage } from 'react-icons/gr';
import tton from './RegisterButton';
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
import btnIconHover from '../../assets/imgs/btnIconHover.svg';

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
  const [isHovering, setIsHovering] = useState(false);

  const handleHover = () => {
    setIsHovering(true);
  };

  const handleHoverOut = () => {
    setIsHovering(false);
  };

  

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight; 
      const threshold = windowHeight * 1;
  
      if (scrollTop ) {
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
<Navbar expand="lg" className='scroll-navbar' style={{ zIndex: '1' }}  >
  <Container className='navbar-container'>
    <Navbar.Brand href="/" className="d-flex align-items-center" style={{marginLeft:'5rem'}}>
      <img src={Logo} className='logo-register' />
      <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ borderColor: 'transparent' }} className=" ms-1" />
    </Navbar.Brand>
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ms-auto mt-2">
        <DropdownButton
          title={
            <div className='d-flex align-items-center '>
              <img src={LanguageIconBlack} width='24px' height='24px' className='me-1 mb-4' />
              <span className='mb-4'>{currentLanguage}</span>
              <img src={ArrowDownImage} width='24px' height='24px' className='ms-1 mb-4' />
            </div>
          }
          id="language-dropdown"
          variant=""
          className=" bg-transparent mr-5 custom-dropdown mt-1"
       
        >
          {availableLanguages.map((lang) => (
            <Dropdown.Item key={lang.code} onClick={() => changeLanguage(lang.code)}    style={{ zIndex: '999' }} >
              <img src={lang.img} style={{ height: '1.5rem', width: '1.5rem' }} className='me-2' />
              {lang.label}
            </Dropdown.Item>
          ))}
        </DropdownButton>
        <RxDividerVertical color="gray" size={30} className='mt-2' />
        <Link to='/login' className='text-black d-flex mt-2' style={{ textDecoration: 'none' }}>
      <div onMouseOver={handleHover} onMouseOut={handleHoverOut} className='text-black d-flex'>
        <img src={isHovering ? btnIconHover : profileIconBlack} width='24px' height='24px' className='me-1' alt='Profile Icon' />
        <p style={{color:isHovering?'#77dcbf':'black'}}>Login</p>
        <p></p>
      </div>
    </Link>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>:
<Navbar expand="lg" className='fixed-navbar' >
  <Container style={{ marginLeft: '-1rem' }}>
    <Navbar.Brand href="/" className="d-flex align-items-center">
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
          className="text-white bg-transparent mr-5 custom-dropdown  mt-1 "
        >
          {availableLanguages.map((lang) => (
            <Dropdown.Item key={lang.code} onClick={() => changeLanguage(lang.code)}>
              <img src={lang.img} style={{ height: '1.5rem', width: '1.5rem' }} className='me-2' />
              {lang.label}
            </Dropdown.Item>
          ))}
        </DropdownButton>
        <RxDividerVertical color="gray" size={30} className='mt-2' />
        <Link to='/login' className='text-black d-flex' style={{ textDecoration: 'none' }}>
      <div onMouseOver={handleHover} onMouseOut={handleHoverOut} className='text-black d-flex mt-2'>
        <img src={isHovering ? btnIconHover : profileIcon} width='24px' height='24px' className='me-1' alt='Profile Icon' />
        <p style={{color:isHovering?'#77dcbf':'white'}}>Login</p>
        <p></p>
      </div>
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
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight; // Height of the viewport
  
      // Calculate the threshold where you want to change the navbar
      const threshold = windowHeight * 1; // For example, change the navbar when the user scrolls past half of the viewport height
  
      if (scrollTop ) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
  
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // const hashToSectionId = {
  //   '1': 'homeSection',
  //   '2': 'about',
  //   '3': 'Who',
  //   '4': 'How',
  //   '5': 'Testimonial',
  //   '6': 'Contact',
  //   '7': 'News',
  //   // Add more mappings as needed
  // };

  // useEffect(() => {
  //   const handleHashChange = () => {
  //     const hash = window.location.hash.substring(1);
  //     setActiveLink(hashToSectionId[hash]);
  //     console.log('hash',activeLink)
  //   };

  //   window.addEventListener('hashchange', handleHashChange);
  //   handleHashChange(); 

  
  //   return () => {
  //     window.removeEventListener('hashchange', handleHashChange);
  //   };
  // }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      if(hash=='home')setActiveLink(1);
      else if(hash=='about') setActiveLink(2);
      else if(hash=='Who') setActiveLink(3);
      else if(hash=='How') setActiveLink(4);
      else if(hash=='Testimonial') setActiveLink(5);
      else if(hash=='Contact') setActiveLink(6);
      else if(hash=='News') setActiveLink(7);

      
      
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); 

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);
  const handleNavLinkClick = (index,sectionId) => {
    setActiveLink(index);
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };
  

useLayoutEffect(() => {
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);

  const isSmallScreen = windowWidth <= 600;


  return (
    <>
    {isScrolled?<Navbar expand="lg" className='scroll-navbar2' style={{ zIndex: '0' }}>
    <Container >
    
      <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ borderColor: 'transparent',marginLeft:isSmallScreen?'18.8rem':'14.5rem'}} className=""/>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
        <Nav.Link href='/#homeSection' className='' style={{textDecoration:'none'}} onClick={() => handleNavLinkClick('about')} className={`  ${activeLink === 1 ? 'activeButton' : ''}`} onClick={() => handleNavLinkClick(1)} style={{ marginRight: '2rem' }}>Home</Nav.Link>
            <Nav.Link href="/#about"className='' style={{textDecoration:'none'}} className={` ${activeLink === 2 ? 'activeButton' : ''}`} onClick={() => handleNavLinkClick(2)} style={{ marginRight: '2rem' }}>AboutUs</Nav.Link>
            <Nav.Link href="/#Who"className='' style={{textDecoration:'none'}} className={` ${activeLink === 3 ? 'activeButton' : ''}`} onClick={() => handleNavLinkClick(3)} style={{ marginRight: '2rem' }} >Who is TripleF for</Nav.Link>
             <Nav.Link href="/#How" className='' style={{textDecoration:'none'}} className={` ${activeLink === 4 ? 'activeButton' : ''}`} onClick={() => handleNavLinkClick(4)} style={{ marginRight: '2rem' }}> How it works</Nav.Link>
             <Nav.Link href="/#Testimonial" className='' style={{textDecoration:'none'}} className={` ${activeLink === 5? 'activeButton' : ''}`} onClick={() => handleNavLinkClick(5)} style={{ marginRight: '2rem' }}>Testimonial</Nav.Link>
             <Nav.Link href="/#Contact" className='' style={{textDecoration:'none'}} className={` ${activeLink === 6 ? 'activeButton' : ''}`} onClick={() => handleNavLinkClick(6)} style={{ marginRight: '2rem' }}>Contact Us</Nav.Link>
             <Nav.Link href="/#News" className='' style={{textDecoration:'none'}} className={` ${activeLink === 7 ? 'activeButton' : ''}`} onClick={() => handleNavLinkClick(7)} style={{ marginRight: '2rem' }}><p>News</p></Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>:<Navbar expand="lg" className='fixed-navbar2' >
    <Container style={{marginLeft:'1rem'}}>
    
      <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ borderColor: 'transparent',marginLeft:isSmallScreen?'16rem':'13rem'}} className="custom-toggler"/>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
        <Nav.Link href="/#homeSection"className='text-white' style={{textDecoration:'none'}} className={`text-white ${activeLink === 1 ? 'activeButton' : ''}`} onClick={() => handleNavLinkClick(1)} style={{ marginRight: '2rem' }}> Home</Nav.Link>
            <Nav.Link href="#about"className='text-white' style={{textDecoration:'none'}} className={`text-white ${activeLink === 2 ? 'activeButton' : ''}`} onClick={() => handleNavLinkClick(2)} style={{ marginRight: '2rem' }}> About Us</Nav.Link>
            <Nav.Link href="#Who"className='text-white' style={{textDecoration:'none'}} className={`text-white ${activeLink === 3 ? 'activeButton' : ''}`} onClick={() => handleNavLinkClick(3)} style={{ marginRight: '2rem' }} > Who is TripleF for</Nav.Link>
             <Nav.Link href="#How" className='text-white' style={{textDecoration:'none'}} className={`text-white ${activeLink === 4 ? 'activeButton' : ''}`} onClick={() => handleNavLinkClick(4)} style={{ marginRight: '2rem' }}> How it works</Nav.Link>
             <Nav.Link href="#Testimonial" className='text-white' style={{textDecoration:'none'}} className={`text-white ${activeLink === 5? 'activeButton' : ''}`} onClick={() => handleNavLinkClick(5)} style={{ marginRight: '2rem' }}>Testimonial</Nav.Link>
             <Nav.Link href="#Contact" className='text-white' style={{textDecoration:'none'}} className={`text-white ${activeLink === 6 ? 'activeButton' : ''}`} onClick={() => handleNavLinkClick(6)} style={{ marginRight: '2rem' }}>Contact Us</Nav.Link>
             <Nav.Link href="#News" className='text-white' style={{textDecoration:'none'}} className={`text-white ${activeLink === 7 ? 'activeButton' : ''}`} onClick={() => handleNavLinkClick(7)} style={{ marginRight: '2rem' }}>News</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>}
    
  </>
  );
}

const CombinedNavbars = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight; 
      const threshold = windowHeight * 1;
  
      if (scrollTop ) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
  
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
    <Container  style={{marginRight:isScrolled?'14rem':'2.5rem'}}>
      <TopNavbar />
      <BottomNavbar />
    </Container>
     
    </div>
  );
}

export default CombinedNavbars;