import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import useAxios from '../Auth/useAxiosHook.interceptor';
import { useScreenWidth } from '../ScreenWidthContext/ScreenWidth.context';
import { useTranslation } from 'react-i18next';

function Notification() {
    const axios=useAxios();
    const [direction, setDirection] = useState('ltr');
    const [t,i18n]=useTranslation();

    const initialNotificationStates = JSON.parse(localStorage.getItem('notificationStates')) || {
        'new_followers': true,
        'follower_challenges': true,
        'follower_opportunities': true,
        'new_message': true,
        'email_notifications': true
    };

    const notificationLabels = {
        'new_followers': t('notificationToggle.newFollowers'),
        'follower_challenges': t('notificationToggle.followersChallenges'),
        'follower_opportunities': t('notificationToggle.followersOpportunities'),
        'new_message':  t('notificationToggle.newMessage'),
        'email_notifications':  t('notificationToggle.emailNotfications')
    };

    const [notificationStates, setNotificationStates] = useState(initialNotificationStates);

    useEffect(() => {
        localStorage.setItem('notificationStates', JSON.stringify(notificationStates));
    }, [notificationStates]);
    
    const handleNotificationToggle = (type) => {
        setNotificationStates(prevState => ({
            ...prevState,
            [type]: !prevState[type]
        }));
    };

    useEffect(() => {
        sendNotificationSettings();
    }, [notificationStates]);

    const sendNotificationSettings = () => {
        const enabledNotifications = Object.keys(notificationStates)
            .filter(type => notificationStates[type])
            .map(notification => notification.replace(/_/g, '-'));

        const data = { notifications: enabledNotifications };
        axios.post('user/notification_settings', data)
            .then(response => {
                console.log("API Data:", data);
            })
            .catch(error => {
                console.error("Error sending notification settings:", error);
            });
    };

    return (
        <div className='edit-data'>
        <p className='title-editData'> Notifications</p>
        {Object.keys(notificationStates).map((type, index) => (
            <div key={index}>
                <div className='d-flex' style={{ justifyContent: 'space-between' }}>
                    <p className='notification-type'>{notificationLabels[type]}</p>
                    <Form.Check
                        type="switch"
                        id={`custom-switch-${index}`}
                        checked={notificationStates[type]}
                        onChange={() => handleNotificationToggle(type)}
                        style={{
                            boxShadow: '0px 5px 8px -1px rgba(6, 25, 56, 0.07)',
                            opacity: '1',
                            width: '3rem',
                            height: '1.3rem'
                        }}
                    />
                </div>
                {index !== Object.keys(notificationStates).length - 1 && (
                    <hr style={{ border: '1px solid rgba(235, 234, 237, 1)', opacity: '1' }} />
                )}
            </div>
        ))}
    </div>
    )
}

export default Notification;
