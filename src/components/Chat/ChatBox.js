import React from 'react';
import Navbar from './Navbar';
import ChatList from './ChatList';
import ChatInput from './ChatInput';
import Sidebar from './Sidebar';
import './style.css'

function ChatBox() {
  return (
    <div className="chat-box">
      <Sidebar />
      <Navbar />
      <ChatList />
      <ChatInput />
    </div>
  );
}

export default ChatBox;
