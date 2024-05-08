import React, { useEffect, useState, useRef } from 'react';
import ChatItem from './ChatItem';
import useAxios from '../Auth/useAxiosHook.interceptor';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import ChatInput from './ChatInput';

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
  }, []);

  // Periodically fetch new messages
  useEffect(() => {
    const interval = setInterval(() => {
      axios
        .get(`chat/get_chat_messages/${id}`)
        .then((response) => {
          const reversedMessages = response.data.result.reverse();
          setMessages(reversedMessages);
        })
        .catch((error) => {
          console.error("Error fetching chat messages:", error);
        });
    }, 5000); // Fetch messages every 5 seconds (adjust as needed)

    return () => clearInterval(interval);
  }, [id]); // Fetch messages when id changes

  return (
    <div className="chat-list">
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          {messages.map((message, index) => (
            <ChatItem
              key={index}
              text={message.message}
              sender={message.message_from}
              time={message.created_at}
              id={id}
            />
          ))}
          <div ref={chatEndRef} />
      
        </>
      )}
      
    </div>
  );
}

export default ChatList;
