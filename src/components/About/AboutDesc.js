import React,{useEffect,useState} from 'react';
import RegisterButton from '../Header/RegisterButton';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import { useLanguage } from '../LanguageContext/LanguageProvider';


const AboutDesc = () => {
  const { language, changeLanguage } = useLanguage(); // Access language context
  const [direction, setDirection] = useState('ltr');
  const [t, i18n] = useTranslation();

  useEffect(() => {
    // Use the language obtained from the context
    if (language === 'ar') {
        setDirection('rtl');
    } else {
        setDirection('ltr');
    }
}, [language]);

    return (  <div className='aboutDesc-div' id='about' style={{ marginRight: language === 'ar' ? '3rem' : '' }}>
    <p className='about-h1'>{t('About.title')}</p>
    <p className='about-p'>{t('About.desc')}</p>
    <div className='button-container'>
        <RegisterButton />
    </div>
</div>);
}
 
export default AboutDesc;