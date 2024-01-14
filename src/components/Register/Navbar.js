import React,{useState,useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { GrLanguage } from 'react-icons/gr';
import { useTranslation } from 'react-i18next';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { GoPerson } from "react-icons/go";
import Cookies from 'js-cookie';
import Logo from '../../assets/imgs/Logo.svg'
import { IoPerson } from "react-icons/io5";
import './style.css'
import { Link } from 'react-router-dom';
import { RxDividerVertical } from "react-icons/rx";


const TopNavbar = ({content}) => {
  const currentLanguage = Cookies.get('language') || 'En';
  console.log('bbb',content)

  const changeLanguage = (lng) => {
    window.location.reload();
    Cookies.set('language', lng);
  };
  const availableLanguages = [
    { code: 'En', label: 'English' },
    { code: 'Ar', label: 'Arabic' },
  ];

  return (
    <Navbar collapseOnSelect expand="xl" className="">
      {/* <Container className="justify-content-start " style={{marginLeft:'3.5rem'}} >  */}
      <Container className="justify-content-start navbar2-container " > 
        <Navbar.Brand href="/" className='fs-4'><img src={Logo} width='70%' /></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto" style={{marginRight:'-6rem'}}>
          </Nav>
          <Nav className='right-nav' >
      
          <DropdownButton
  title={
    <div className=' d-flex align-items-center'>
      <GrLanguage color='black' className='me-1' />
      <span className=''>{currentLanguage}</span>
    </div>
  }
  id="language-dropdown"
  variant=""
  className=" bg-transparent mr-5 custom-dropdown"
>
  {availableLanguages.map((lang) => (
    <Dropdown.Item key={lang.code} onClick={() => changeLanguage(lang.code)}>
      {lang.label}
    </Dropdown.Item>
  ))}
</DropdownButton>
<RxDividerVertical color="gray" size={30} className='mt-1' />
            <p className=' mt-2'> <Link to='/login' style={{textDecoration:'none',color:'black'}}><IoPerson  />Login</Link></p>
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
      <Container className='navbar3-container' >
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/"  style={{textDecoration:'none'}}>  <p className={`  ${activeLink === 1 ? 'active' : ''}`} onClick={() => handleNavLinkClick(1)} style={{ marginRight: '1rem' }}>Home</p></Nav.Link>
            <Nav.Link href="/" style={{textDecoration:'none'}}> <p className={` ${activeLink === 2 ? 'active' : ''}`} onClick={() => handleNavLinkClick(2)} style={{ marginRight: '1rem' }}>AboutUs</p></Nav.Link>
            <Nav.Link href="/" style={{textDecoration:'none'}}> <p className={` ${activeLink === 3 ? 'active' : ''}`} onClick={() => handleNavLinkClick(3)} style={{ marginRight: '1rem' }} >Who is TripleF for</p></Nav.Link>
            <Nav.Link href="/"  style={{textDecoration:'none'}}> <p className={` ${activeLink === 4 ? 'active' : ''}`} onClick={() => handleNavLinkClick(4)} style={{ marginRight: '1rem' }}>How it works</p></Nav.Link>
            <Nav.Link href="/"  style={{textDecoration:'none'}}><p className={` ${activeLink === 5? 'active' : ''}`} onClick={() => handleNavLinkClick(5)} style={{ marginRight: '1rem' }}>Testimonial</p></Nav.Link>
            <Nav.Link href="/"  style={{textDecoration:'none'}}><p className={`${activeLink === 6 ? 'active' : ''}`} onClick={() => handleNavLinkClick(6)} style={{ marginRight: '1rem' }}>Contact Us</p></Nav.Link>
            <Nav.Link href="/"  style={{textDecoration:'none'}}><p className={` ${activeLink === 7 ? 'active' : ''}`} onClick={() => handleNavLinkClick(7)} style={{ marginRight: '1rem' }}>News</p></Nav.Link>
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
