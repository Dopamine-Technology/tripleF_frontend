import React from 'react';
import { Button } from 'react-bootstrap';
import { FaArrowRightLong,FaArrowLeftLong  } from "react-icons/fa6";
import { Link,useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../LanguageContext/LanguageProvider';

const RegisterButton = () => {

    const navigate=useNavigate();
    const { language, changeLanguage,direction } = useLanguage(); 
  const [t,i18n]=useTranslation();

    const handleRegister=()=>{

        navigate('/register');
    }
    return (  
         <Button className='Register-button' onClick={handleRegister} >
             <Link  className='Register-link'>  {t('header.Register')}
             {language=='ar'?<FaArrowLeftLong />:<FaArrowRightLong />}
           
              </Link>
            </Button> 
         );
}
 
export default RegisterButton;