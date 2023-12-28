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
import { RxDividerVertical } from "react-icons/rx";
import {BiChevronDown} from "react-icons/bi";
import Ar from '../../assets/imgs/Ar.png';
import En from '../../assets/imgs/en.jpg';


const TopNavbar = ({content}) => {
  const currentLanguage = Cookies.get('language') || 'En';
  console.log('bbb',content)

  const changeLanguage = (lng) => {
    window.location.reload();
    Cookies.set('language', lng);
  };
  const availableLanguages = [
    { code: 'En', label: 'English',img:En },
    { code: 'Ar', label: 'Arabic' ,img:Ar },
  ];

  return (
    <Navbar collapseOnSelect expand="xl" className="">
      {/* <Container className="justify-content-start " style={{marginLeft:'3.5rem'}} >  */}
      <Container className="justify-content-start navbar-container " > 
        <Navbar.Brand href="#home" className='fs-4 text-white'><img src={LogoWhite} width='70%' /></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto" style={{marginRight:'-6rem'}}>
          </Nav>
          <Nav className='right-nav' >
      
          <DropdownButton
  title={
    <div className='d-flex align-items-center'>
      <GrLanguage color='white' className='me-1' />
      <span className='text-white'>{currentLanguage}</span>
      <BiChevronDown className='ml-1' style={{ color: 'white' }} />
    </div>
  }
  id="language-dropdown"
  variant=""
  className="text-white bg-transparent mr-5 custom-dropdown"
>
  {availableLanguages.map((lang) => (
    <Dropdown.Item key={lang.code} onClick={() => changeLanguage(lang.code)}>
      <img src={lang.img} style={{height:'2rem',width:'2rem'}} />
     {lang.label}
    </Dropdown.Item>
  ))}
</DropdownButton>

<RxDividerVertical color="gray" size={30} className='mt-1' />
            <p className='text-white mt-2'> <Link to='/login' style={{textDecoration:'none',color:'white'}}><IoPerson  />Login</Link></p>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

const BottomNavbar = () => {
  const [activeLink, setActiveLink] = useState(null);

  const handleNavLinkClick = (index,sectionId) => {
    setActiveLink(index);
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };


  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-transparent">
      {/* <Container style={{marginLeft:'3.8rem'}} > */}
      <Container className='navbar-container' >
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home" className='text-white' style={{textDecoration:'none'}} onClick={() => handleNavLinkClick('about')}>  <p className={`text-white  ${activeLink === 1 ? 'active' : ''}`} onClick={() => handleNavLinkClick(1)} style={{ marginRight: '1rem' }}>Home</p></Nav.Link>
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
