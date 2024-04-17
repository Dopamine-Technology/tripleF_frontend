import React,{useState,useEffect} from 'react';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';

const WhosForDesc = () => {
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

    return ( <div className='mt-3' id='Who'>
   <p className='who2-h1 mb-5'  >   {t('whos.title')}</p>
   
    </div> );
}
 
export default WhosForDesc;