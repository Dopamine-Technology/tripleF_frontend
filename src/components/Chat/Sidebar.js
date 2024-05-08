import React, { useContext, useEffect, useState } from 'react';
import { UserDataContext } from '../UserContext/UserData.context';
import Navbar from './Navbar';
import useAxios from '../Auth/useAxiosHook.interceptor';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { BsThreeDotsVertical } from "react-icons/bs";
import Dropdown from 'react-bootstrap/Dropdown';
import remove from '../../assets/imgs/remove.png';
import block from '../../assets/imgs/block.png';

function Sidebar({ setCurrentChatId }) {
  const axios = useAxios();
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState(null); // State to track selected chat ID
  const [hoveredChatIds, setHoveredChatIds] = useState({}); // State to track hovered chat IDs

  useEffect(() => {
    setLoading(true);
    axios
      .get('chat/get_chats')
      .then((response) => {
        setChats(response.data.result.reverse()); // Reverse the order of chats
        setSelectedChatId(response.data.result[0]?.id); 
        setCurrentChatId(response.data.result[0]?.id);
      })
      .catch((error) => {
        console.error("Error fetching chats data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const { user } = useContext(UserDataContext);

  const handleChatClick = (chatId) => {
    setCurrentChatId(chatId);
    setSelectedChatId(chatId); // Set the selected chat ID when clicked
  };

  const handleMouseEnter = (chatId) => {
    setHoveredChatIds(prevState => ({
      ...prevState,
      [chatId]: true // Set hovered state for the specific chat ID
    }));
  };

  const handleMouseLeave = (chatId) => {
    setHoveredChatIds(prevState => ({
      ...prevState,
      [chatId]: false // Reset hovered state for the specific chat ID
    }));
  };

  return (
    <div className="sidebar">
      <div className="chats">
        {chats.map(chat => (
          <div
            key={chat.id}
            className={`chat ${selectedChatId === chat.id ? 'selected-chat' : ''}`} // Conditionally apply className
            onClick={() => handleChatClick(chat.id)}
            onMouseEnter={() => handleMouseEnter(chat.id)}
            onMouseLeave={() => handleMouseLeave(chat.id)}
          >
            <img src={chat.image} alt={chat.first_name} className="avatar" />
            <div className="info">
              <p className='info-name'>{chat.first_name} {chat.last_name}</p>
              <p>{chat.last_message.message}</p>
            </div>
            <div className="meta">
              {hoveredChatIds[chat.id] && (
                <Dropdown className="custom-dropdown">
                  <Dropdown.Toggle variant="" className="dropdown-toggle">
                    <BsThreeDotsVertical />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#" className='mt-1 p-2'><img src={remove} className='me-2' />Delete</Dropdown.Item>
                    <Dropdown.Item href="#" className='mt-1 p-2'><img src={block} className='me-2' />Report / Block</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
              {!hoveredChatIds[chat.id] && (
                <span className="message-time">{chat.last_message.created_at}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
