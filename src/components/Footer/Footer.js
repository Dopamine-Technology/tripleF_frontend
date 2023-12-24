import React from 'react';
import './footer.css';
import { FaFacebookF,FaTwitter,FaSnapchatGhost  } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
import Logo from '../../assets/imgs/Logo.svg'

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='section'>
        <p className='logo-p'><img src={Logo} width='120' /></p>
        <p className='footer-p'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation</p>
        <div className='social-icons'>
        <FaFacebookF  className='icon ' size={22} />
        <FaTwitter  className='icon' size={22} />
        <BsInstagram  className='icon'size={22}  />
        <FaSnapchatGhost  className='icon' size={22} />
      </div>
      </div>

      <div className='section'>
        <h6 className='align-h6'>Usefull Links</h6>
        <p className='align-h6'>About us</p>
        <p className='align-h6'>How it works</p>
        <p className='align-h6'>Who TripleF For</p>
        <p className='align-h6'>Register Now</p>
      </div>

      <div className='section'>
        <h6 className='align-h6'>Help & Support</h6>
        <p  className='align-h6'><a>Contact Us</a></p>
        <p className='align-h6'><a>Privacy Policy</a></p>
        <p className='align-h6'><a>Terms & Conditions</a></p>
      
      </div>

      <div className='section'>
        <h6 className='align-h6'>Who is TripleF for</h6>
        <p className='align-h6'>Talented</p>
        <p className='align-h6'>Coaches</p>
        <p className='align-h6'>Clubs</p>
        <p className='align-h6'>Companies</p>
      </div>

      <div className='copyright-section'>
        <p className='copyright-p'>&copy; 2023 Dopamine All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
