import React,{useState,useEffect,useLayoutEffect} from 'react';
import {Container} from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Cookies from 'js-cookie';
import LogoWhite from '../../assets/imgs/LogohiteLastVersion.png';
import './style.css';
import { Link } from 'react-router-dom';
import { RxDividerVertical } from "react-icons/rx";
import Ar from '../../assets/imgs/Ar.png';
import En from '../../assets/imgs/en.jpg';
import LanguageIcon from '../../assets/imgs/langauge-icon.png';
import profileIcon from '../../assets/imgs/profile-icon.svg';
import ArrowDownImage from '../../assets/imgs/dropdownWhite.svg';
import Logo from '../../assets/imgs/LogoLastVersion.png'
import LanguageIconBlack from '../../assets/imgs/langauge-icon.svg';
import profileIconBlack from '../../assets/imgs/profile-black-icon.svg';
import btnIconHover from '../../assets/imgs/btnIconHover.svg';
import burgerImg from '../../assets/imgs/burger.svg'
import { useTranslation } from 'react-i18next';
import { useScreenWidth } from '../ScreenWidthContext/ScreenWidth.context';
import { useLanguage } from '../LanguageContext/LanguageProvider';
import Turkey from '../../assets/imgs/TurkeyFlag.webp'
import Spain from '../../assets/imgs/flagSpain.webp'

const TopNavbar = ({content}) => {
  const currentLanguage = Cookies.get('language') || 'en';
  const [t,i18n]=useTranslation();


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
<Navbar expand="lg" className='scroll-navbar' >
  <Container className='navbar-container'>
    <Navbar.Brand  className="d-flex align-items-center navbar-brand2 " style={{marginLeft:'5rem'}}>
      <img src={Logo} className='logo-register' />
      <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ borderColor: 'transparent' }} className=" ms-5"/>
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
          style={{ zIndex: 999 }}
          
       
        >
          {availableLanguages.map((lang) => (
            <Dropdown.Item key={lang.code} onClick={() => changeLanguage(lang.code)}    style={{ zIndex: 999 }} >
              <img src={lang.img} style={{ height: '1.5rem', width: '1.5rem' }} className='me-2' />
              {lang.label}
            </Dropdown.Item>
          ))}
        </DropdownButton>
        <RxDividerVertical color="gray" size={30} className='mt-2' />
        <Link to='/login' className='text-black d-flex mt-2' style={{ textDecoration: 'none' }}>
      <div onMouseOver={handleHover} onMouseOut={handleHoverOut} className='text-black d-flex'>
        <img src={isHovering ? btnIconHover : profileIconBlack} width='24px' height='24px' className='me-1' alt='Profile Icon' />
        <p style={{color:isHovering?'#77dcbf':'black'}}>{t('navbar.login')}</p>
        <p></p>
      </div>
    </Link>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>:
<Navbar expand="lg" className='fixed-navbar' >
  <Container style={{ marginLeft: '-1rem', marginRight: '-1rem' }}>
    <Navbar.Brand  className="d-flex align-items-center navbar-brand2">
      <img src={LogoWhite} className='logo-header' />
      <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ borderColor: 'transparent' }} className="custom-toggler ms-5" />
    </Navbar.Brand>
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ms-auto mt-3">
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
          style={{ zIndex: 999 }}
          
        >
          {availableLanguages.map((lang) => (
            <Dropdown.Item key={lang.code} onClick={() => changeLanguage(lang.code)}   style={{ zIndex: 999 }}>
              <img src={lang.img} style={{ height: '1.5rem', width: '1.5rem' }} className='me-2' />
              {lang.label}
            </Dropdown.Item>
          ))}
        </DropdownButton>
        <RxDividerVertical color="gray" size={30} className='mt-2' />
        <Link to='/login' className='text-black d-flex' style={{ textDecoration: 'none' }}>
      <div onMouseOver={handleHover} onMouseOut={handleHoverOut} className='text-black d-flex mt-2'>
        <img src={isHovering ? btnIconHover : profileIcon} width='24px' height='24px' className='me-1' alt='Profile Icon' />
        <p style={{color:isHovering?'#77dcbf':'white'}}>{t('navbar.login')}</p>
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
  const [t,i18n]=useTranslation();

  const { windowWidth, isSmallScreen, isTabletScreen, isProScreen } = useScreenWidth();

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
  const currentLanguage = Cookies.get('language') || 'en';





  return (
    <>
    {isScrolled?
    <Navbar expand="lg" className='scroll-navbar2'>
    <Container className='container-tablet-responsive'>
      <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ borderColor: 'transparent',marginLeft:isSmallScreen?'18.8rem':'14.5rem'}} className=""/>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
        <Nav.Link href='/#homeSection' className='' style={{textDecoration:'none'}} onClick={() => handleNavLinkClick('about')} className={`  ${activeLink === 1 ? 'activeButton' : ''}`} onClick={() => handleNavLinkClick(1)} style={{ marginRight: '2rem' }}>
        {t('navbar.home')}
        </Nav.Link>
            <Nav.Link href="/#about"className='' style={{textDecoration:'none'}} className={` ${activeLink === 2 ? 'activeButton' : ''}`} onClick={() => handleNavLinkClick(2)} style={{ marginRight: '2rem' }}> {t('navbar.aboutus')}</Nav.Link>
            <Nav.Link href="/#Who"className='' style={{textDecoration:'none'}} className={` ${activeLink === 3 ? 'activeButton' : ''}`} onClick={() => handleNavLinkClick(3)} style={{ marginRight: '2rem' }} >{t('navbar.whoFor')}</Nav.Link>
             <Nav.Link href="/#How" className='' style={{textDecoration:'none'}} className={` ${activeLink === 4 ? 'activeButton' : ''}`} onClick={() => handleNavLinkClick(4)} style={{ marginRight: '2rem' }}> {t('navbar.howItWorks')}</Nav.Link>
             <Nav.Link href="/#Testimonial" className='' style={{textDecoration:'none'}} className={` ${activeLink === 5? 'activeButton' : ''}`} onClick={() => handleNavLinkClick(5)} style={{ marginRight: '2rem' }}>{t('navbar.testimonial')}</Nav.Link>
             <Nav.Link href="/#Contact" className='' style={{textDecoration:'none'}} className={` ${activeLink === 6 ? 'activeButton' : ''}`} onClick={() => handleNavLinkClick(6)} style={{ marginRight: '2rem' }}>{t('navbar.contactUs')}</Nav.Link>
             <Nav.Link href="/#News" className='' style={{textDecoration:'none'}} className={` ${activeLink === 7 ? 'activeButton' : ''}`} onClick={() => handleNavLinkClick(7)} style={{ marginRight: '2rem' }}><p>{t('navbar.news')}</p></Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>:<Navbar expand="lg" className='fixed-navbar2' >
    <Container style={{marginLeft:'1rem'}}>
    
      <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ borderColor: 'transparent',marginLeft:isSmallScreen?'16rem':'13rem'}} className="custom-toggler"/>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
        <Nav.Link href="/#homeSection"className='text-white' style={{textDecoration:'none'}} className={`text-white ${activeLink === 1 ? 'activeButton' : ''}`} onClick={() => handleNavLinkClick(1)} style={{ marginRight: isTabletScreen?'0rem':'0rem' }}> {t('navbar.home')}
</Nav.Link>
            <Nav.Link href="#about"className='text-white' style={{textDecoration:'none'}} className={`text-white ${activeLink === 2 ? 'activeButton' : ''}`} onClick={() => handleNavLinkClick(2)} style={{ marginRight: isTabletScreen?'0rem':'0rem' }}> {t('navbar.aboutus')}</Nav.Link>
            <Nav.Link href="#Who"className='text-white' style={{textDecoration:'none'}} className={`text-white ${activeLink === 3 ? 'activeButton' : ''}`} onClick={() => handleNavLinkClick(3)} style={{ marginRight: isTabletScreen?'0rem':'2rem' }} > {t('navbar.whoFor')}</Nav.Link>
             <Nav.Link href="#How" className='text-white' style={{textDecoration:'none'}} className={`text-white ${activeLink === 4 ? 'activeButton' : ''}`} onClick={() => handleNavLinkClick(4)} style={{ marginRight: isTabletScreen?'0rem':'2rem' }}>{t('navbar.howItWorks')}</Nav.Link>
             <Nav.Link href="#Testimonial" className='text-white' style={{textDecoration:'none'}} className={`text-white ${activeLink === 5? 'activeButton' : ''}`} onClick={() => handleNavLinkClick(5)} style={{ marginRight: isTabletScreen?'0rem':'2rem' }}>{t('navbar.testimonial')}</Nav.Link>
             <Nav.Link href="#Contact" className='text-white' style={{textDecoration:'none'}} className={`text-white ${activeLink === 6 ? 'activeButton' : ''}`} onClick={() => handleNavLinkClick(6)} style={{ marginRight: isTabletScreen?'0rem':'2rem' }}>{t('navbar.contactUs')}</Nav.Link>
             <Nav.Link href="#News" className='text-white' style={{textDecoration:'none'}} className={`text-white ${activeLink === 7 ? 'activeButton' : ''}`} onClick={() => handleNavLinkClick(7)} style={{ marginRight: isTabletScreen?'0rem':'2rem' }}>{t('navbar.news')}</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  }
    
  </>
  );
}

const CombinedNavbars = ({setNavbarExpanded }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { windowWidth, isSmallScreen, isTabletScreen, isProScreen } = useScreenWidth();
  const [t,i18n]=useTranslation();
  const [expanded, setExpanded] = useState(false);

  

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



    const currentLanguage = Cookies.get('language') || 'en';
  

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    Cookies.set('language', lng);
}
  const availableLanguages = [
    { code: 'en', label: 'English',img:En },
    { code: 'ar', label: 'Arabic' ,img:Ar },
  ];

  const [activeLink, setActiveLink] = useState(1);

  const handleNavLinkClick = (index, sectionId) => {
    setActiveLink(index);
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    // Collapse the navbar after clicking a link
    setExpanded(false);
    setNavbarExpanded(false);

  };


  const handleToggle = () => {
    setExpanded(!expanded);
    setNavbarExpanded(!expanded);
  };

 
  return (
    <div>
   {
    isTabletScreen?(
      <Navbar expand="lg" className='p-0' onToggle={setNavbarExpanded} >
  <Container className='navbar-container' style={{paddingLeft:'2rem'}}>
    <Navbar.Brand href="" className="d-flex align-items-center navbar.brand2  ">
      <img src={LogoWhite} className='' />
      <Navbar.Toggle aria-controls="basic-navbar-nav custom-toggler"
           style={{ borderColor: 'transparent',color: 'white !important' }} className=" ms-5" />
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
          style={{ zIndex: 999 }}
        >
          {availableLanguages.map((lang) => (
            <Dropdown.Item key={lang.code} 
            onClick={() => changeLanguage(lang.code)}
            style={{ zIndex: 999 }}
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
      <Nav className="me-auto">
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

    ):
    isSmallScreen?(
      <Navbar expand="lg" className='p-0 m-4 mb-0' expanded={expanded} onToggle={handleToggle}>
      <Container className='navbar-container' style={{ boxShadow: 'none' }}>
        <Navbar.Brand href="" className="d-flex align-items-center navbar.brand2 ">
          <img src={LogoWhite} className='logo-register' style={{ paddingLeft: '2rem' }} />
          <Navbar.Toggle aria-controls="basic-navbar-nav custom-toggler" className="ms-5">
  <img src={burgerImg} alt="Burger Menu" style={{ width: '24px', height: 'auto', cursor: 'pointer' }} />
</Navbar.Toggle>
        </Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav" className="custom-navbar-collapse">
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
              className="bg-transparent mr-5 custom-dropdown mt-1"
              style={{ zIndex: 999 }}
            >
              {availableLanguages.map((lang) => (
                <Dropdown.Item key={lang.code} onClick={() => changeLanguage(lang.code)}   style={{ zIndex: 999 }}>
                  <img src={lang.img} style={{ height: '1.5rem', width: '1.5rem' }} className='me-2' />
                  {lang.label}
                </Dropdown.Item>
              ))}
            </DropdownButton>
            <Link to='/login' className='text-black d-flex mt-2' style={{ textDecoration: 'none' }}>
              <img src={profileIcon} width='24px' height='24px' className='me-1' />
              {t('navbar.login')}
            </Link>
          </Nav>
          <Nav className="me-5 m-2">
            <Nav.Link href='/#section1' className='' style={{ textDecoration: 'none', color: 'black' }} onClick={() => handleNavLinkClick(1, 'section1')}>
              <p className={`${activeLink === 1 ? 'activeButton' : ''}`} style={{ marginRight: '2rem' }}>{t('navbar.home')}</p>
            </Nav.Link>
            <Nav.Link href="/#about" className='' style={{ textDecoration: 'none', color: 'black' }} onClick={() => handleNavLinkClick(2, 'about')}>
              <p className={`${activeLink === 2 ? 'activeButton' : ''}`} style={{ marginRight: '2rem' }}>{t('navbar.aboutus')}</p>
            </Nav.Link>
            <Nav.Link href="/#Who" className='' style={{ textDecoration: 'none', color: 'black' }} onClick={() => handleNavLinkClick(3, 'Who')}>
              <p className={`${activeLink === 3 ? 'activeButton' : ''}`} style={{ marginRight: '2rem' }}>{t('navbar.whoFor')}</p>
            </Nav.Link>
            <Nav.Link href="/#How" className='' style={{ textDecoration: 'none', color: 'black' }} onClick={() => handleNavLinkClick(4, 'How')}>
              <p className={`${activeLink === 4 ? 'activeButton' : ''}`} style={{ marginRight: '2rem' }}>{t('navbar.howItWorks')}</p>
            </Nav.Link>
            <Nav.Link href="/#Testimonial" className='' style={{ textDecoration: 'none', color: 'black' }} onClick={() => handleNavLinkClick(5, 'Testimonial')}>
              <p className={`${activeLink === 5 ? 'activeButton' : ''}`} style={{ marginRight: '2rem' }}>{t('navbar.testimonial')}</p>
            </Nav.Link>
            <Nav.Link href="/#Contact" className='' style={{ textDecoration: 'none', color: 'black' }} onClick={() => handleNavLinkClick(6, 'Contact')}>
              <p className={`${activeLink === 6 ? 'activeButton' : ''}`} style={{ marginRight: '2rem' }}>{t('navbar.contactUs')}</p>
            </Nav.Link>
            <Nav.Link href="/#News" className='' style={{ textDecoration: 'none', color: 'black' }} onClick={() => handleNavLinkClick(7, 'News')}>
              <p className={`${activeLink === 7 ? 'activeButton' : ''}`} style={{ marginRight: '2rem' }}>{t('navbar.news')}</p>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    )
:
isProScreen?(
<Navbar expand="lg">
  <Container className="">
    <Navbar.Brand href="" className="">
      <img src={LogoWhite} className='' />
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" style={{width:"28px",height:'28px'}} className="ms-auto" children={<img src={burgerImg} alt="Toggle Menu" width='28px' height='22px' />} />
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
          className="bg-transparent mr-5 custom-dropdown mt-1"
          style={{ zIndex: 999 }}
        >
          {availableLanguages.map((lang) => (
            <Dropdown.Item key={lang.code} onClick={() => changeLanguage(lang.code)}   style={{ zIndex: 999 }}>
              <img src={lang.img} style={{ height: '1.5rem', width: '1.5rem' }} className='me-2' />
              {lang.label}
            </Dropdown.Item>
          ))}
        </DropdownButton>
        
        <Link to='/login' className='text-black d-flex mt-2' style={{ textDecoration: 'none' }}>
          <img src={profileIcon} width='24px' height='24px' className='me-1' />
          {t('navbar.login')}
        </Link>
      </Nav>
      <Nav className="me-auto">
        <Nav.Link href='/#section1' className='' style={{ textDecoration: 'none' }} onClick={() => handleNavLinkClick('about')}>
          <p className={`  ${activeLink === 1 ? 'activeButton' : ''}`} onClick={() => handleNavLinkClick(1)} style={{ marginRight: '2rem' }}>{t('navbar.home')}</p>
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

 
):(
  <Container style={{ marginRight: isScrolled ? '14rem' : '2.5rem',zIndex:'1000' }}>

      <TopNavbar />
      <BottomNavbar />
    </Container>
)
 
   }
     
    </div>
  );
}

export default CombinedNavbars;