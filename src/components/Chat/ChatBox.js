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
import CurrentChat from './currentChat';
import { useParams } from 'react-router-dom';

function ChatBox() {
  const [messages,setMessages]=useState([]);
  const [hasUnreadMessages, setHasUnreadMessages] = useState(false);
  const {user}=useContext(UserDataContext);
  const [currentChatId, setCurrentChatId] = useState(null);
  const { windowWidth, isSmallScreen, isTabletScreen, isProScreen } = useScreenWidth();
  const navigate=useNavigate();
  const {id}=useParams();



  return (
    <>
      <NavBar />
    {isSmallScreen?
    <>
     <div className="chats-list">
      <Sidebar  setCurrentChatId={setCurrentChatId}/>
    </div>
    </>:
    <>
     <div className="chat-box">
      <Navbar />
      <Sidebar  setCurrentChatId={setCurrentChatId}/>
      <CurrentChat id={currentChatId||id} />
      <ChatList  id={currentChatId}/>
      <ChatInput id={currentChatId} /> 
    </div>
    </>
    }
      
   
    </>
  );
}

export default ChatBox;
