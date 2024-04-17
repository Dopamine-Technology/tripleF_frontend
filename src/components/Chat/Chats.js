import React from "react";

const Chats = () => {
  const chats = []; // Dummy chats for design purposes

  const handleSelect = (u) => {
    // Dummy handleSelect function
  };

  return (
    <div className="chats">
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => (
          <div
            className="userChat"
            key={chat[0]}
            onClick={() => handleSelect(chat[1].userInfo)}
          >
            <img src="" alt="" />
            <div className="userChatInfo">
              <span>User Name</span>
              <p>Last message</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Chats;
