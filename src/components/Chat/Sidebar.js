import React from 'react';

function Sidebar() {
  // Dummy data for chat list
  const chats = [
    {
      id: 1,
      name: "John Doe",
      message: "Hey there!",
      time: "10:00 AM",
      unread: 2,
      image: "https://randomuser.me/api/portraits/men/1.jpg" // Example image URL
    },
    {
      id: 2,
      name: "Jane Smith",
      message: "How's it going?",
      time: "Yesterday",
      unread: 0,
      image: "https://randomuser.me/api/portraits/women/1.jpg" // Example image URL
    },
  ];

  // Dummy data for user
  const user = {
    name: "Your Name",
    image: "https://randomuser.me/api/portraits/men/2.jpg" // Example image URL
  };

  return (
    <div className="sidebar">
      <div className="navbar">
        <img src={user.image} alt={user.name} className="user-avatar" />
        <p>Me</p>
      </div>
      <input type="text" placeholder="Search" className="search-input" />
      <div className="chats">
        {chats.map(chat => (
          <div key={chat.id} className="chat">
            <img src={chat.image} alt={chat.name} className="avatar" />
            <div className="info">
              <h2>{chat.name}</h2>
              <p>{chat.message}</p>
            </div>
            <div className="meta">
              <span className="time">{chat.time}</span>
              {chat.unread > 0 && <span className="unread">{chat.unread}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
