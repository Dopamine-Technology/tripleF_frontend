import React from 'react';
import ChatItem from './ChatItem';

function ChatList() {
  return (
    <div className="chat-list">
      <ChatItem text="Hello!" />
      <ChatItem text="How are you?" />
      {/* Render more ChatItem components here */}
    </div>
  );
}

export default ChatList;
