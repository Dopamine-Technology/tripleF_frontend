import React, { useState, useEffect, useContext } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import NotificationIcon from '../../assets/imgs/notificationIcon.svg';
import morethanone from '../../assets/imgs/morethanzeronotificaion.png';
import NotificationActive from '../../assets/imgs/notificationIconActive.svg';
import './style.css';
import Pusher from 'pusher-js'; 
import { UserDataContext } from '../UserContext/UserData.context';
import useAxios from '../Auth/useAxiosHook.interceptor';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../LanguageContext/LanguageProvider';
import { useScreenWidth } from '../ScreenWidthContext/ScreenWidth.context';

function NotificationDropDown() {
    const [notifications, setNotifications] = useState([]);
    const [allNotifications, setAllNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { user } = useContext(UserDataContext);
    const { windowWidth, isSmallScreen, isTabletScreen, isProScreen } = useScreenWidth();
    const axios = useAxios();
    const navigate=useNavigate();
    const { language, changeLanguage } = useLanguage(); // Access language context
    const [direction, setDirection] = useState('ltr');
    const [t, i18n] = useTranslation();
    
  

    useEffect(() => {
        const pusher = new Pusher('323996d4cfab0016889a', {
            cluster: 'ap2',
        });

        console.log('Pusher connected:', pusher.connection.state)

        const channel = pusher.subscribe('notification-channel');

        console.log('Subscribed to channel:', channel.name);

        channel.bind('new-notification-event', (data) => {
            setNotifications((prevNotifications) => [...prevNotifications, data]);
            setUnreadCount((prevCount) => prevCount + 1);
            setHasUnreadNotifications(true);
            if (user.userData.id === data.notifiable_id) { // Check if the new notification is for the current user
                setHasUnreadNotifications(true);
            }
        });

        return () => {
            channel.unbind();
            pusher.unsubscribe('notification-channel');
            console.log('Disconnected from Pusher');
        };
    }, [notifications]);

    useEffect(() => {
        console.log('notification', notifications);
    }, [notifications]);

    const handleToggleClick = () => {
        axios.get('notifications/all')
            .then(response => {
                setAllNotifications(response.data.result);
                setNotifications([]);
            })
            .catch(error => {
                console.error('Error fetching notifications:', error);
            });
    };

    const redirectUser =(id,type)=>{
        if(type=='new_follower'){
            navigate(`/profile/${id}`)
        }
        else if(type=='new_post') {
            navigate(`/view/post/${id}`)
        }
        else if(type=='post_reaction'){
            navigate(`/view/post/${id}`)
        }
        else if(type=='post_reaction_by_count'){
            navigate(`/view/post/${id}`)
        }
        else {
            navigate('/')
        }
    }

    const handleClick = () => {
        if (isSmallScreen) {
            // Navigate to specific link for small screens
            navigate('/my/notifications');
        } else {
            // Handle dropdown toggle for larger screens
            handleToggleClick();
            setIsDropdownOpen(!isDropdownOpen);
        }
    };

    const displayedNotifications = allNotifications?.length > 0 ? allNotifications.slice(0, 7) : [];
    // console.log('notification here', notifications);

    return (
        <Dropdown className="d-inline mx-2" drop='start' onClick={handleClick} >
            <Dropdown.Toggle id="dropdown-autoclose-true" className="bg-transparent border-white">
            {(notifications.some(notification => notification.notifiable_id === user.userData.id) && hasUnreadNotifications&&!isDropdownOpen) ? (
    <img src={morethanone} className="icon me-2" />
) : (
    <img src={NotificationIcon} className="icon me-2" />
)}

            </Dropdown.Toggle>
            <Dropdown.Menu style={{ width: '33rem' }} className='mt-5'>
                <p className='title'>{t('Notification.notifications')}</p>
                {displayedNotifications.length > 0 ? (
                    displayedNotifications.map((notification, index) => (
                        <Dropdown.Item href="#" key={index}>
                            {notification.data.notification_type === 'new_follower' ? (
                                <div className='d-flex' style={{backgroundColor:notification.is_read?'white':'rgba(235, 234, 237, 0.3)', padding:'12px 2px 3px 8px'}} 
                                onClick={() => redirectUser(notification.data.redirection,notification.data.notification_type)}>
                                    {notification.data.sender.image && (
                                        <img src={notification.data.sender.image} className='notification-owner me-2' />
                                    )}
                                    <div>
                                        <p className='notification-content mt-2 ' style={{ maxWidth: '200px' }}>
                                            <span className='notification-owner-userName'>{notification.data.sender.name}</span>
                                            {' '}{t('Notification.startedFollowing')}<br />{notification.created_at}
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                notification.data.notification_type === 'new_post' ?(
                                    <div className='d-flex' style={{backgroundColor:notification.is_read?'white':'rgba(235, 234, 237, 0.3)', padding:'12px 2px 3px 8px'}}
                                    onClick={() => redirectUser(notification.data.redirection,notification.data.notification_type)}>
                                    {notification.data.sender.image && (
                                        <img src={notification.data.sender.image} className='notification-owner me-2' />
                                    )}
                                    <div>
                                        <p className='notification-content mt-2 ' style={{ maxWidth: '200px' }}>
                                            <span className='notification-owner-userName'>{notification.data.sender.name}</span>
                                            {' '}{t('Notification.addedPost')}<br />{notification.created_at}
                                        </p>
                                    </div>
                                </div>
                                ):(
                                    notification.data.notification_type === 'post_reaction' ?
                                    (<div className='d-flex' style={{backgroundColor:notification.is_read?'white':'rgba(235, 234, 237, 0.3)', padding:'12px 2px 3px 8px'}}
                                    onClick={() => redirectUser(notification.data.redirection,notification.data.notification_type)}>
                                    {notification.data.sender.image && (
                                        <img src={notification.data.sender.image} className='notification-owner me-2' />
                                    )}
                                    <div>
                                        <p className='notification-content mt-2 ' style={{ maxWidth: '200px' }}>
                                            <span className='notification-owner-userName'>{notification.data.sender.name}</span>
                                            {' '} {t('Notification.addedMedal')} {notification.data.notification_data} <br />{notification.created_at}
                                        </p>
                                    </div>
                                </div>):(
                                    notification.data.notification_type === 'post_reaction_by_count' ?(
        <div className='d-flex' style={{backgroundColor:notification.is_read?'white':'rgba(235, 234, 237, 0.3)', padding:'12px 2px 3px 8px'}} 
        onClick={() => redirectUser(notification.data.redirection,notification.data.notification_type)}>
                                    {notification.data.sender.image && (
                                        <img src={notification.data.sender.image} className='notification-owner me-2' />
                                    )}
                                    <div>
                                        <p className='notification-content mt-2 ' style={{ maxWidth: '200px' }}>
                                            <span className='notification-owner-userName'>{notification.data.sender.name!='0' && notification.data.sender.name}</span>
                                            {' '} {t('Notification.milestone')} {notification.data.notification_text} likes!<br />{notification.created_at}
                                        </p>
                                    </div>
                                </div>
                                    ):(
                                        <></>
                                    )
                               )
                                )

                            )}
                        </Dropdown.Item>
                    ))
                ) : (
                    <Dropdown.Item>
                    {t('Notification.noNotification')}
                    </Dropdown.Item>
                )}
                {notifications.length > 7 && (
                    <>
                        <Dropdown.Divider />
                        <Dropdown.Item href="/my/notifications"><p className='view-more'>{t('Notification.viewMore')}</p></Dropdown.Item>
                    </>
                )}
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default NotificationDropDown;
