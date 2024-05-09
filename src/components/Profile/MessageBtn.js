import React,{useState} from 'react';
import { Button } from 'react-bootstrap';
import useAxios from '../Auth/useAxiosHook.interceptor';
import { message } from 'antd';
import { useLanguage } from '../LanguageContext/LanguageProvider';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const MessageBtn = () => {
    const axios = useAxios();
    const navigate=useNavigate();
    const { language, changeLanguage } = useLanguage(); 
    const [direction, setDirection] = useState('ltr');
    const [t, i18n] = useTranslation();
    const {id}=useParams();

    const handleMessage = async () => {
        navigate(`/chatBox/${id}`)
    };

    return (  
        <Button className='follow-button' onClick={handleMessage}>
           Send Message
        </Button> 
    );
};

export default MessageBtn;
