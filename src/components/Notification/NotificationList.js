import React from 'react';
import NavBar from '../Layout/Navbar';



function NotificationList() {
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
    return(
        <div className='notification-main'>
            <NavBar />
            <p className='notifiactionList-title'>Notifications</p>
         <div className='notification-container'>
           {notifications.map((notification)=>(
              <div className='d-flex' style={{marginLeft:'5rem'}}>
              <img src={notification.userImg} className='notification-owner me-3 ' />
              <div>
                  <p className='notificationList-content mt-2 ' style={{maxWidth:'200px'}}><span className='notification-owner-userName'>{notification.userName}</span>{notification.notificationContent}</p>
                  <p className='notification-content mb-1'>{notification.created_at}</p>
              </div>
          </div>
           ))}
         </div>
        </div>  
    )
}

export default NotificationList;