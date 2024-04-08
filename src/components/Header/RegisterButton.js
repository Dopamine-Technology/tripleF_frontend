import React from 'react';
import { Button } from 'react-bootstrap';
import { FaArrowRightLong } from "react-icons/fa6";
import { Link,useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';

const RegisterButton = () => {

    const navigate=useNavigate();
    const currentLanguage = Cookies.get('language') || 'en';
    const [t,i18n]=useTranslation();

    const handleRegister=()=>{

        navigate('/register');
    }
    return (  
         <Button className='Register-button' onClick={handleRegister} >
             <Link  className='Register-link'>  {t('header.Register')} <FaArrowRightLong /></Link>
            </Button> 
         );
}
 
export default RegisterButton;