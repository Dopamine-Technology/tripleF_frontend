import React from 'react';
import './footer.css';
import { FaFacebookF,FaTwitter,FaSnapchatGhost  } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
import Logo from '../../assets/imgs/Logo.png'
import { RiTwitterXLine } from "react-icons/ri";
import facebook2 from '../../assets/imgs/facebook2.png'
import twitter from '../../assets/imgs/twitter.svg';
import instagram from '../../assets/imgs/instagram.png';
import snapchat from '../../assets/imgs/snapchat.png';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='section'>
      <Navbar.Brand href="/" className="" style={{}}>
      <img src={Logo} className='mb-3' style={{ width: '140px',height: '50px',marginRight:'14rem'}} />
      <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ borderColor: 'transparent' }} className=" ms-1" />
    </Navbar.Brand>
        <p className='footer-p'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation</p>
        <div className='social-icons'>
        <Link to='https://www.facebook.com/triple.f.ln/'><img src={facebook2} className='icon' /></Link>
        <Link to='https://twitter.com/TripleF_lnc'><img src={twitter}  className='icon'  /></Link>
        <Link to='https://www.instagram.com/triple.f.lnc/'><img src={instagram}  className='icon'  /></Link>
        <Link><img src={snapchat}   className='icon' /></Link>
      </div>
      </div>

      <div className='section'>
        <h6 className='align-h6'>Usefull Links</h6>
        <p className='align-h6'> <Nav.Link href="#about"  className="nav-link2">About us</Nav.Link></p>
        <p className='align-h6'><Nav.Link href="#How"  className="nav-link2">How it works</Nav.Link></p>
        <p className='align-h6'><Nav.Link href="#Who"  className="nav-link2">Who TripleF For</Nav.Link></p>
        <p className='align-h6'><Nav.Link href="/register"  className="nav-link2">Register Now</Nav.Link></p>
      </div>

      <div className='section'>
        <h6 className='align-h6'>Help & Support</h6>
        <p  className='align-h6'><Nav.Link href="#Contact"  className="nav-link2">Contact Us</Nav.Link></p>
        <p className='align-h6'><a  className="nav-link">Privacy Policy</a></p>
        <p className='align-h6'><a  className="nav-link">Terms & Conditions</a></p>
      
      </div>

      <div className='section'>
        <h6 className='align-h6'><Nav.Link href="#Who"  className="nav-link2">Who is TripleF for</Nav.Link></h6>
        <p className='align-h6'><Nav.Link href="#Who"  className="nav-link2">Talented</Nav.Link></p>
        <p className='align-h6'><Nav.Link href="#Who" className="nav-link2">Coaches</Nav.Link></p>
        <p className='align-h6'><Nav.Link href="#Who"  className="nav-link2">Clubs</Nav.Link></p>
        <p className='align-h6'  > <a className="nav-link">Companies</a></p>
      </div>

      <div className='copyright-section'>
        <p className='copyright-p'>&copy; 2023 Dopamine All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
