import React from 'react';
import './footer.css';
import { FaFacebookF,FaTwitter,FaSnapchatGhost  } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
import Logo from '../../assets/imgs/Logo.svg'

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='section'>
        <p className='logo-p'><img src={Logo} /></p>
        <p className='footer-p'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation</p>
        <div className='social-icons'>
        <FaFacebookF  className='icon' size={20} />
        <FaTwitter  className='icon' size={20} />
        <BsInstagram  className='icon'size={20}  />
        <FaSnapchatGhost  className='icon' size={20} />
      </div>
      </div>

      <div className='section'>
        <h6>Usefull Links</h6>
        <p>About us</p>
        <p>How it works</p>
        <p>Who TripleF For</p>
        <p>Register Now</p>
      </div>

      <div className='section'>
        <h6>Help & Support</h6>
        <p><a>Contact Us</a></p>
        <p><a>Privacy Policy</a></p>
        <p><a>Terms & Conditions</a></p>
      
      </div>

      <div className='section'>
        <h6>Who is TripleF for</h6>
        <p>Talented</p>
        <p>Coaches</p>
        <p>Clubs</p>
        <p>Companies</p>
      </div>

      <div className='copyright-section'>
        <p className='copyright-p'>&copy; 2023 Dopamine All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
