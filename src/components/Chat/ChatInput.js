import React, { useState } from 'react';

function ChatInput() {
  const [message, setMessage] = useState('');

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    // Implement logic to send message
    console.log("Sending message:", message);
    // Clear the input after sending
    setMessage('');
  };

  return (
    <div className="chat-input-container">
      <input
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={handleMessageChange}
        className="chat-input-field"
      />
      <button onClick={handleSendMessage} className="send-button">Send</button>
    </div>
  );
}

export default ChatInput;
