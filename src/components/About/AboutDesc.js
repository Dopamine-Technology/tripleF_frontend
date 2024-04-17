import React,{useEffect,useState} from 'react';
import RegisterButton from '../Header/RegisterButton';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';


const AboutDesc = () => {
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
    return ( <div className='aboutDesc-div' id='about'>
        <p className='about-h1' >{t('About.title')}</p>
        <p className='about-p'>{t('About.desc')}</p>
               <div className='button-container'>
        <RegisterButton  />
        </div>
    </div> );
}
 
export default AboutDesc;