import React,{useState} from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useAxios from '../Auth/useAxiosHook.interceptor';
import { message } from 'antd';
import { useLanguage } from '../LanguageContext/LanguageProvider';
import { useTranslation } from 'react-i18next';

const FollowBtn = ({ id, is_followed, updateFollowersCount ,updateIsFollowed,updateFollowingCount}) => {
    const axios = useAxios();
    const { language, changeLanguage } = useLanguage(); // Access language context
    const [direction, setDirection] = useState('ltr');
    const [t, i18n] = useTranslation();

    const handleFollow = async () => {
        try {
            const response = await axios.get(`follow/toggle/${id}`);
            message.success(response.data.message);
            updateFollowersCount(is_followed ? -1 : 1);
            updateIsFollowed(!is_followed)
        } catch (error) {
            console.error('Error toggling follow status:', error);
        }
    };

    return (  
        <Button className='follow-button' onClick={handleFollow}>
            {is_followed ? t('Profile.unfollow') : t('Profile.follow')+"+"}
        </Button> 
    );
};

export default FollowBtn;
