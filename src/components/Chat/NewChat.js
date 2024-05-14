import React,{useState,useEffect,useContext} from 'react';
import Navbar from './Navbar';
import ChatList from './ChatList';
import ChatInput from './ChatInput';
import Sidebar from './Sidebar';
import './style.css';
import Pusher from 'pusher-js'; 
import NavBar from '../Layout/Navbar';
import { UserDataContext } from '../UserContext/UserData.context';
import { useScreenWidth } from '../ScreenWidthContext/ScreenWidth.context';
import { useNavigate } from 'react-router-dom';
import ChatSuggestion from './ChatSuggestion';

function NewChat() {
  const [messages,setMessages]=useState([]);
  const [hasUnreadMessages, setHasUnreadMessages] = useState(false);
  const {user}=useContext(UserDataContext);
  const [currentChatId, setCurrentChatId] = useState(null);
  const { windowWidth, isSmallScreen, isTabletScreen, isProScreen } = useScreenWidth();
  const navigate=useNavigate();



  return (
    <>
      <NavBar />
    {isSmallScreen?
    <>
     <div className="chats-list">
      {/* <Sidebar  setCurrentChatId={setCurrentChatId}/> */}
      <ChatSuggestion />
    </div>
    </>:
    <>
     <div className="chat-box">
      <Navbar />
      <Sidebar  setCurrentChatId={setCurrentChatId}/>
      <ChatSuggestion />
    </div>
    </>
    }
      
   
    </>
  );
}

export default NewChat;
