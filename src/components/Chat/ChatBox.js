import React,{useState,useEffect} from 'react';
import Navbar from './Navbar';
import ChatList from './ChatList';
import ChatInput from './ChatInput';
import Sidebar from './Sidebar';
import './style.css';
import Pusher from 'pusher-js'; 
import NavBar from '../Layout/Navbar';

function ChatBox() {
  const [messages,setMessages]=useState([]);
  let allMessages = [];
  useEffect(() => {
    Pusher.logToConsole = true;

    const pusher = new Pusher('323996d4cfab0016889a', {
        cluster: 'ap2'
    });

    const channel = pusher.subscribe('chat_channel');
    channel.bind('new_message', function (data) {
      allMessages.push(data);
      setMessages(allMessages);
      console.log('data',data)
    });
    console.log('test',messages)
}, []);

useEffect(() => {
  console.log('messages', messages);
}, [messages]);

const [currentChatId, setCurrentChatId] = useState(null);




  return (
    <>
        <NavBar />
    <div className="chat-box">
    <Navbar />
      <Sidebar  setCurrentChatId={setCurrentChatId}/>
      <ChatList  id={currentChatId}/>
      <ChatInput id={currentChatId} />
    </div>
    </>
  );
}

export default ChatBox;
