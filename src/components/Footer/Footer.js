import React from 'react';
import './footer.css';


const Footer = () => {
  return (
    <footer className='footer'>
      <div className='section'>
        <p className='logo-p'>LOGO</p>
        <p className='footer-p'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation</p>
      </div>

      <div className='section'>
        <h3>Areas of Expertise</h3>
        <p>Prenuptial Agreements</p>
        <p>High Net Worth Individuals</p>
        <p>International Divorce Cases</p>
        <p>Civil Partnerships</p>
      </div>

      <div className='section'>
        <h3>Links</h3>
        <p><a>Terms and Conditions</a></p>
        <p><a>Privacy Policy</a></p>
        <p><a>Cookie Policy and Data Protection</a></p>
        <p><a>Complaints Policy</a></p>
        <p><a>FAQ</a></p>
      </div>

      <div className='section'>
        <h3>Consultation</h3>
        <p>Phone: +123 456 789</p>
      </div>

      <hr className='footer-hr' />

    </footer>
  );
}

export default Footer;
