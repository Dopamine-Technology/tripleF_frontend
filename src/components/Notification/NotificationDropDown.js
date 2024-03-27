import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import NotificationIcon from '../../assets/imgs/notificationIcon.svg';
import NotificationActive from '../../assets/imgs/notificationIconActive.svg';
import './style.css';

function NotificationDropDown({ dropdownVisible, onClose }) {

    const notifications=[
        {userImg:'https://img.freepik.com/free-photo/view-child-hair-salon_23-2150462483.jpg',
         userName:'FarisJad',
         notificationContent:'share your challenge',
         created_at:'2 hours ago'
         },
         {userImg:'https://media.istockphoto.com/id/1400839503/photo/adorable-little-mixed-race-child-thinking-at-home-one-small-cute-hispanic-girl-sitting-alone.jpg?s=612x612&w=0&k=20&c=j17E794oSimfKA_BP55FWRuyl04hdnkoC0UnbJ4UYnc=',
         userName:'FarisJad',
         notificationContent:'share your challenge',
         created_at:'Yesterday'
         },
         { userImg:'https://img.freepik.com/free-photo/front-view-happy-little-girl-home-during-online-school-with-laptop_23-2148827496.jpg',
         userName:'FarisJad',
         notificationContent:'added a bronze medal to your challenge',
         created_at:'8 Mar, 2024  06:40 PM'
         },
         { userImg:'https://tmssl.akamaized.net/images/wappen/big/583.png?lm=1522312728',
         userName:'Club Name',
         notificationContent:'added new opportunity',
         created_at:'2 hours ago'
         },
         { userImg:'https://tmssl.akamaized.net/images/wappen/big/583.png?lm=1522312728',
         userName:'Club Name',
         notificationContent:'added new opportunity',
         created_at:'2 hours ago'
         },
         { userImg:'https://img.freepik.com/free-photo/front-view-happy-little-girl-home-during-online-school-with-laptop_23-2148827496.jpg',
         userName:'FarisJad',
         notificationContent:'added a bronze medal to your challenge',
         created_at:'8 Mar, 2024  06:40 PM'
         },
         { userImg:'https://img.freepik.com/free-photo/front-view-happy-little-girl-home-during-online-school-with-laptop_23-2148827496.jpg',
         userName:'FarisJad',
         notificationContent:'added a bronze medal to your challenge',
         created_at:'8 Mar, 2024  06:40 PM'
         },
         { userImg:'https://img.freepik.com/free-photo/front-view-happy-little-girl-home-during-online-school-with-laptop_23-2148827496.jpg',
         userName:'FarisJad',
         notificationContent:'added a bronze medal to your challenge',
         created_at:'8 Mar, 2024  06:40 PM'
         },
    ];

    const displayedNotifications = notifications.slice(0, 7);

    return (
        <Dropdown className="d-inline mx-2" drop='start' >
            <Dropdown.Toggle id="dropdown-autoclose-true" className="bg-transparent border-white"  >
                <img src={NotificationIcon} className=""   />
            </Dropdown.Toggle>
            <Dropdown.Menu  style={{ width: '28rem' }} className='mt-5'>
                <p className='title'>Notifications</p>
                {displayedNotifications.map((notification, index) => (
                    <>
                    <Dropdown.Item href="#" key={index}>
                        <div className='d-flex'>
                            <img src={notification.userImg} className='notification-owner me-2' />
                            <div>
                                <p className='notification-content mt-2 ' style={{maxWidth:'200px'}}><span className='notification-owner-userName me-1'>{notification.userName}</span>{notification.notificationContent}</p>
                                <p className='notification-content mb-1'>{notification.created_at}</p>
                                
                            </div>
                         
                        </div>
                    </Dropdown.Item>
                     {/* {index !== displayedNotifications.length - 1 && <hr style={{ border:'solid 1px #ebeaed'}}/>} */}
                     </>
                ))}
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
