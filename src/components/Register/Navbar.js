import React,{useState,useEffect,useLayoutEffect} from 'react';
import {Container,Row,Col} from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { GrLanguage } from 'react-icons/gr';
import { useTranslation } from 'react-i18next';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Cookies from 'js-cookie';
import Logo from '../../assets/imgs/LogoLastVersion.png'
import './style.css';
import { Link } from 'react-router-dom';
import { RxDividerVertical } from "react-icons/rx";
import {BiChevronDown} from "react-icons/bi";
import Ar from '../../assets/imgs/Ar.png';
import En from '../../assets/imgs/en.jpg';
import LanguageIcon from '../../assets/imgs/langauge-icon.svg';
import profileIcon from '../../assets/imgs/profile-black-icon.svg';
import ArrowDownImage from '../../assets/imgs/dropdownWhite.svg';
import Turkey from '../../assets/imgs/TurkeyFlag.webp'
import Spain from '../../assets/imgs/flagSpain.webp'

import { useScreenWidth } from '../ScreenWidthContext/ScreenWidth.context';

const TopNavbar = () => {
  const currentLanguage = Cookies.get('language') || 'En';
  const [t,i18n]=useTranslation();
  const [direction, setDirection] = useState('ltr');
  

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    Cookies.set('language', lng);
    console.log('language',i18n.language)
  };

  const availableLanguages = [
    { code: 'en', label: 'English',img:En },
    { code: 'ar', label: 'Arabic' ,img:Ar },
    { code: 'tr', label: 'Turkish' ,img:Turkey },
    { code: 'es', label: 'Spanish' ,img:Spain },
  ];

  
  const { windowWidth, isSmallScreen, isTabletScreen, isProScreen } = useScreenWidth();

  useEffect(() => {
    // Change direction based on the selected language
    if (currentLanguage === 'ar') {
      setDirection('rtl');
    }       else{
      setDirection('ltr')
    }
  }, [currentLanguage]);


  return (
<Navbar expand="lg" className='' style={{ direction: direction }}>
  <Container className='navbar-container'>
    <Navbar.Brand href="/" className="d-flex align-items-center">
      <img src={Logo} className='logo-register' />
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ borderColor: 'transparent', marginLeft: 'auto' }} />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ms-auto mt-2">
        <DropdownButton
          title={
            <div className='d-flex align-items-center '>
              <img src={LanguageIcon} width='24px' height='24px' className='me-1 mb-4' />
              <span className='mb-4'>{currentLanguage}</span>
              <img src={ArrowDownImage} width='24px' height='24px' className='ms-1 mb-4' />
            </div>
          }
          id="language-dropdown"
          variant=""
          className=" bg-transparent mr-5 custom-dropdown mt-1"
        >
          {availableLanguages.map((lang) => (
            <Dropdown.Item key={lang.code} onClick={() => changeLanguage(lang.code)} style={{ zIndex: '999' }} >
              <img src={lang.img} style={{ height: '1.5rem', width: '1.5rem' }} className='me-2' />
              {lang.label}
            </Dropdown.Item>
          ))}
        </DropdownButton>
        <RxDividerVertical color="gray" size={30} className='mt-2' />
        <Link to='/login' className='text-black d-flex mt-2' style={{ textDecoration: 'none' }}>
          <img src={profileIcon} width='24px' height='24px' className='me-1' />
          {t('navbar.login')}
        </Link>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>


  );
}

const BottomNavbar = () => {
  
  const [activeLink, setActiveLink] = useState(1);
  const { windowWidth, isSmallScreen, isTabletScreen, isProScreen } = useScreenWidth();
  const [t,i18n]=useTranslation();
  const currentLanguage = Cookies.get('language') || 'En';
  const [direction, setDirection] = useState('ltr');


  useEffect(() => {
    // Change direction based on the selected language
    if (currentLanguage === 'ar') {
      setDirection('rtl');
    }       else{
      setDirection('ltr')
    }
  }, [currentLanguage]);

  const handleNavLinkClick = (index,sectionId) => {
    setActiveLink(index);
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };
  


  return (
    <Navbar expand="lg" className='' style={{ direction: direction }}>
  <Container style={{ marginLeft: isTabletScreen ? '30rem' :currentLanguage=='ar'?'32rem': '1rem' }}>
    <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ borderColor: 'transparent', marginLeft: 'auto' }} />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link href='/#section1' className='' style={{ textDecoration: 'none' }} onClick={() => handleNavLinkClick('about')}>
          <p className={` ${activeLink === 1 ? 'activeButton' : ''}`} onClick={() => handleNavLinkClick(1)} style={{ marginRight: '2rem' }}> {t('navbar.home')}</p>
        </Nav.Link>
        <Nav.Link href="/#about" className='' style={{ textDecoration: 'none' }}>
          <p className={` ${activeLink === 2 ? 'activeButton' : ''}`} onClick={() => handleNavLinkClick(2)} style={{ marginRight: '2rem' }}>{t('navbar.aboutus')}</p>
        </Nav.Link>
        <Nav.Link href="/#Who" className='' style={{ textDecoration: 'none' }}>
          <p className={` ${activeLink === 3 ? 'activeButton' : ''}`} onClick={() => handleNavLinkClick(3)} style={{ marginRight: '2rem' }}>{t('navbar.whoFor')}</p>
        </Nav.Link>
        <Nav.Link href="/#How" className='' style={{ textDecoration: 'none' }}>
          <p className={` ${activeLink === 4 ? 'activeButton' : ''}`} onClick={() => handleNavLinkClick(4)} style={{ marginRight: '2rem' }}>{t('navbar.howItWorks')}</p>
        </Nav.Link>
        <Nav.Link href="/#Testimonial" className='' style={{ textDecoration: 'none' }}>
          <p className={` ${activeLink === 5 ? 'activeButton' : ''}`} onClick={() => handleNavLinkClick(5)} style={{ marginRight: '2rem' }}>{t('navbar.testimonial')}</p>
        </Nav.Link>
        <Nav.Link href="/#Contact" className='' style={{ textDecoration: 'none' }}>
          <p className={` ${activeLink === 6 ? 'activeButton' : ''}`} onClick={() => handleNavLinkClick(6)} style={{ marginRight: '2rem' }}>{t('navbar.contactUs')}</p>
        </Nav.Link>
        <Nav.Link href="/#News" className='' style={{ textDecoration: 'none' }}>
          <p className={` ${activeLink === 7 ? 'activeButton' : ''}`} onClick={() => handleNavLinkClick(7)} style={{ marginRight: '2rem' }}>{t('navbar.news')}</p>
        </Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>

  );
}

const CombinedNavbars = () => {
  const [activeLink, setActiveLink] = useState(1);

  const handleNavLinkClick = (index,sectionId) => {
    setActiveLink(index);
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const [t,i18n]=useTranslation();
  const currentLanguage = Cookies.get('language') || 'en';
  const [direction, setDirection] = useState('ltr');

const changeLanguage = (lng) => {
  i18n.changeLanguage(lng);
  Cookies.set('language', lng);
}
const availableLanguages = [
  { code: 'en', label: 'English',img:En },
  { code: 'ar', label: 'Arabic' ,img:Ar },
];
  useEffect(() => {
    // Change direction based on the selected language
    if (currentLanguage === 'ar') {
      setDirection('rtl');
    }       else{
      setDirection('ltr')
    }
  }, [currentLanguage]);

  const { windowWidth, isSmallScreen, isTabletScreen, isProScreen } = useScreenWidth();
  
  return (

    <div>
      {isSmallScreen?
      <Navbar expand="lg" className='p-0 m-4 mb-0'  >
      <Container className='navbar-container' style={{boxShadow:'none'}} >
        <Navbar.Brand href="" className="d-flex align-items-center navbar.brand2 ">
          <img src={Logo} className='logo-register' style={{paddingLeft:'2rem'}} />
          <Navbar.Toggle aria-controls="basic-navbar-nav custom-toggler"
           style={{ borderColor: 'transparent',color: 'white !important' }} className=" ms-1" />
        </Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mt-1">
            <DropdownButton
              title={
                <div className='d-flex align-items-center'>
                  <img src={LanguageIcon} width='24px' height='24px' className='me-1 mb-4' />
                  <span className='mb-4'>{currentLanguage}</span>
                  <img src={ArrowDownImage} width='24px' height='24px' className='ms-1 mb-4' />
                </div>
              }
              id="language-dropdown"
              variant=""
              className=" bg-transparent mr-5 custom-dropdown mt-1"
            >
              {availableLanguages.map((lang) => (
                <Dropdown.Item key={lang.code} 
                onClick={() => changeLanguage(lang.code)}
           >
                  <img src={lang.img} style={{ height: '1.5rem', width: '1.5rem' }} className='me-2' />
                  {lang.label}
                </Dropdown.Item>
              ))}
            </DropdownButton>
            
            <Link to='/login' className='text-black d-flex mt-2' style={{ textDecoration: 'none', }}>
              <img src={profileIcon} width='24px' height='24px' className='me-1' />
              {t('navbar.login')}
            </Link>
          </Nav>
          <Nav className="me-5 m-2" >
            <Nav.Link href='/#section1' className='' style={{textDecoration:'none'}} onClick={() => handleNavLinkClick('about')}>  <p className={`  ${activeLink === 1 ? 'activeButton' : ''}`} onClick={() => handleNavLinkClick(1)} style={{ marginRight: '2rem' }}>{t('navbar.home')}</p></Nav.Link>
                <Nav.Link href="/#about"className='' style={{textDecoration:'none'}}> <p className={` ${activeLink === 2 ? 'activeButton' : ''}`} onClick={() => handleNavLinkClick(2)} style={{ marginRight: '2rem' }}>{t('navbar.aboutus')}</p></Nav.Link>
                <Nav.Link href="/#Who"className='' style={{textDecoration:'none'}}> <p className={` ${activeLink === 3 ? 'activeButton' : ''}`} onClick={() => handleNavLinkClick(3)} style={{ marginRight: '2rem' }} >{t('navbar.whoFor')}</p></Nav.Link>
                 <Nav.Link href="/#How" className='' style={{textDecoration:'none'}}> <p className={` ${activeLink === 4 ? 'activeButton' : ''}`} onClick={() => handleNavLinkClick(4)} style={{ marginRight: '2rem' }}>{t('navbar.howItWorks')}</p></Nav.Link>
                 <Nav.Link href="/#Testimonial" className='' style={{textDecoration:'none'}}><p className={` ${activeLink === 5? 'activeButton' : ''}`} onClick={() => handleNavLinkClick(5)} style={{ marginRight: '2rem' }}>{t('navbar.testimonial')}</p></Nav.Link>
                 <Nav.Link href="/#Contact" className='' style={{textDecoration:'none'}}><p className={` ${activeLink === 6 ? 'activeButton' : ''}`} onClick={() => handleNavLinkClick(6)} style={{ marginRight: '2rem' }}>{t('navbar.contactUs')}</p></Nav.Link>
                 <Nav.Link href="/#News" className='' style={{textDecoration:'none'}}><p className={` ${activeLink === 7 ? 'activeButton' : ''}`} onClick={() => handleNavLinkClick(7)} style={{ marginRight: '2rem' }}>{t('navbar.news')}</p></Nav.Link>
            </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
      :
      <Container  style={{marginLeft:'2.2rem',direction:direction}}>
      <TopNavbar />
      <hr className='Line-2'/>
      <BottomNavbar />
    </Container>}
    
     
    </div>
  );
}

export default CombinedNavbars;