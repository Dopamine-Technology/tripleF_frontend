import React from 'react';

function ChatItem({ text, sender }) {
  const isSender = sender === "me";

  return (
    <div className={`chat-item ${isSender ? 'sent' : 'received'}`}>
      <p>{text}</p>
    </div>
  );
}

export default ChatItem;
