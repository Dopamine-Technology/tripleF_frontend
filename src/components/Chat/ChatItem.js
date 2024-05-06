import React, { useState,useEffect,useContext } from 'react';
import useAxios from '../Auth/useAxiosHook.interceptor';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { UserDataContext } from '../UserContext/UserData.context';

function ChatItem({ text, sender, name, time, image,id }) {
  
  const[userData,setUserData]=useState();
  const[loading,setLoading]=useState(false);
  const axios=useAxios();
  const {user}=useContext(UserDataContext);
  const isSender = sender === user.userData.id;

  useEffect(() => {
    setLoading(true); 
    axios
      .get(`user/get_profile/${id}`)
      .then((response) => {
        setUserData(response.data.result);
      })
      .catch((error) => {
        console.error("Error fetching chat messages:", error);
      })
      .finally(() => {
        setLoading(false); 
      });
  }, [id]); 
  


  return (
    <div className={`chat-item ${isSender ? 'sent' : 'received'}`}>
      <div className="chat-content">
        {!isSender?<img src={userData?.image} alt="Profile" className="profile-image" />:''}
        
        <div className="sender-info d-flex">
        {!isSender?  <p className="sender-name ">{userData?.first_name} {userData?.first_name}</p>:''}
        
          <p className="message-time">{time}</p>
        </div>
      </div>
      <p className="message-text">{text}</p>
    </div>
  );
}

export default ChatItem;
