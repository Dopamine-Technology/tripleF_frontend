import React,{useState} from 'react';
import { Button } from 'react-bootstrap';
import useAxios from '../Auth/useAxiosHook.interceptor';
import { message } from 'antd';
import { useLanguage } from '../LanguageContext/LanguageProvider';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const MessageBtn = ({ id, is_followed, updateFollowersCount ,updateIsFollowed}) => {
    const axios = useAxios();
    const navigate=useNavigate();
    const { language, changeLanguage } = useLanguage(); 
    const [direction, setDirection] = useState('ltr');
    const [t, i18n] = useTranslation();

    const handleMessage = async () => {
        navigate('/chatBox')
    };

    return (  
        <Button className='follow-button' onClick={handleMessage}>
           Send Message
        </Button> 
    );
};

export default MessageBtn;
