import React from 'react';
import NavBar from '../Layout/Navbar';



function NotificationList() {
    const notifications=[
        {userImg:'https://media.gettyimages.com/id/200280798-001/photo/front-profile-of-a-boy-playing-football-in-a-garden.jpg?s=170667a&w=gi&k=20&c=4XuSBXViKEU7blJ4C_1VASVKQGJii0_cC1K3ubxEuos=',
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
         { userImg:'https://c8.alamy.com/comp/2EFC9N1/side-profile-of-a-soccer-player-balancing-a-soccer-ball-on-his-thighs-2EFC9N1.jpg',
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
           {notifications.map((notification,index)=>(
              <div className='d-flex ' style={{marginLeft:'5rem'}}>
              <img src={notification.userImg} className='notification-owner me-3 ' />
              <div>
                  <p className='notificationList-content mt-2 '><span className='notification-owner-userName'>{notification.userName}</span>{notification.notificationContent}  <br /> {notification.created_at}</p>
                  {index !== notifications.length - 1 && <hr style={{ border:'solid 1px #e2e2ea'}}/>}
              </div>
          </div>
           ))}
         </div>
        </div>  
    )
}

export default NotificationList;