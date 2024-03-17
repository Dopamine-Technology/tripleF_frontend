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

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='section'>
        <p className='logo-p'><img src={Logo} width='120' /></p>
        <p className='footer-p'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation</p>
        <div className='social-icons'>
        <img src={facebook2} className='icon' />
        <img src={twitter}  className='icon'  />
        <img src={instagram}  className='icon'  />
        <img src={snapchat}   className='icon' />
      </div>
      </div>

      <div className='section'>
        <h6 className='align-h6'>Usefull Links</h6>
        <p className='align-h6'> <Nav.Link href="#about">About us</Nav.Link></p>
        <p className='align-h6'><Nav.Link href="#How">How it works</Nav.Link></p>
        <p className='align-h6'><Nav.Link href="#Who">Who TripleF For</Nav.Link></p>
        <p className='align-h6'><Nav.Link href="/register">Register Now</Nav.Link></p>
      </div>

      <div className='section'>
        <h6 className='align-h6'>Help & Support</h6>
        <p  className='align-h6'><Nav.Link href="#Contact">Contact Us</Nav.Link></p>
        <p className='align-h6'><a>Privacy Policy</a></p>
        <p className='align-h6'><a>Terms & Conditions</a></p>
      
      </div>

      <div className='section'>
        <h6 className='align-h6'><Nav.Link href="#Who">Who is TripleF for</Nav.Link></h6>
        <p className='align-h6'><Nav.Link href="#Who">Talented</Nav.Link></p>
        <p className='align-h6'><Nav.Link href="#Who">Coaches</Nav.Link></p>
        <p className='align-h6'><Nav.Link href="#Who">Clubs</Nav.Link></p>
        <p className='align-h6'>Companies</p>
      </div>

      <div className='copyright-section'>
        <p className='copyright-p'>&copy; 2023 Dopamine All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
