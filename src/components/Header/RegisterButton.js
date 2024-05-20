import React from 'react';
import { Button } from 'react-bootstrap';
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../LanguageContext/LanguageProvider';

const RegisterButton = () => {
    const { language } = useLanguage();
    const [t] = useTranslation();

    return (
        <Button className='Register-button'>
            <a className='Register-link' href='/register'>
                {t('header.Register')}
                {language === 'ar' ? <FaArrowLeftLong /> : <FaArrowRightLong />}
            </a>
        </Button>
    );
}

export default RegisterButton;
