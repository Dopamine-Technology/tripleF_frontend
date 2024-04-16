import React, { useState, useEffect, useContext } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import NotificationIcon from '../../assets/imgs/notificationIcon.svg';
import morethanone from '../../assets/imgs/morethanzeronotificaion.png';
import NotificationActive from '../../assets/imgs/notificationIconActive.svg';
import './style.css';
import Pusher from 'pusher-js'; 
import { UserDataContext } from '../UserContext/UserData.context';
import useAxios from '../Auth/useAxiosHook.interceptor';

function NotificationDropDown() {
    const [notifications, setNotifications] = useState([]);
    const [allNotifications, setAllNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false);
    const { user } = useContext(UserDataContext);
    const axios = useAxios();

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

    const displayedNotifications = allNotifications?.length > 0 ? allNotifications.slice(0, 7) : [];
    console.log('notification here', notifications);

    return (
        <Dropdown className="d-inline mx-2" drop='start' onClick={handleToggleClick} >
            <Dropdown.Toggle id="dropdown-autoclose-true" className="bg-transparent border-white">
            {(notifications.some(notification => notification.notifiable_id === user.userData.id) && hasUnreadNotifications) ? (
    <img src={morethanone} className="icon me-2" />
) : (
    <img src={NotificationIcon} className="icon me-2" />
)}

            </Dropdown.Toggle>
            <Dropdown.Menu style={{ width: '28rem' }} className='mt-5'>
                <p className='title'>Notifications</p>
                {displayedNotifications.length > 0 ? (
                    displayedNotifications.map((notification, index) => (
                        <Dropdown.Item href="#" key={index}>
                            {notification.data.notification_type === 'new_follower' ? (
                                <div className='d-flex' style={{backgroundColor:notification.is_read?'white':'rgba(235, 234, 237, 0.3)', padding:'12px 2px 3px 8px'}}>
                                    {notification.data.image && (
                                        <img src={notification.data.image} className='notification-owner me-2' />
                                    )}
                                    <div>
                                        <p className='notification-content mt-2 ' style={{ maxWidth: '200px' }}>
                                            <span className='notification-owner-userName'>{notification.data.name}</span>
                                            {' '}started following you<br />{notification.created_at}
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <p>No Notifications</p>
                            )}
                        </Dropdown.Item>
                    ))
                ) : (
                    <Dropdown.Item>
                        No notifications
                    </Dropdown.Item>
                )}
                {notifications.length > 7 && (
                    <>
                        <Dropdown.Divider />
                        <Dropdown.Item href="/my/notifications"><p className='view-more'>View more notifications</p></Dropdown.Item>
                    </>
                )}
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default NotificationDropDown;
