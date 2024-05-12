import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { message } from 'antd';
import axios from 'axios';
import NavBar from './Navbar';
import Verify from '../../assets/imgs/Verify.svg';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../LanguageContext/LanguageProvider';
import useAxios from '../Auth/useAxiosHook.interceptor';

function VerifyPage() {
  const navigate = useNavigate();
  const { token } = useParams();
  const { language, changeLanguage } = useLanguage(); 
  const [direction, setDirection] = useState('ltr');
  const [t, i18n] = useTranslation();
  const axios = useAxios();
  const [buttonDisabled, setButtonDisabled] = useState(false); // State to manage button disablement

  const handleActivation = async () => {
    setButtonDisabled(true); // Disable the button when clicked
    axios
      .get(`user/auth/verify_email`)
      .then(
        (response) => {
          message.success('your account verified successfully.');
        },
        (error) => {
          message.error('Your account is not verified yet, please try again.');
        }
      )
      .finally(() => {
        // Re-enable the button after 10 seconds
        setTimeout(() => {
          setButtonDisabled(false);
        }, 10000);
      });
  };

  return (
    <div>
      <NavBar />
      <div className='verify-container'>
        <div style={{ textAlign: 'center' }}>
          <img src={Verify} alt="Verification" />
          <p className='fs-3 p-top'>{t('Verification.title')}</p>
          <p style={{ color: '#464646', marginLeft: '2rem' }}>{t('Verification.desc')}</p>
          <Button 
            className='text-black border-2 p-2' 
            style={{ 
              background: '#77DCBF', 
              borderColor: '#77DCBF', 
              borderRadius: '45px', 
              width: '30%' 
            }} 
            onClick={handleActivation}
            disabled={buttonDisabled} // Disable button based on state
          >
            {t('Verification.btn')}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default VerifyPage;
