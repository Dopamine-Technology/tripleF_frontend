import React, { useEffect, useState, useRef } from 'react';
import ChatItem from './ChatItem';
import useAxios from '../Auth/useAxiosHook.interceptor';
import LoadingScreen from '../LoadingScreen/LoadingScreen';

function ChatList({ id }) {
  const axios = useAxios();
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const chatEndRef = useRef(null); // Ref for scrolling to the bottom

  useEffect(() => {
    setLoading(true); 
    axios
      .get(`chat/get_chat_messages/${id}`)
      .then((response) => {
        // Reverse the order of messages
        const reversedMessages = response.data.result.reverse();
        setMessages(reversedMessages);
      })
      .catch((error) => {
        console.error("Error fetching chat messages:", error);
      })
      .finally(() => {
        setLoading(false); 
      });
  }, [id]); 

  // Scroll to the bottom when messages change
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="chat-list">
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          {messages.map((message, index) => (
            <ChatItem
              key={index} // Make sure to add a unique key prop for each item in the list
              text={message.message}
              sender={message.message_from}
              time={message.created_at}
              id={id}
            />
          ))}
          <div ref={chatEndRef} /> {/* Empty div for scrolling to the bottom */}
        </>
      )}
    </div>
  );
}

export default ChatList;
