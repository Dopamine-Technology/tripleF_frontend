import React from "react";

const Message = ({ message }) => {
  return (
    <div className={`message ${message.senderId === "ownerId" && "owner"}`}>
      <div className="messageInfo">
        <img src="" alt="" />
        <span>just now</span>
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
};

export default Message;
