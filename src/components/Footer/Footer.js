import React,{useState,useEffect} from 'react';
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
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';

const Footer = () => {

  const currentLanguage = Cookies.get('language') || 'en';
  const [direction, setDirection] = useState('ltr');
  const [t,i18n]=useTranslation();

  useEffect(() => {
    if (currentLanguage === 'ar') {
      setDirection('rtl');
    } 
    else{
      setDirection('ltr')
    }
  }, [currentLanguage]);

  return (
    <footer className='footer' style={{direction:direction}}>
      <div className='section'>
      <Navbar.Brand href="/" className="" style={{}}>
      <img src={Logo} className='mb-3' style={{ width: '140px',height: '50px',marginRight:'14rem'}} />
      <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ borderColor: 'transparent' }} className=" ms-1" />
    </Navbar.Brand>
        <p className='footer-p'>{t('Footer.desc')}</p>
        <div className='social-icons'>
        <Link to='https://www.facebook.com/triple.f.ln/'><img src={facebook2} className='icon' /></Link>
        <Link to='https://twitter.com/TripleF_lnc'><img src={twitter}  className='icon'  /></Link>
        <Link to='https://www.instagram.com/triple.f.lnc/'><img src={instagram}  className='icon'  /></Link>
        <Link><img src={snapchat}   className='icon' /></Link>
      </div>
      </div>

      {t('Footer.headTitles', { returnObjects: true }).map((section, index) => (
  <div className='section' key={index}>
    <h6 className='align-h6'>{section.title}</h6>

      {section.subLinks.map((subLink, subIndex) => (
         <p className='align-h6'><Nav.Link href="#" className="nav-link2">{subLink}</Nav.Link></p> 
      ))}
  
  </div>
))}

      <div className='copyright-section'>
        <p className='copyright-p'>&copy; {t('Footer.copyRight')}</p>
      </div>
    </footer>
  );
}

export default Footer;
