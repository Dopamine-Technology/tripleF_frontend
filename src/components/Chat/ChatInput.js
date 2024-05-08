import React, { useEffect, useState } from 'react';
import Send from '../../assets/imgs/send.png';
import useAxios from '../Auth/useAxiosHook.interceptor';

function ChatInput({id}) {
  const [message, setMessage] = useState('');
  const axios=useAxios();

  const handleSendMessage = async (e) => {
    e.preventDefault();

    try {
      const data = {
        message_to: id, // Use the id passed from props
        message: message
      }
      await axios.post('chat/send_message', data );

      setMessage(''); 
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };


  return (
    <div className="chat-input-container">
      <input
        type="text"
        placeholder="Write a message …"
        value={message}
        className="chat-input-field"
        onChange={e => setMessage(e.target.value)}
      />
      <button onClick={handleSendMessage} className="send-button">
        <img src={Send} />
      </button>
    </div>
  );
}

export default ChatInput;
